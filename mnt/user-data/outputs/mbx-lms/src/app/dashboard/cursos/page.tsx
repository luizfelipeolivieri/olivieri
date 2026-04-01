import { createClient } from '@/lib/supabase/server'

export default async function CursosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(title, description, duration_months, price_monthly)')
    .eq('user_id', user!.id)
    .eq('status', 'active')

  const mock = [
    { title: 'MBA Gestão Empresarial', desc: 'Prof. Rafael Pinto · 18 meses · 340h', progress: 64, modInfo: 'Módulo 4 de 8', deadline: 'Dez 2026', status: 'active', bg: '#F5F3EE', emoji: '🎓' },
    { title: 'Workshop: Liderança Ágil', desc: 'Prof. Ana Martins · 2 meses · 40h', progress: 100, modInfo: 'Concluído', deadline: '', status: 'completed', bg: '#EEF4FF', emoji: '💼' },
    { title: 'Finanças para Executivos', desc: 'Prof. João Silva · 3 meses · 60h', progress: 28, modInfo: 'Módulo 1 de 6', deadline: 'Jun 2026', status: 'active', bg: '#EDFAF3', emoji: '📊' },
  ]

  const items = enrollments && enrollments.length > 0
    ? enrollments.map((e, i) => ({
        title: (e.courses as { title: string } | null)?.title ?? 'Curso',
        desc: `${(e.courses as { duration_months: number } | null)?.duration_months ?? 12} meses`,
        progress: e.progress,
        modInfo: `${e.progress}% concluído`,
        deadline: '',
        status: e.status,
        bg: mock[i % mock.length].bg,
        emoji: mock[i % mock.length].emoji,
      }))
    : mock

  const statusPill = (s: string) =>
    s === 'completed'
      ? 'bg-[#EEF4FF] text-[#2563EB]'
      : s === 'active' && mock.find(m => m.progress < 40)
      ? 'bg-[#FFF3EC] text-[#C8530A]'
      : 'bg-[#EDFAF3] text-[#1A7A4A]'
  const statusLabel = (s: string, p: number) =>
    s === 'completed' ? 'Concluído' : p < 30 ? 'Iniciando' : 'Em andamento'

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-[26px] font-bold tracking-tight mb-1">Meus Cursos</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">Acompanhe o progresso dos seus cursos</p>
      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {items.map((c, i) => (
          <div key={i} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow)] transition-all cursor-pointer">
            <div className="h-[110px] flex items-center justify-center text-4xl" style={{ background: c.bg }}>{c.emoji}</div>
            <div className="p-5">
              <h4 className="text-[15px] font-bold tracking-tight mb-1">{c.title}</h4>
              <p className="text-[12.5px] text-[var(--text-3)] mb-4">{c.desc}</p>
              <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-[var(--text)] rounded-full transition-all" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-3)] mb-4">
                <span>{c.modInfo}</span><span>{c.progress}%</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
                <span className="text-[12px] text-[var(--text-3)]">{c.deadline ? `🗓 Prazo: ${c.deadline}` : '🏆 Certificado emitido'}</span>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusPill(c.status)}`}>{statusLabel(c.status, c.progress)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
