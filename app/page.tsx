"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-mail ou senha incorretos. Tente novamente.");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <>
      {/* ── TOP BAR ── */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--topbar-h)",
        background: "rgba(8,12,16,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 30,
            height: 30,
            background: "linear-gradient(135deg, #14b8a6, #0d9488)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 700,
          }}>◈</span>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}>MeuSite</span>
        </div>
        <nav style={{ display: "flex", gap: 24 }}>
          {["Início", "Sobre", "Contato"].map((item) => (
            <a key={item} href="#" style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--brand)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >{item}</a>
          ))}
        </nav>
      </header>

      {/* ── MAIN LOGIN AREA ── */}
      <main style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "var(--topbar-h)",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          width: 1,
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(20,184,166,0.15), transparent)",
          left: "50%",
          pointerEvents: "none",
        }} />

        {/* Card */}
        <div className="anim-fade-up" style={{
          width: "100%",
          maxWidth: 420,
          padding: "48px 40px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.05)",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Card top accent */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--brand), transparent)",
            borderRadius: 999,
          }} />

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 52,
              height: 52,
              background: "var(--brand-dim)",
              border: "1px solid var(--border-accent)",
              borderRadius: 14,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 20,
            }}>◈</div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}>Bem-vindo de volta</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              Faça login para acessar o painel
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {error && (
              <div style={{
                padding: "12px 16px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 10,
                color: "#f87171",
                fontSize: 13,
                textAlign: "center",
              }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  padding: "12px 16px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text-primary)",
                  fontSize: 14,
                  outline: "none",
                  transition: "border-color 0.2s",
                  width: "100%",
                }}
                onFocus={e => (e.target.style.borderColor = "var(--brand)")}
                onBlur={e => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  padding: "12px 16px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text-primary)",
                  fontSize: 14,
                  outline: "none",
                  transition: "border-color 0.2s",
                  width: "100%",
                }}
                onFocus={e => (e.target.style.borderColor = "var(--brand)")}
                onBlur={e => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: "13px 24px",
                background: loading
                  ? "rgba(20,184,166,0.4)"
                  : "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s, transform 0.15s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => !loading && (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {loading ? "Entrando…" : "Entrar →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--text-muted)" }}>
            Não tem conta?{" "}
            <a href="#" style={{ color: "var(--brand)", textDecoration: "none" }}>
              Fale com o administrador
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
