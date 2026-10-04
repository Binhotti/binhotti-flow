import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowRightLeft,
  ArrowUpRight,
  Landmark,
  PiggyBank,
  ReceiptText,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Target,
  WalletCards,
} from "lucide-react";
import { CategoryChart, CashFlowChart } from "@/components/dashboard-charts";
import { Shell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { formatDate, formatMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  timeZone: "UTC",
});
const chartColors = ["#b8ff45", "#7c8cff", "#ff8a65", "#58d6c7", "#f4c95d"];

export default async function Dashboard() {
  const user = await requireUser();
  const now = new Date();
  const sixMonthsAgo = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1),
  );
  const [accounts, recentTransactions, chartTransactions, investments, goals] =
    await Promise.all([
      prisma.account.findMany({
        where: { userId: user.id, isActive: true },
        include: {
          outgoingTransactions: { where: { status: "paid" } },
          incomingTransfers: { where: { status: "paid" } },
        },
      }),
      prisma.transaction.findMany({
        where: { userId: user.id },
        include: { account: true, transferAccount: true },
        orderBy: [{ transactionDate: "desc" }, { createdAt: "desc" }],
        take: 6,
      }),
      prisma.transaction.findMany({
        where: {
          userId: user.id,
          status: "paid",
          transactionDate: { gte: sixMonthsAgo },
        },
        orderBy: { transactionDate: "asc" },
      }),
      prisma.investment.findMany({
        where: { userId: user.id },
        select: { amount: true },
      }),
      prisma.goal.findMany({
        where: { userId: user.id },
        select: { currentAmount: true },
      }),
    ]);

  const accountBalance = (account: (typeof accounts)[number]) =>
    Number(account.initialBalance) +
    account.outgoingTransactions.reduce(
      (sum, transaction) =>
        sum +
        (transaction.type === "income"
          ? Number(transaction.amount)
          : -Number(transaction.amount)),
      0,
    ) +
    account.incomingTransfers.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0,
    );
  const balance = accounts.reduce(
    (sum, account) => sum + accountBalance(account),
    0,
  );
  const monthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const current = chartTransactions.filter(
    (transaction) => transaction.transactionDate >= monthStart,
  );
  const income = current
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const expenses = current
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const savingsRate =
    income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
  const invested = investments.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );
  const goalsSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount),
    0,
  );

  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + index, 1),
    );
    const transactions = chartTransactions.filter(
      (item) =>
        item.transactionDate.getUTCFullYear() === date.getUTCFullYear() &&
        item.transactionDate.getUTCMonth() === date.getUTCMonth(),
    );
    return {
      label: monthFormatter.format(date).replace(".", ""),
      income: transactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0),
      expenses: transactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0),
    };
  });

  const expenseGroups = new Map<string, number>();
  current
    .filter((item) => item.type === "expense")
    .forEach((item) =>
      expenseGroups.set(
        item.description,
        (expenseGroups.get(item.description) ?? 0) + Number(item.amount),
      ),
    );
  const categories = [...expenseGroups.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, value], index) => ({
      label,
      value,
      color: chartColors[index],
    }));

  return (
    <Shell
      title={`Olá, ${user.name.split(" ")[0]}`}
      description="Seu dinheiro, decisões e progresso em um só lugar."
      action={{ href: "/transactions/new", label: "Nova transação" }}
    >
      <section className="bento-grid">
        <article className="bento-card balance-card bento-span-2">
          <div>
            <span className="card-label">SALDO DISPONÍVEL</span>
            <strong>{formatMoney(balance)}</strong>
            <small>
              {accounts.length}{" "}
              {accounts.length === 1 ? "conta ativa" : "contas ativas"}
            </small>
          </div>
          <div className="balance-orb">
            <WalletCards />
          </div>
        </article>
        <article className="bento-card metric-card">
          <span className="metric-icon positive-bg">
            <TrendingUp />
          </span>
          <div>
            <small>Receitas no mês</small>
            <strong className="positive">{formatMoney(income)}</strong>
          </div>
        </article>
        <article className="bento-card metric-card">
          <span className="metric-icon negative-bg">
            <TrendingDown />
          </span>
          <div>
            <small>Despesas no mês</small>
            <strong>{formatMoney(expenses)}</strong>
          </div>
        </article>
        <Link
          href="/investments"
          className="bento-card metric-card metric-link"
        >
          <span className="metric-icon investment-bg">
            <PiggyBank />
          </span>
          <div>
            <small>Dinheiro investido</small>
            <strong>{formatMoney(invested)}</strong>
          </div>
        </Link>
        <Link href="/goals" className="bento-card metric-card metric-link">
          <span className="metric-icon goal-bg">
            <Target />
          </span>
          <div>
            <small>Guardado em metas</small>
            <strong>{formatMoney(goalsSaved)}</strong>
          </div>
        </Link>
        <article className="bento-card chart-card bento-span-2">
          <div className="card-head">
            <div>
              <p className="eyebrow">FLUXO DE CAIXA</p>
              <h2>Receitas x despesas</h2>
            </div>
            <span className="period-pill">6 meses</span>
          </div>
          <CashFlowChart data={monthlyData} />
        </article>
        <article className="bento-card insight-card">
          <span className="insight-icon">
            <Sparkles />
          </span>
          <p className="eyebrow">SAÚDE FINANCEIRA</p>
          <strong>{savingsRate}%</strong>
          <h2>Taxa de economia</h2>
          <p>
            {savingsRate >= 20
              ? "Excelente ritmo. Continue protegendo parte da sua renda."
              : "Tente reservar pelo menos 20% das receitas do mês."}
          </p>
          <div className="progress">
            <i
              style={{ width: `${Math.max(0, Math.min(savingsRate, 100))}%` }}
            />
          </div>
        </article>
        <article className="bento-card category-card">
          <div className="card-head">
            <div>
              <p className="eyebrow">DISTRIBUIÇÃO</p>
              <h2>Maiores despesas</h2>
            </div>
          </div>
          <CategoryChart data={categories} total={expenses} />
        </article>
        <article className="bento-card transactions-card bento-span-2">
          <div className="card-head">
            <div>
              <p className="eyebrow">MOVIMENTAÇÕES</p>
              <h2>Últimas transações</h2>
            </div>
            <Link href="/transactions">Ver todas</Link>
          </div>
          {recentTransactions.length ? (
            <div className="transaction-list">
              {recentTransactions.map((transaction) => (
                <div className="transaction" key={transaction.id}>
                  <span className={`transaction-icon ${transaction.type}`}>
                    {transaction.type === "income" ? (
                      <ArrowDownLeft />
                    ) : transaction.type === "transfer" ? (
                      <ArrowRightLeft />
                    ) : (
                      <ArrowUpRight />
                    )}
                  </span>
                  <div>
                    <strong>{transaction.description}</strong>
                    <small>
                      {transaction.account.name}
                      {transaction.transferAccount
                        ? ` → ${transaction.transferAccount.name}`
                        : ""}{" "}
                      · {formatDate(transaction.transactionDate)}
                    </small>
                  </div>
                  <b
                    className={
                      transaction.type === "income"
                        ? "positive"
                        : transaction.type === "expense"
                          ? "negative"
                          : ""
                    }
                  >
                    {transaction.type === "income"
                      ? "+ "
                      : transaction.type === "expense"
                        ? "− "
                        : ""}
                    {formatMoney(transaction.amount)}
                  </b>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <ReceiptText />
              <p>Nenhuma transação ainda.</p>
              <Link className="text-link" href="/transactions/new">
                Começar agora
              </Link>
            </div>
          )}
        </article>
        <article className="bento-card accounts-card">
          <div className="card-head">
            <div>
              <p className="eyebrow">PATRIMÔNIO</p>
              <h2>Suas contas</h2>
            </div>
            <Link href="/accounts">Gerenciar</Link>
          </div>
          {accounts.length ? (
            <div className="account-mini-list">
              {accounts.slice(0, 4).map((account) => (
                <div key={account.id}>
                  <span className="account-dot" />
                  <div>
                    <strong>{account.name}</strong>
                    <small>{account.institution ?? "Sem instituição"}</small>
                  </div>
                  <b>{formatMoney(accountBalance(account))}</b>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <Landmark />
              <p>Adicione sua primeira conta.</p>
              <Link className="text-link" href="/accounts/new">
                Começar agora
              </Link>
            </div>
          )}
        </article>
      </section>
    </Shell>
  );
}
