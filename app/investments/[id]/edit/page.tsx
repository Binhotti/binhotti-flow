import Link from "next/link";
import { notFound } from "next/navigation";
import { updateInvestment } from "@/app/actions";
import { Flash } from "@/components/flash";
import { MoneyInput } from "@/components/money-input";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EditInvestment({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const { error } = await searchParams;
  const item = await prisma.investment.findFirst({
    where: { id, userId: user.id },
  });
  if (!item) notFound();
  return (
    <Shell
      title="Editar caixinha"
      description="Atualize os dados e o saldo do investimento."
    >
      <div className="form-card">
        <Flash error={error} />
        <form action={updateInvestment} className="form">
          <input type="hidden" name="id" value={item.id} />
          <label>
            Nome da caixinha
            <input name="name" defaultValue={item.name} required />
          </label>
          <label>
            Instituição <span>Opcional</span>
            <input name="institution" defaultValue={item.institution ?? ""} />
          </label>
          <div className="form-grid">
            <label>
              Valor investido
              <MoneyInput
                name="amount"
                defaultValue={Number(item.amount)}
                required
              />
            </label>
            <label>
              Rendimento anual <span>Opcional</span>
              <input
                name="annualRate"
                inputMode="decimal"
                defaultValue={
                  item.annualRate
                    ? Number(item.annualRate).toLocaleString("pt-BR")
                    : ""
                }
              />
            </label>
            <label>
              Data de vencimento <span>Opcional</span>
              <input
                name="maturityDate"
                type="date"
                defaultValue={
                  item.maturityDate?.toISOString().slice(0, 10) ?? ""
                }
              />
            </label>
          </div>
          <label>
            Observações <span>Opcional</span>
            <input name="notes" defaultValue={item.notes ?? ""} />
          </label>
          <div className="form-actions">
            <Link href="/investments" className="secondary-button">
              Cancelar
            </Link>
            <button className="button">Salvar alterações</button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
