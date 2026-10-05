"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, CircleDollarSign, Repeat2, Users } from "lucide-react";

const items = [
  { href: "/admin", label: "Visão geral", icon: BarChart3 },
  { href: "/admin/users", label: "Usuários", icon: Users },
  { href: "/admin/engagement", label: "Engajamento", icon: Activity },
  { href: "/admin/retention", label: "Retenção", icon: Repeat2 },
  { href: "/admin/finance", label: "Financeiro", icon: CircleDollarSign },
];

export function AdminNav() {
  const pathname = usePathname();
  return <nav>{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href ? "active" : ""}><Icon /><span>{label}</span></Link>)}</nav>;
}
