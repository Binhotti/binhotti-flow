import { Activity, UserCheck, UserMinus, Users } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { DAY, formatDate, relativeAccess, userStatus } from "@/lib/admin-metrics";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const now = new Date(), onlineSince = new Date(now.getTime() - 5 * 60_000), activeSince = new Date(now.getTime() - 30 * DAY);
  const [users, online, active, never] = await Promise.all([
    prisma.user.findMany({ orderBy: [{ lastSeenAt: "desc" }, { createdAt: "desc" }], take: 100, select: { id: true, name: true, email: true, createdAt: true, lastSeenAt: true, loginCount: true, _count: { select: { accounts: true, transactions: true, investments: true, goals: true } } } }),
    prisma.user.count({ where: { lastSeenAt: { gte: onlineSince } } }), prisma.user.count({ where: { lastSeenAt: { gte: activeSince } } }), prisma.user.count({ where: { lastSeenAt: null } }),
  ]);
  return <AdminShell title="Usuários" description="Status, última atividade e adoção individual dos recursos.">
    <section className="admin-metrics admin-metrics-compact"><article className="admin-metric admin-metric-highlight"><span><Users /></span><small>Total</small><strong>{users.length}</strong><p>Até 100 usuários recentes</p></article><article className="admin-metric"><span><Activity /></span><small>Online</small><strong>{online}</strong><p>Últimos 5 minutos</p></article><article className="admin-metric"><span><UserCheck /></span><small>Ativos</small><strong>{active}</strong><p>Últimos 30 dias</p></article><article className="admin-metric"><span><UserMinus /></span><small>Nunca acessaram</small><strong>{never}</strong><p>Sem atividade registrada</p></article></section>
    <section className="admin-panel admin-users"><div className="admin-panel-head"><div><small>BASE DE USUÁRIOS</small><h2>Atividade e utilização</h2></div><span>{users.length} exibidos</span></div><div className="admin-table-wrap"><table><thead><tr><th>Usuário</th><th>Cadastro</th><th>Última atividade</th><th>Logins</th><th>Uso</th><th>Status</th></tr></thead><tbody>{users.map((user) => { const status = userStatus(user.lastSeenAt, now), usage = user._count.accounts + user._count.transactions + user._count.investments + user._count.goals; return <tr key={user.id}><td><span className="admin-avatar">{user.name.charAt(0).toUpperCase()}</span><div><b>{user.name}</b><small>{user.email}</small></div></td><td>{formatDate(user.createdAt)}</td><td><b>{relativeAccess(user.lastSeenAt)}</b><small>{formatDate(user.lastSeenAt)}</small></td><td>{user.loginCount}</td><td>{usage} itens</td><td><span className={`admin-status ${status.key}`}>{status.label}</span></td></tr>; })}</tbody></table></div></section>
  </AdminShell>;
}
