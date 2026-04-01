import { createClient } from '@/lib/supabase/server'

const MOCK = [
  { id:'1', title:'Gestão Estratégica — Fundamentos', course:'MBA Gestão Empresarial', mod:'Módulo 4', dur:38, date:'10 Mar', status:'available', bg:'#F5F3EE', emoji:'📊' },
  { id:'2', title:'Análise SWOT na Prática',          course:'MBA Gestão Empresarial', mod:'Módulo 4', dur:42, date:'12 Mar', status:'available', bg:'#EEF4FF', emoji:'📈' },
  { id:'3', title:'Canvas de Valor',                  course:'MBA Gestão Empresarial', mod:'Módulo 4', dur:55, date:'17 Mar', status:'new',       bg:'#EDFAF3', emoji:'🎯' },
  { id:'4', title:'OKRs e Planejamento',              course:'MBA Gestão Empresarial', mod:'Módulo 4', dur:47, date:'19 Mar', status:'soon',      bg:'#FFF3EC', emoji:'💡' },
  { id:'5', title:'Case: Magazine Luiza',             course:'MBA Gestão Empresarial', mod:'Módulo 4', dur:61, date:'24 Mar', status:'soon',      bg:'#F5EEFF', emoji:'🏢' },
]

const pill = (s: string) =>
  s === 'available' ? 'bg-[#EDFAF3] text-[#1A7A4A]' : s === 'new' ? 'bg-[#FFF3EC] text-[#C8530A]' : 'bg-[#F2F2F2] text-[#888]'
const pillLabel = (s: string) =>
  s === 'available' ? 'Disponível' : s === 'new' ? 'Novo' : 'Em breve'

export default async function AulasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: classes } = await supabase.from('classes').select('*, courses(title)').order('order_index').limit(10)
  const items = classes && classes.length > 0
    ? classes.map((c, i) => ({
        id: c.id, title: c.title,
        course: (c.courses as { title: string } | null)?.title ?? 'Curso',
        mod: `Módulo ${c.module_number}`,
        dur: c.duration_minutes ?? 0,
        date: new Date(c.created_at).toLocaleDateString('pt-BR', { day:'2-digit', month:'short' }),
        status: 'available', bg: MOCK[i % MOCK.length].bg, emoji: MOCK[i % MOCK.length].emoji,
      }))
    : MOCK

  return (
    <div className="animate-fade-in">
      <div className="px-8 pt-8">
        <h1 className="text-[26px] font-bold tracking-tight mb-5">Aulas</h1>
        <div className="flex gap-2 mb-6 flex-wrap">
          {['Todos','Não visualizados','Em andamento','Concluídos'].map((f, i) => (
            <button key={f} className={`px-4 py-1.5 rounded-full text-[12.5px] font-semibold border-[1.5px] transition-colors ${i===0 ? 'bg-[var(--text)] text-white border-[var(--text)]' : 'bg-white text-[var(--text-2)] border-[var(--border)] hover:border-[var(--text-3)]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid px-8 pb-8 gap-6" style={{ gridTemplateColumns: '1fr 300px' }}>
        {/* Lista de aulas */}
        <div className="flex flex-col gap-3">
          {items.map(cls => (
            <div key={cls.id} className="flex gap-3.5 items-start bg-white border border-[var(--border)] rounded-xl p-4 cursor-pointer hover:border-[#C0BFBA] hover:shadow-[var(--shadow-sm)] transition-all group">
              <div className="w-[100px] h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 relative overflow-hidden" style={{ background: cls.bg }}>
                {cls.emoji}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-semibold mb-1 leading-snug tracking-tight">{cls.title}</h4>
                <p className="text-[12px] text-[var(--text-3)] mb-2">{cls.course} · {cls.mod}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[11.5px] text-[var(--text-3)]">⏱ {cls.dur} min</span>
                  <span className="text-[11.5px] text-[var(--text-3)]">📅 {cls.date}</span>
                  <span className={`ml-auto text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${pill(cls.status)}`}>{pillLabel(cls.status)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Progresso + E-books */}
        <div>
          <div className="bg-white border border-[var(--border)] rounded-xl p-5 mb-4">
            <h4 className="text-[13px] font-semibold mb-1">Progresso do Módulo 4</h4>
            <p className="text-[12px] text-[var(--text-3)] mb-3">Gestão Estratégica — 3 de 5 aulas</p>
            <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--text)] rounded-full" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-3)] mt-1.5"><span>3 concluídas</span><span>60%</span></div>
          </div>
          <h3 className="text-[15px] font-bold tracking-tight mb-3">E-books do Módulo</h3>
          {[['📘','Fundamentos de Estratégia','142 págs · 8.4 MB'],['📗','Cases de Transformação','89 págs · 5.1 MB'],['📙','Guia de Análise SWOT','48 págs · 2.8 MB'],['📒','Canvas de Valor — Workbook','32 págs · 1.9 MB']].map(([icon, title, meta]) => (
            <div key={title} className="flex gap-3 items-center p-3 bg-white border border-[var(--border)] rounded-xl mb-2 cursor-pointer hover:border-[#C0BFBA] transition-colors">
              <div className="w-10 h-12 rounded bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
              <div className="flex-1 min-w-0"><h5 className="text-[12.5px] font-semibold leading-tight mb-0.5">{title}</h5><p className="text-[11px] text-[var(--text-3)]">PDF · {meta}</p></div>
              <span className="text-[var(--text-3)] text-sm">↓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
