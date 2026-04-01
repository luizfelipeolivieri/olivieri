export default function DashboardPage() {
  const cards = [
    { label: "Usuários Ativos",  value: "1.248",  delta: "+12%",  up: true,  icon: "⊙" },
    { label: "Receita Mensal",   value: "R$ 8.4k", delta: "+5.3%", up: true,  icon: "◈" },
    { label: "Tarefas Abertas",  value: "37",      delta: "-3",    up: false, icon: "◷" },
    { label: "Uptime",           value: "99.9%",   delta: "Estável", up: true, icon: "◎" },
  ];

  return (
    <div className="anim-fade-up">
      {/* Page Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          marginBottom: 6,
        }}>Visão Geral</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
          Bem-vindo de volta! Aqui está o resumo do dia.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        marginBottom: 32,
      }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            padding: "24px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.2s, transform 0.2s",
            animationDelay: `${i * 0.08}s`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-accent)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {card.label}
              </span>
              <span style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--brand-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}>{card.icon}</span>
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}>{card.value}</div>
            <div style={{
              fontSize: 12,
              fontWeight: 500,
              color: card.up ? "#34d399" : "#f87171",
            }}>{card.delta}</div>
          </div>
        ))}
      </div>

      {/* Content area placeholder */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}>
        {[
          { title: "Atividade Recente",  desc: "Últimas ações do sistema" },
          { title: "Tarefas Pendentes",  desc: "Itens que precisam de atenção" },
        ].map((box, i) => (
          <div key={i} style={{
            padding: "28px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            minHeight: 200,
          }}>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: 6,
              color: "var(--text-primary)",
            }}>{box.title}</h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>{box.desc}</p>
            <div style={{
              height: 120,
              borderRadius: 8,
              background: "linear-gradient(135deg, rgba(20,184,166,0.05), transparent)",
              border: "1px dashed rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              fontSize: 13,
            }}>
              Conteúdo em breve…
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
