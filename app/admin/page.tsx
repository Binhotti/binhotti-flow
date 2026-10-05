import type { Metadata } from "next";
import { Activity, CalendarDays, Database, PiggyBank, ReceiptText, Target, UserCheck, Users, WalletCards } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { DAY, money, percentage, startOfDay } from "@/lib/admin-metrics";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administração | Nexo Finance", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const now = new Date(), onlineSince = new Date(now.getTime() - 5 * 60_000), activeSince = new Date(now.getTime() - 30 * DAY), monthStart = new Date(now.getFullYear(), now.getMonth(), 1), sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const [totalUsers, online, active30, activeToday, newUsers, accountCount, transactionCount, investmentCount, goalCount, registrations, transactionValues, investments, goals] = await Promise.all([
    prisma.user.count(), prisma.user.count({ where: { lastSeenAt: { gte: onlineSince } } }), prisma.user.count({ where: { lastSeenAt: { gte: activeSince } } }), prisma.user.count({ where: { lastSeenAt: { gte: startOfDay(now) } } }), prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.account.count(), prisma.transaction.count(), prisma.investment.count(), prisma.goal.count(),
    prisma.user.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.transaction.findMany({ where: { status: "paid" }, select: { type: true, amount: true } }), prisma.investment.aggregate({ _sum: { amount: true } }), prisma.goal.aggregate({ _sum: { currentAmount: true } }),
  ]);
  const income = transactionValues.filter((item) => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0), expense = transactionValues.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0), managed = income + Number(investments._sum.amount ?? 0) + Number(goals._sum.currentAmount ?? 0);
  const months = Array.from({ length: 6 }, (_, index) => { const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1); return { key: `${date.getFullYear()}-${date.getMonth()}`, label: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date).replace(".", ""), value: 0 }; });
  registrations.forEach(({ createdAt }) => { const month = months.find((item) => item.key === `${createdAt.getFullYear()}-${createdAt.getMonth()}`); if (month) month.value += 1; });
  const max = Math.max(1, ...months.map((item) => item.value));
  return <AdminShell title="Visão geral" description="Indicadores centrais de crescimento, atividade e valores da plataforma.">
    <section className="admin-metrics">
      <article className="admin-metric admin-metric-highlight"><span><Users /></span><small>Usuários cadastrados</small><strong>{totalUsers}</strong><p>{newUsers} novos neste mês</p></article>
      <article className="admin-metric"><span><Activity /></span><small>Online agora</small><strong>{online}</strong><p>Atividade nos últimos 5 minutos</p></article>
      <article className="admin-metric"><span><UserCheck /></span><small>Ativos em 30 dias</small><strong>{active30}</strong><p>{percentage(active30, totalUsers)}% da base · {activeToday} hoje</p></article>
      <article className="admin-metric"><span><Database /></span><small>Valor acompanhado</small><strong className="admin-money-value">{money(managed)}</strong><p>Receitas, caixinhas e metas</p></article>
    </section>
    <section className="admin-grid">
      <article className="admin-panel admin-growth"><div className="admin-panel-head"><div><small>CRESCIMENTO</small><h2>Novos usuários</h2></div><span><CalendarDays />6 meses</span></div><div className="admin-bars">{months.map((month) => <div key={month.key}><b>{month.value}</b><i style={{ height: `${Math.max(5, month.value / max * 100)}%` }} /><span>{month.label}</span></div>)}</div></article>
      <article className="admin-panel admin-usage"><div className="admin-panel-head"><div><small>USO DA PLATAFORMA</small><h2>Recursos utilizados</h2></div></div>{[[WalletCards,"Contas",accountCount],[ReceiptText,"Transações",transactionCount],[PiggyBank,"Caixinhas",investmentCount],[Target,"Metas",goalCount]].map(([Icon,label,value]) => { const ItemIcon = Icon as typeof WalletCards; return <div className="admin-usage-row" key={String(label)}><span><ItemIcon /></span><p>{String(label)}<small>Total registrado</small></p><strong>{Number(value)}</strong></div>; })}</article>
    </section>
    <section className="admin-value-grid"><article className="admin-panel"><small>RECEITAS REGISTRADAS</small><strong>{money(income)}</strong><p>Somatório agregado da plataforma</p></article><article className="admin-panel"><small>DESPESAS REGISTRADAS</small><strong>{money(expense)}</strong><p>Somatório agregado da plataforma</p></article><article className="admin-panel"><small>SALDO DE MOVIMENTAÇÕES</small><strong>{money(income - expense)}</strong><p>Receitas menos despesas</p></article></section>
  </AdminShell>;
}
