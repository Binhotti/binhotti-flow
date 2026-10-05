import { ArrowDownRight, ArrowUpRight, PiggyBank, Target } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { money, percentage } from "@/lib/admin-metrics";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const now = new Date(), sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const [transactions, investments, goals, accounts] = await Promise.all([
    prisma.transaction.findMany({ where: { status: "paid" }, select: { type: true, amount: true, transactionDate: true } }), prisma.investment.aggregate({ _sum: { amount: true }, _count: true }), prisma.goal.aggregate({ _sum: { currentAmount: true, targetAmount: true }, _count: true }), prisma.account.aggregate({ _sum: { initialBalance: true }, _count: true }),
  ]);
  const income = transactions.filter((item) => item.type === "income").reduce((sum,item) => sum + Number(item.amount),0), expense = transactions.filter((item) => item.type === "expense").reduce((sum,item) => sum + Number(item.amount),0), invested = Number(investments._sum.amount ?? 0), saved = Number(goals._sum.currentAmount ?? 0), target = Number(goals._sum.targetAmount ?? 0);
  const months = Array.from({ length: 6 }, (_, index) => { const date = new Date(now.getFullYear(),now.getMonth()-5+index,1); return { key:`${date.getFullYear()}-${date.getMonth()}`,label:new Intl.DateTimeFormat("pt-BR",{month:"short"}).format(date).replace(".",""),income:0,expense:0 }; });
  transactions.filter((item) => item.transactionDate >= sixMonthsAgo).forEach((item) => { const month = months.find((value) => value.key === `${item.transactionDate.getFullYear()}-${item.transactionDate.getMonth()}`); if (!month) return; if (item.type === "income") month.income += Number(item.amount); if (item.type === "expense") month.expense += Number(item.amount); });
  const max = Math.max(1,...months.flatMap((item)=>[item.income,item.expense]));
  return <AdminShell title="Financeiro" description="Valores agregados da plataforma, sem exposição individual.">
    <section className="admin-metrics"><article className="admin-metric admin-metric-highlight"><span><ArrowUpRight /></span><small>Receitas</small><strong className="admin-money-value">{money(income)}</strong><p>{transactions.filter((item)=>item.type==="income").length} lançamentos</p></article><article className="admin-metric"><span><ArrowDownRight /></span><small>Despesas</small><strong className="admin-money-value">{money(expense)}</strong><p>{transactions.filter((item)=>item.type==="expense").length} lançamentos</p></article><article className="admin-metric"><span><PiggyBank /></span><small>Em caixinhas</small><strong className="admin-money-value">{money(invested)}</strong><p>{investments._count} caixinhas</p></article><article className="admin-metric"><span><Target /></span><small>Guardado em metas</small><strong className="admin-money-value">{money(saved)}</strong><p>{percentage(saved,target)}% de {money(target)}</p></article></section>
    <section className="admin-panel admin-finance-chart"><div className="admin-panel-head"><div><small>FLUXO AGREGADO</small><h2>Receitas e despesas</h2></div><span>6 meses</span></div><div className="admin-double-bars">{months.map((month)=><div key={month.key}><b>{money(month.income - month.expense)}</b><div><i className="income" style={{height:`${Math.max(3,month.income/max*100)}%`}}/><i className="expense" style={{height:`${Math.max(3,month.expense/max*100)}%`}}/></div><span>{month.label}</span></div>)}</div><div className="admin-chart-legend"><span><i className="income"/>Receitas</span><span><i className="expense"/>Despesas</span></div></section>
    <section className="admin-value-grid"><article className="admin-panel"><small>SALDO DE MOVIMENTAÇÕES</small><strong>{money(income-expense)}</strong><p>Receitas menos despesas</p></article><article className="admin-panel"><small>SALDO INICIAL EM CONTAS</small><strong>{money(Number(accounts._sum.initialBalance ?? 0))}</strong><p>{accounts._count} contas cadastradas</p></article><article className="admin-panel"><small>PATRIMÔNIO MONITORADO</small><strong>{money(invested+saved+Number(accounts._sum.initialBalance ?? 0))}</strong><p>Valor agregado acompanhado</p></article></section>
  </AdminShell>;
}
