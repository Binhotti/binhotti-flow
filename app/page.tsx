import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowRightLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  Sprout,
  Target,
  TrendingDown,
  TrendingUp,
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
const fullMonthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const chartColors = ["#ff454f", "#ff9f1c", "#58d6c7", "#f4c95d", "#8fdd3c"];

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
        take: 5,
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
        select: {
          currentAmount: true,
          allInvestments: true,
          investment: { select: { amount: true } },
        },
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
  const savingsRate = Math.max(
    0,
    income > 0 ? Math.round(((income - expenses) / income) * 100) : 0,
  );
  const invested = investments.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );
  const goalsSaved = goals.reduce(
    (sum, goal) =>
      sum +
      (goal.allInvestments
        ? 0
        : Number(goal.investment?.amount ?? goal.currentAmount)),
    goals.some((goal) => goal.allInvestments) ? invested : 0,
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
    .slice(0, 4)
    .map(([label, value], index) => ({
      label,
      value,
      color: chartColors[index],
    }));
  const healthScore = Math.max(0, Math.min(100, savingsRate || (invested > 0 ? 58 : 24)));
  const firstName = user.name.split(" ")[0];

  return (
    <Shell
      title={`Olá, ${firstName}`}
      description="Seu dinheiro, decisões e progresso em um só lugar."
      action={{ href: "/transactions/new", label: "Nova transação" }}
      dashboard
      userName={firstName}
    >
      <section className="dashboard-grid">
        <article className="dashboard-card dashboard-balance">
          <div className="balance-copy">
            <span className="dashboard-label">SALDO DISPONÍVEL</span>
            <strong>{formatMoney(balance)}</strong>
            <small>
              {accounts.length} {accounts.length === 1 ? "conta ativa" : "contas ativas"}
              <ChevronRight />
            </small>
          </div>
          <svg className="balance-line" viewBox="0 0 520 180" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur" /></filter>
            </defs>
            <path className="glow" d="M0 160 C90 150 105 75 190 90 S315 130 365 45 S470 80 520 0" />
            <path d="M0 160 C90 150 105 75 190 90 S315 130 365 45 S470 80 520 0" />
          </svg>
          <div className="balance-trend">
            <TrendingUp />
            <div><b>+ 12%</b><span>em relação ao mês anterior</span></div>
          </div>
        </article>

        <article className="dashboard-card month-summary">
          <div className="month-heading">
            <CalendarDays />
            <span>{fullMonthFormatter.format(now)}</span>
            <ChevronRight />
          </div>
          <div className="month-income">
            <span className="dashboard-icon positive-bg"><TrendingUp /></span>
            <div><small>Receitas no mês</small><strong>{formatMoney(income)}</strong></div>
          </div>
        </article>

        <article className="dashboard-card stat-card">
          <span className="dashboard-icon negative-bg"><TrendingDown /></span>
          <div><small>Despesas no mês</small><strong>{formatMoney(expenses)}</strong></div>
          <div className="stat-change negative"><b>↗ 8%</b><span>vs. mês anterior</span></div>
        </article>
        <Link href="/investments" className="dashboard-card stat-card">
          <span className="dashboard-icon investment-bg"><PiggyBank /></span>
          <div><small>Dinheiro investido</small><strong>{formatMoney(invested)}</strong></div>
          <div className="stat-change"><b>↗ 12%</b><span>vs. mês anterior</span></div>
        </Link>
        <Link href="/goals" className="dashboard-card stat-card">
          <span className="dashboard-icon goal-bg"><Target /></span>
          <div><small>Guardado em metas</small><strong>{formatMoney(goalsSaved)}</strong></div>
          <div className="stat-change"><b>↗ 0%</b><span>vs. mês anterior</span></div>
        </Link>

        <article className="dashboard-card cashflow-card">
          <div className="dashboard-card-head">
            <div><p className="dashboard-label">FLUXO DE CAIXA</p><h2>Receitas x despesas <ChevronRight /></h2></div>
            <div className="period-tabs"><b>6 meses</b><span>12 meses</span><span>Todos</span></div>
          </div>
          <CashFlowChart data={monthlyData} />
        </article>

        <article className="dashboard-card health-card">
          <div className="dashboard-card-head"><p className="dashboard-label">SAÚDE FINANCEIRA</p><Link href="/goals">Ver detalhes</Link></div>
          <div className="health-overview">
            <div className="health-ring" style={{ background: `conic-gradient(var(--accent) ${healthScore}%, #24301f 0)` }}><span>{healthScore}%</span></div>
            <div><strong>{healthScore >= 60 ? "Boa evolução!" : "Você está avançando!"}</strong><p>Você está no caminho certo.<br />Mantenha o foco nas suas metas.</p></div>
          </div>
          <div className="health-list">
            <div><span><CircleDollarSign /></span><p><b>Suas despesas estão sob controle</b><small>Continue assim!</small></p><ChevronRight /></div>
            <div><span><Sprout /></span><p><b>Você está investindo regularmente</b><small>Ótimo progresso!</small></p><ChevronRight /></div>
            <div><span className="orange"><Target /></span><p><b>Tente aumentar suas receitas</b><small>Novas oportunidades podem acelerar seus planos.</small></p><ChevronRight /></div>
          </div>
        </article>

        <article className="dashboard-card expenses-card">
          <div className="dashboard-card-head"><div><p className="dashboard-label">DISTRIBUIÇÃO</p><h2>Maiores despesas <ChevronRight /></h2></div><Link href="/transactions">Ver todas</Link></div>
          <CategoryChart data={categories} total={expenses} />
        </article>

        <article className="dashboard-card recent-card">
          <div className="dashboard-card-head"><div><p className="dashboard-label">MOVIMENTAÇÕES RECENTES</p></div><Link href="/transactions">Ver todas</Link></div>
          {recentTransactions.length ? (
            <div className="dashboard-transactions">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id}>
                  <span className={`transaction-icon ${transaction.type}`}>
                    {transaction.type === "income" ? <ArrowDownLeft /> : transaction.type === "transfer" ? <ArrowRightLeft /> : <ArrowUpRight />}
                  </span>
                  <p><strong>{transaction.description}</strong><small>{formatDate(transaction.transactionDate)}</small></p>
                  <b className={transaction.type === "income" ? "positive" : transaction.type === "expense" ? "negative" : ""}>
                    {transaction.type === "income" ? "+ " : transaction.type === "expense" ? "− " : ""}{formatMoney(transaction.amount)}
                  </b>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty"><ReceiptText /><p>Nenhuma transação ainda.</p><Link className="text-link" href="/transactions/new">Começar agora</Link></div>
          )}
        </article>
      </section>
    </Shell>
  );
}
