import Link from "next/link";
import { ArrowLeft, BarChart3, LogOut, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin-nav";

export async function AdminShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand"><span><BarChart3 /></span><div>Nexo <b>Finance</b><small>Administração</small></div></Link>
      <AdminNav />
      <div className="admin-side-footer"><Link href="/"><ArrowLeft />Voltar ao aplicativo</Link><form action={logout}><button type="submit"><LogOut />Sair</button></form></div>
    </aside>
    <main className="admin-main">
      <header className="admin-header"><div><p>PAINEL ADMINISTRATIVO</p><h1>{title}</h1><span>{description}</span></div><div className="admin-profile"><ShieldCheck /><span><small>Acesso protegido</small><b>{admin.name}</b></span></div></header>
      <div className="admin-content">{children}</div>
    </main>
  </div>;
}
