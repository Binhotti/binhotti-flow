import Link from "next/link";
import {
  CalendarDays,
  Pencil,
  PiggyBank,
  Plus,
  TrendingUp,
} from "lucide-react";
import { addInvestmentAmount, deleteInvestment } from "@/app/actions";
import { ConfirmButton } from "@/components/confirm-button";
import { Flash } from "@/components/flash";
import { Shell } from "@/components/shell";
import { MoneyInput } from "@/components/money-input";
import { requireUser } from "@/lib/auth";
import { formatDate, formatMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";

export default async function InvestmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const investments = await prisma.investment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  const total = investments.reduce((sum, item) => sum + Number(item.amount), 0);
  return (
    <Shell
      title="Caixinhas"
      description="Organize o dinheiro investido e acompanhe seus rendimentos."
      action={{ href: "/investments/new", label: "Nova caixinha" }}
    >
      <Flash {...params} />
      <section className="summary-strip">
        <div>
          <span>Total investido</span>
          <strong>{formatMoney(total)}</strong>
        </div>
        <span className="summary-icon">
          <PiggyBank />
        </span>
      </section>
      <div className="investments-grid">
        {investments.map((item) => (
          <article className="investment-card" key={item.id}>
            <div className="account-card-top">
              <span className="account-logo">
                <TrendingUp />
              </span>
              {item.annualRate && (
                <span className="badge active">
                  {Number(item.annualRate).toLocaleString("pt-BR")}% a.a.
                </span>
              )}
            </div>
            <small>{item.institution ?? "Investimento"}</small>
            <h2>{item.name}</h2>
            <div className="account-balance">
              <span>Valor aplicado</span>
              <strong>{formatMoney(item.amount)}</strong>
            </div>
            {item.maturityDate && (
              <p className="investment-date">
                <CalendarDays /> Vencimento em {formatDate(item.maturityDate)}
              </p>
            )}
            {item.notes && <p>{item.notes}</p>}
            <form action={addInvestmentAmount} className="investment-add">
              <input type="hidden" name="id" value={item.id} />
              <MoneyInput
                name="amount"
                placeholder="Adicionar valor"
                required
              />
              <button type="submit" aria-label="Adicionar valor">
                <Plus />
              </button>
            </form>
            <div className="investment-actions">
              <Link href={`/investments/${item.id}/edit`}>
                <Pencil /> Editar
              </Link>
              <form action={deleteInvestment} className="card-delete">
                <input type="hidden" name="id" value={item.id} />
                <ConfirmButton
                  message={`Excluir a caixinha “${item.name}”? Metas vinculadas serão mantidas, mas deixarão de usar seu saldo.`}
                />
              </form>
            </div>
          </article>
        ))}
        {!investments.length && (
          <div className="card empty wide">
            <PiggyBank />
            <p>Você ainda não possui nenhuma caixinha.</p>
            <Link className="button" href="/investments/new">
              Adicionar dinheiro investido
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}
