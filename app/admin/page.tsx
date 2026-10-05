import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Database,
  LogOut,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  WalletCards,
} from "lucide-react";
import { logout } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administração | Nexo Finance",
  robots: { index: false, follow: false },
};

const DAY = 86_400_000;

function formatDate(date: Date | null) {
  if (!date) return "Nunca";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function relativeAccess(date: Date | null) {
  if (!date) return "Nunca acessou";
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / DAY));
  if (days === 0) return "Hoje";
  if (days === 1) return "Ontem";
  return `Há ${days} dias`;
}

export default async function AdminPage() {
  const admin = await requireAdmin();
  const now = new Date();
  const activeSince = new Date(now.getTime() - 30 * DAY);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [
    totalUsers,
    activeUsers,
    activeToday,
    newUsers,
    accountCount,
    transactionCount,
    investmentCount,
    goalCount,
    users,
    registrations,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { lastLoginAt: { gte: activeSince } } }),
    prisma.user.count({ where: { lastLoginAt: { gte: today } } }),
    prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.account.count(),
    prisma.transaction.count(),
    prisma.investment.count(),
    prisma.goal.count(),
    prisma.user.findMany({
      orderBy: [{ lastLoginAt: "desc" }, { createdAt: "desc" }],
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        lastLoginAt: true,
        loginCount: true,
        _count: {
          select: {
            accounts: true,
            transactions: true,
            investments: true,
            goals: true,
          },
        },
      },
    }),
    prisma.user.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
  ]);

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: new Intl.DateTimeFormat("pt-BR", { month: "short" })
        .format(date)
        .replace(".", ""),
      value: 0,
    };
  });
  registrations.forEach(({ createdAt }) => {
    const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
    const month = months.find((item) => item.key === key);
    if (month) month.value += 1;
  });
  const maxRegistrations = Math.max(1, ...months.map(({ value }) => value));
  const engagement = totalUsers
    ? Math.round((activeUsers / totalUsers) * 100)
    : 0;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <span><BarChart3 /></span>
          <div>Nexo <b>Finance</b><small>Administração</small></div>
        </Link>
        <nav>
          <a className="active" href="#visao-geral"><Activity />Visão geral</a>
          <a href="#usuarios"><Users />Usuários</a>
          <a href="#crescimento"><BarChart3 />Crescimento</a>
        </nav>
        <div className="admin-side-footer">
          <Link href="/"><ArrowLeft />Voltar ao aplicativo</Link>
          <form action={logout}><button type="submit"><LogOut />Sair</button></form>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p>PAINEL ADMINISTRATIVO</p>
            <h1>Visão geral</h1>
            <span>Acompanhe o crescimento e a atividade da plataforma.</span>
          </div>
          <div className="admin-profile">
            <ShieldCheck />
            <span><small>Acesso protegido</small><b>{admin.name}</b></span>
          </div>
        </header>

        <div className="admin-content" id="visao-geral">
          <section className="admin-metrics">
            <article className="admin-metric admin-metric-highlight">
              <span><Users /></span><small>Usuários cadastrados</small>
              <strong>{totalUsers}</strong><p>{newUsers} novos neste mês</p>
            </article>
            <article className="admin-metric">
              <span><UserCheck /></span><small>Ativos nos últimos 30 dias</small>
              <strong>{activeUsers}</strong><p>{engagement}% da base total</p>
            </article>
            <article className="admin-metric">
              <span><Activity /></span><small>Ativos hoje</small>
              <strong>{activeToday}</strong><p>Acessos desde 00:00</p>
            </article>
            <article className="admin-metric">
              <span><Database /></span><small>Registros financeiros</small>
              <strong>{accountCount + transactionCount + investmentCount + goalCount}</strong>
              <p>Itens criados pelos usuários</p>
            </article>
          </section>

          <section className="admin-grid" id="crescimento">
            <article className="admin-panel admin-growth">
              <div className="admin-panel-head">
                <div><small>CRESCIMENTO</small><h2>Novos usuários</h2></div>
                <span><CalendarDays />6 meses</span>
              </div>
              <div className="admin-bars">
                {months.map((month) => (
                  <div key={month.key}>
                    <b>{month.value}</b>
                    <i style={{ height: `${Math.max(5, (month.value / maxRegistrations) * 100)}%` }} />
                    <span>{month.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel admin-usage">
              <div className="admin-panel-head"><div><small>USO DA PLATAFORMA</small><h2>Recursos utilizados</h2></div></div>
              {[
                [WalletCards, "Contas", accountCount],
                [ReceiptText, "Transações", transactionCount],
                [PiggyBank, "Caixinhas", investmentCount],
                [Target, "Metas", goalCount],
              ].map(([Icon, label, value]) => {
                const UsageIcon = Icon as typeof WalletCards;
                return <div className="admin-usage-row" key={String(label)}><span><UsageIcon /></span><p>{String(label)}<small>Total registrado</small></p><strong>{Number(value)}</strong></div>;
              })}
            </article>
          </section>

          <section className="admin-panel admin-users" id="usuarios">
            <div className="admin-panel-head">
              <div><small>USUÁRIOS</small><h2>Atividade recente</h2></div>
              <span>{users.length} exibidos</span>
            </div>
            <div className="admin-table-wrap">
              <table>
                <thead><tr><th>Usuário</th><th>Cadastro</th><th>Último acesso</th><th>Acessos</th><th>Uso</th><th>Status</th></tr></thead>
                <tbody>
                  {users.map((user) => {
                    const active = Boolean(user.lastLoginAt && user.lastLoginAt >= activeSince);
                    const usage = user._count.accounts + user._count.transactions + user._count.investments + user._count.goals;
                    return (
                      <tr key={user.id}>
                        <td><span className="admin-avatar">{user.name.charAt(0).toUpperCase()}</span><div><b>{user.name}</b><small>{user.email}</small></div></td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td><b>{relativeAccess(user.lastLoginAt)}</b><small>{formatDate(user.lastLoginAt)}</small></td>
                        <td>{user.loginCount}</td>
                        <td>{usage} itens</td>
                        <td><span className={`admin-status ${active ? "active" : "inactive"}`}>{active ? "Ativo" : "Inativo"}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <p className="admin-privacy"><ShieldCheck /> O painel não exibe senhas nem detalhes financeiros individuais.</p>
        </div>
      </main>
    </div>
  );
}
