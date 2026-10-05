"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  Plus,
  ReceiptText,
  Search,
  Target,
  WalletCards,
} from "lucide-react";
import { logout } from "@/app/actions";

const navigation = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/accounts", label: "Contas", icon: WalletCards },
  { href: "/transactions", label: "Transações", icon: ReceiptText },
  { href: "/investments", label: "Caixinhas", icon: PiggyBank },
  { href: "/goals", label: "Metas", icon: Target },
];

export function Shell({
  children,
  title,
  description,
  action,
  dashboard = false,
  userName,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  action?: { href: string; label: string };
  dashboard?: boolean;
  userName?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(
    () =>
      setCollapsed(window.localStorage.getItem("sidebar-collapsed") === "true"),
    [],
  );

  function toggleSidebar() {
    setCollapsed((current) => {
      window.localStorage.setItem("sidebar-collapsed", String(!current));
      return !current;
    });
  }

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link href="/" className="brand" aria-label="Nexo Finance">
            <span className="brand-mark">
              <BarChart3 />
            </span>
            <span className="brand-name">
              Nexo <b>Finance</b>
            </span>
          </Link>
          <button
            className="sidebar-toggle"
            type="button"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Abrir menu" : "Recolher menu"}
          >
            <ChevronLeft />
          </button>
        </div>
        <nav aria-label="Navegação principal">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                href={href}
                key={href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
                title={label}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <form action={logout} className="logout-form">
          <button className="logout" type="submit" title="Sair">
            <LogOut />
            <span>Sair</span>
          </button>
        </form>
      </aside>
      <main>
        <header className={`topbar ${dashboard ? "dashboard-topbar" : ""}`}>
          <div>
            <p>ASSISTENTE FINANCEIRO</p>
            <h1>
              {title} {dashboard && <span className="welcome-wave">👋</span>}
            </h1>
            <span>{description}</span>
          </div>
          <div className="topbar-tools">
            {dashboard && (
              <>
                <button type="button" aria-label="Pesquisar">
                  <Search />
                </button>
                <button type="button" aria-label="Notificações">
                  <Bell />
                </button>
                <span className="profile-pill">
                  <b>{userName?.charAt(0).toUpperCase()}</b>
                  <strong>{userName}</strong>
                </span>
              </>
            )}
            {action && (
              <Link className="button topbar-action" href={action.href}>
                <Plus />
                <span>{action.label}</span>
              </Link>
            )}
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
      <nav className="mobile-navigation" aria-label="Navegação do aplicativo">
        {navigation.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link href={href} key={href} className={active ? "active" : ""}>
              <Icon />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
