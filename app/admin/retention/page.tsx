import { Clock3, Repeat2, UserCheck, UserMinus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { DAY, percentage } from "@/lib/admin-metrics";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function RetentionPage() {
  const now = new Date(), monthAgo = new Date(now.getTime() - 30 * DAY);
  const users = await prisma.user.findMany({ select: { createdAt: true, lastSeenAt: true, loginCount: true, activities: { select: { createdAt: true } }, _count: { select: { accounts: true, transactions: true } } } });
  const retained = (day: number) => { const eligible = users.filter((user) => now.getTime() - user.createdAt.getTime() >= day * DAY); const count = eligible.filter((user) => user.activities.some((event) => { const age = event.createdAt.getTime() - user.createdAt.getTime(); return age >= day * DAY && age < (day + 1) * DAY; })).length; return { count, total: eligible.length, rate: percentage(count, eligible.length) }; };
  const d1 = retained(1), d7 = retained(7), d30 = retained(30);
  const returning = users.filter((user) => user.loginCount > 1).length, inactive = users.filter((user) => user.lastSeenAt && user.lastSeenAt < monthAgo).length, never = users.filter((user) => !user.lastSeenAt).length, activated = users.filter((user) => user._count.accounts > 0 && user._count.transactions > 0).length;
  return <AdminShell title="Retenção" description="Retorno, ativação e perda de usuários ao longo do tempo.">
    <section className="admin-metrics"><article className="admin-metric admin-metric-highlight"><span><Repeat2 /></span><small>Usuários recorrentes</small><strong>{returning}</strong><p>{percentage(returning,users.length)}% retornaram após o primeiro acesso</p></article><article className="admin-metric"><span><UserCheck /></span><small>Ativados</small><strong>{activated}</strong><p>Criaram conta e primeira transação</p></article><article className="admin-metric"><span><UserMinus /></span><small>Inativos</small><strong>{inactive}</strong><p>Mais de 30 dias sem atividade</p></article><article className="admin-metric"><span><Clock3 /></span><small>Nunca acessaram</small><strong>{never}</strong><p>Sem atividade registrada</p></article></section>
    <section className="admin-retention-grid">{[["D1","Retorno no dia seguinte",d1],["D7","Retorno após 7 dias",d7],["D30","Retorno após 30 dias",d30]].map(([key,label,data]) => { const item = data as typeof d1; return <article className="admin-panel admin-retention-card" key={String(key)}><small>{String(key)}</small><strong>{item.rate}%</strong><h2>{String(label)}</h2><p>{item.count} de {item.total} usuários elegíveis</p><div><i style={{ width: `${item.rate}%` }} /></div></article>; })}</section>
    <p className="admin-note">As coortes passam a ganhar precisão a partir desta atualização, conforme novos eventos de atividade são registrados.</p>
  </AdminShell>;
}
