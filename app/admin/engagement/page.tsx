import { Activity, CalendarCheck, MousePointerClick, Repeat2 } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { DAY, percentage, startOfDay } from "@/lib/admin-metrics";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EngagementPage() {
  const now = new Date(), week = new Date(now.getTime() - 7 * DAY), month = new Date(now.getTime() - 30 * DAY);
  const [total, dau, wau, mau, returning, activityPulses, withAccounts, withTransactions, withInvestments, withGoals] = await Promise.all([
    prisma.user.count(), prisma.user.count({ where: { lastSeenAt: { gte: startOfDay(now) } } }), prisma.user.count({ where: { lastSeenAt: { gte: week } } }), prisma.user.count({ where: { lastSeenAt: { gte: month } } }), prisma.user.count({ where: { loginCount: { gt: 1 } } }), prisma.userActivity.count({ where: { createdAt: { gte: month } } }),
    prisma.user.count({ where: { accounts: { some: {} } } }), prisma.user.count({ where: { transactions: { some: {} } } }), prisma.user.count({ where: { investments: { some: {} } } }), prisma.user.count({ where: { goals: { some: {} } } }),
  ]);
  const adoption = [{ label: "Criaram uma conta", value: withAccounts }, { label: "Registraram transação", value: withTransactions }, { label: "Criaram caixinha", value: withInvestments }, { label: "Definiram uma meta", value: withGoals }];
  return <AdminShell title="Engajamento" description="Frequência de acesso, recorrência e adoção dos recursos.">
    <section className="admin-metrics"><article className="admin-metric admin-metric-highlight"><span><Activity /></span><small>DAU</small><strong>{dau}</strong><p>Ativos hoje</p></article><article className="admin-metric"><span><CalendarCheck /></span><small>WAU</small><strong>{wau}</strong><p>Ativos em 7 dias</p></article><article className="admin-metric"><span><MousePointerClick /></span><small>MAU</small><strong>{mau}</strong><p>Ativos em 30 dias</p></article><article className="admin-metric"><span><Repeat2 /></span><small>Recorrentes</small><strong>{returning}</strong><p>{percentage(returning,total)}% retornaram</p></article></section>
    <section className="admin-grid"><article className="admin-panel"><div className="admin-panel-head"><div><small>ADOÇÃO</small><h2>Uso por recurso</h2></div></div><div className="admin-adoption">{adoption.map((item) => <div key={item.label}><header><b>{item.label}</b><span>{item.value} · {percentage(item.value,total)}%</span></header><div><i style={{ width: `${percentage(item.value,total)}%` }} /></div></div>)}</div></article><article className="admin-panel admin-score"><small>INTENSIDADE</small><strong>{activityPulses}</strong><h2>pulsos de atividade</h2><p>Interações registradas nos últimos 30 dias, limitadas a uma marcação por usuário a cada cinco minutos.</p></article></section>
  </AdminShell>;
}
