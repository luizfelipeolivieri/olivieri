"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Database,
  DollarSign,
  Home,
  Shield,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/app/dashboard", label: "Dashboard", icon: Home },
  { href: "/app/data", label: "Data", icon: Database },
  { href: "/app/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/app/usuarios", label: "Usuários", icon: Shield },
  { href: "/app/aula", label: "Aula", icon: BookOpen },
  { href: "/app/perfil", label: "Perfil", icon: UserCircle2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Admin
          </p>
          <h2 className="text-xl font-bold text-slate-900">Meu Sistema</h2>
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
