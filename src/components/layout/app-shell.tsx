"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="min-h-screen lg:pl-72">
        <Topbar />
        <main className="px-4 py-24 md:px-6">{children}</main>
      </div>
    </div>
  );
}
