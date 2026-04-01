export default function SeriePage() {
  const series = [
    { icon: '🎙', title: 'Líderes que Transformam',   desc: 'Entrevistas com executivos que mudaram suas organizações.',    eps: 12, status: 'new',      bg: '#F5F3EE' },
    { icon: '📰', title: 'MBA em Doses',               desc: 'Conceitos do MBA em formatos curtos e diretos ao ponto.',      eps: 24, status: 'ongoing',  bg: '#EEF4FF' },
    { icon: '🔬', title: 'Inovação na Prática',        desc: 'Cases reais de inovação e transformação digital.',             eps: 18, status: 'complete', bg: '#EDFAF3' },
    { icon: '📈', title: 'Finanças Descomplicadas',    desc: 'Indicadores financeiros e valuation de forma acessível.',     eps: 15, status: 'soon',     bg: '#FFF3EC' },
  ]
  const pillCls = (s: string) =>
    s === 'new' ? 'bg-[#EDFAF3] text-[#1A7A4A]' :
    s === 'ongoing' ? 'bg-[#EEF4FF] text-[#2563EB]' :
    s === 'complete' ? 'bg-[#F2F2F2] text-[#888]' :
    'bg-[#FFF3EC] text-[#C8530A]'
  const pillLabel = (s: string) =>
    s === 'new' ? 'Novo' : s === 'ongoing' ? 'Em andamento' : s === 'complete' ? 'Completo' : 'Em breve'

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-[26px] font-bold tracking-tight mb-1">Série Acadêmica</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">Conteúdos complementares para aprofundar seu conhecimento</p>
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {series.map(s => (
          <div key={s.title} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow)] transition-all cursor-pointer">
            <div className="h-[90px] flex items-center justify-center text-4xl" style={{ background: s.bg }}>{s.icon}</div>
            <div className="p-5">
              <h4 className="text-[14px] font-bold tracking-tight mb-1.5">{s.title}</h4>
              <p className="text-[12.5px] text-[var(--text-3)] leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[var(--text-3)]">{s.eps} episódios</span>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${pillCls(s.status)}`}>{pillLabel(s.status)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
