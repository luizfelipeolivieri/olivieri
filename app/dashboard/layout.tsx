"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const navItems = [
  { icon: "⊞", label: "Visão Geral",  href: "/dashboard" },
  { icon: "◷", label: "Calendário",   href: "/dashboard/calendario" },
  { icon: "◈", label: "Relatórios",   href: "/dashboard/relatorios" },
  { icon: "⊙", label: "Usuários",     href: "/dashboard/usuarios" },
  { icon: "◎", label: "Configurações",href: "/dashboard/configuracoes" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string>("");
  const [sideOpen, setSideOpen] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? "");
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

      {/* ── TOP BAR ── */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--topbar-h)",
        background: "rgba(8,12,16,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px 0 0",
        zIndex: 200,
      }}>
        {/* Left: logo + hamburger */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* sidebar toggle */}
          <button
            onClick={() => setSideOpen(v => !v)}
            style={{
              width: "var(--topbar-h)",
              height: "var(--topbar-h)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: 18,
              flexShrink: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
          >☰</button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 28,
              height: 28,
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              borderRadius: 7,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
            }}>◈</span>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "-0.02em",
            }}>MeuSite</span>
          </div>
        </div>

        {/* Center nav links */}
        <nav style={{ display: "flex", gap: 4 }}>
          {["Início", "Documentação", "Suporte"].map(item => (
            <a key={item} href="#" style={{
              padding: "6px 14px",
              borderRadius: 8,
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
            >{item}</a>
          ))}
        </nav>

        {/* Right: user info + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>{userEmail}</span>

          <button
            onClick={handleLogout}
            style={{
              padding: "7px 16px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 8,
              color: "#f87171",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.18)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
          >Sair</button>
        </div>
      </header>

      {/* ── SIDEBAR ── */}
      <aside style={{
        position: "fixed",
        top: "var(--topbar-h)",
        left: 0,
        bottom: 0,
        width: sideOpen ? "var(--sidebar-w)" : "60px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
        zIndex: 150,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}>
        {/* Section label */}
        {sideOpen && (
          <div style={{
            padding: "0 16px 12px",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}>Menu</div>
        )}

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 8px" }}>
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: sideOpen ? "10px 12px" : "10px 0",
                  justifyContent: sideOpen ? "flex-start" : "center",
                  borderRadius: 10,
                  textDecoration: "none",
                  background: active ? "var(--brand-dim)" : "transparent",
                  border: `1px solid ${active ? "var(--border-accent)" : "transparent"}`,
                  color: active ? "var(--brand)" : "var(--text-secondary)",
                  fontSize: 14,
                  fontWeight: active ? 500 : 400,
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {sideOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* Bottom user avatar */}
        <div style={{
          padding: sideOpen ? "16px" : "8px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: sideOpen ? "flex-start" : "center",
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            flexShrink: 0,
          }}>
            {userEmail ? userEmail[0].toUpperCase() : "U"}
          </div>
          {sideOpen && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {userEmail || "Usuário"}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Admin</div>
            </div>
          )}
        </div>
      </aside>

      {/* ── PAGE CONTENT ── */}
      <main style={{
        marginTop: "var(--topbar-h)",
        marginLeft: sideOpen ? "var(--sidebar-w)" : "60px",
        padding: "36px 40px",
        minHeight: "calc(100vh - var(--topbar-h))",
        transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {children}
      </main>
    </div>
  );
}
