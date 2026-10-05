import Link from "next/link";
import { notFound } from "next/navigation";
import { updateGoal } from "@/app/actions";
import { Flash } from "@/components/flash";
import { MoneyInput } from "@/components/money-input";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EditGoal({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const { error } = await searchParams;
  const [goal, investments] = await Promise.all([
    prisma.goal.findFirst({ where: { id, userId: user.id } }),
    prisma.investment.findMany({
      where: { userId: user.id },
      orderBy: { name: "asc" },
      select: { id: true, name: true, amount: true },
    }),
  ]);
  if (!goal) notFound();

  const selectedInvestment = goal.allInvestments
    ? "all"
    : (goal.investmentId ?? "");

  return (
    <Shell
      title="Editar meta"
      description="Atualize seu objetivo e a forma como o progresso é calculado."
    >
      <div className="form-card">
        <Flash error={error} />
        <form action={updateGoal} className="form">
          <input type="hidden" name="id" value={goal.id} />
          <label>
            Nome da meta
            <input name="name" defaultValue={goal.name} required />
          </label>
          <div className="form-grid">
            <label>
              Valor do objetivo
              <MoneyInput
                name="targetAmount"
                defaultValue={Number(goal.targetAmount)}
                required
              />
            </label>
            <label>
              Valor já guardado
              <MoneyInput
                name="currentAmount"
                defaultValue={Number(goal.currentAmount)}
                required
              />
            </label>
            <label className="wide">
              Vincular a uma caixinha{" "}
              <span>Opcional — o progresso usará o saldo escolhido</span>
              <select name="investmentId" defaultValue={selectedInvestment}>
                <option value="">Não vincular</option>
                {investments.length > 0 && (
                  <option value="all">Todas as caixinhas</option>
                )}
                {investments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} —{" "}
                    {Number(item.amount).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Prazo <span>Opcional</span>
              <input
                name="deadline"
                type="date"
                defaultValue={goal.deadline?.toISOString().slice(0, 10) ?? ""}
              />
            </label>
            <label>
              Cor da meta
              <input name="color" type="color" defaultValue={goal.color} />
            </label>
          </div>
          <div className="form-actions">
            <Link href="/goals" className="secondary-button">
              Cancelar
            </Link>
            <button className="button">Salvar alterações</button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
