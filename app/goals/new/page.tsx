import Link from "next/link";
import { createGoal } from "@/app/actions";
import { Flash } from "@/components/flash";
import { Shell } from "@/components/shell";
import { MoneyInput } from "@/components/money-input";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export default async function NewGoal({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await requireUser();
  const { error } = await searchParams;
  const investments = await prisma.investment.findMany({
    where: { userId: user.id },
    orderBy: { name: "asc" },
    select: { id: true, name: true, amount: true },
  });
  return (
    <Shell
      title="Nova meta"
      description="Defina o objetivo e acompanhe cada passo até conquistá-lo."
    >
      <div className="form-card">
        <Flash error={error} />
        <form action={createGoal} className="form">
          <label>
            Nome da meta
            <input
              name="name"
              placeholder="Ex.: Viagem, carro, casa própria"
              required
            />
          </label>
          <div className="form-grid">
            <label>
              Valor do objetivo
              <MoneyInput name="targetAmount" required />
            </label>
            <label>
              Valor já guardado
              <MoneyInput name="currentAmount" defaultValue={0} required />
            </label>
            <label className="wide">
              Vincular a uma caixinha{" "}
              <span>Opcional — o progresso usará o saldo dela</span>
              <select name="investmentId" defaultValue="">
                <option value="">Não vincular</option>
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
              <input name="deadline" type="date" />
            </label>
            <label>
              Cor da meta
              <input name="color" type="color" defaultValue="#b8ff45" />
            </label>
          </div>
          <div className="form-actions">
            <Link href="/goals" className="secondary-button">
              Cancelar
            </Link>
            <button className="button">Criar meta</button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
