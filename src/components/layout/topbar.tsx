"use client";

import Link from "next/link";

export function Topbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 lg:left-72 lg:px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Painel
        </p>
        <h1 className="text-lg font-semibold text-slate-900">
          Sistema Administrativo
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/app/perfil"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Meu perfil
        </Link>
      </div>
    </header>
  );
}
