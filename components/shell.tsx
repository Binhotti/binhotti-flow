"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  Plus,
  ReceiptText,
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
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  action?: { href: string; label: string };
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
          <Link href="/" className="brand" aria-label="Binhotti Flow">
            <span className="brand-mark">
              <BarChart3 />
            </span>
            <span className="brand-name">
              Binhotti <b>Flow</b>
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
        <header className="topbar">
          <div>
            <p>ASSISTENTE FINANCEIRO</p>
            <h1>{title}</h1>
            <span>{description}</span>
          </div>
          {action && (
            <Link className="button topbar-action" href={action.href}>
              <Plus />
              <span>{action.label}</span>
            </Link>
          )}
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
