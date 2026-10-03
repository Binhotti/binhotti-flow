import Link from "next/link";
import { createInvestment } from "@/app/actions";
import { Flash } from "@/components/flash";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";

export default async function NewInvestment({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireUser();
  const { error } = await searchParams;
  return (
    <Shell
      title="Nova caixinha"
      description="Cadastre um investimento ou uma reserva financeira."
    >
      <div className="form-card">
        <Flash error={error} />
        <form action={createInvestment} className="form">
          <label>
            Nome da caixinha
            <input
              name="name"
              placeholder="Ex.: Reserva de emergência"
              required
            />
          </label>
          <label>
            Instituição <span>Opcional</span>
            <input
              name="institution"
              placeholder="Ex.: Nubank, XP, Tesouro Direto"
            />
          </label>
          <div className="form-grid">
            <label>
              Valor investido
              <input
                name="amount"
                inputMode="decimal"
                placeholder="0,00"
                required
              />
            </label>
            <label>
              Rendimento anual <span>Opcional</span>
              <input
                name="annualRate"
                inputMode="decimal"
                placeholder="Ex.: 12,5"
              />
            </label>
            <label>
              Data de vencimento <span>Opcional</span>
              <input name="maturityDate" type="date" />
            </label>
          </div>
          <label>
            Observações <span>Opcional</span>
            <input name="notes" placeholder="Liquidez, objetivo ou detalhes" />
          </label>
          <div className="form-actions">
            <Link href="/investments" className="secondary-button">
              Cancelar
            </Link>
            <button className="button">Adicionar caixinha</button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
