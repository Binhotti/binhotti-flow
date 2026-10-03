import {
  ArrowDownLeft,
  ArrowRightLeft,
  ArrowUpRight,
  ReceiptText,
} from "lucide-react";
import { Flash } from "@/components/flash";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { formatDate, formatMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";
const labels = {
  income: "Receita",
  expense: "Despesa",
  transfer: "Transferência",
};
export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const user = await requireUser(),
    params = await searchParams,
    transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      include: { account: true, transferAccount: true },
      orderBy: [{ transactionDate: "desc" }, { createdAt: "desc" }],
    });
  return (
    <Shell
      title="Transações"
      description="Seu histórico financeiro completo."
      action={{ href: "/transactions/new", label: "Nova transação" }}
    >
      <Flash {...params} />
      <div className="card table-card">
        {transactions.length ? (
          <div className="transaction-list">
            {transactions.map((t) => (
              <div className="transaction transaction-row" key={t.id}>
                <span className={`transaction-icon ${t.type}`}>
                  {t.type === "income" ? (
                    <ArrowDownLeft />
                  ) : t.type === "transfer" ? (
                    <ArrowRightLeft />
                  ) : (
                    <ArrowUpRight />
                  )}
                </span>
                <div>
                  <strong>{t.description}</strong>
                  <small>
                    {t.account.name}
                    {t.transferAccount
                      ? ` → ${t.transferAccount.name}`
                      : ""} · {formatDate(t.transactionDate)}
                  </small>
                </div>
                <span className="badge">{labels[t.type]}</span>
                <b
                  className={
                    t.type === "income"
                      ? "positive"
                      : t.type === "expense"
                        ? "negative"
                        : ""
                  }
                >
                  {t.type === "income"
                    ? "+ "
                    : t.type === "expense"
                      ? "− "
                      : ""}
                  {formatMoney(t.amount)}
                </b>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <ReceiptText />
            <p>Nenhuma transação registrada.</p>
            <a className="button" href="/transactions/new">
              Registrar primeira transação
            </a>
          </div>
        )}
      </div>
    </Shell>
  );
}
