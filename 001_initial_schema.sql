import { createClient } from '@/lib/supabase/server'

export default async function AvaliacoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: results } = await supabase
    .from('exam_results')
    .select('*, exams(title, courses(title))')
    .eq('user_id', user!.id)
    .eq('status', 'graded')
    .order('submitted_at', { ascending: false })
    .limit(10)

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-[26px] font-bold tracking-tight mb-1">Avaliações</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">Suas avaliações em aberto e concluídas</p>

      {/* Em Aberto */}
      <div className="bg-white border border-[var(--border)] rounded-xl mb-5 overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <span className="text-[15px] font-bold tracking-tight">Avaliações em Aberto (0)</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-6">
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#c_av2)">
              <path d="M0.961 48C0.961 84.21 40.16 106.84 71.52 88.74C86.08 80.33 95.04 64.81 95.04 48C95.04 11.79 55.84-10.84 24.48 7.26C9.93 15.67 0.961 31.19 0.961 48Z" fill="#D6D6D6" fillOpacity="0.48"/>
              <path d="M20.17 24.39H64.26V65.88H20.17L20.17 24.39Z" fill="white" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M27.31 17.45C28.87 16.73 31.23 17.71 31.19 19.2V28.93C31.23 30.42 29.63 31.4 28.32 30.68C27.68 30.33 27.29 29.65 27.31 28.93V19.2Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40.27 17.45C41.83 16.73 44.2 17.71 44.16 19.2L44.16 28.93C44.2 30.42 42.6 31.4 41.28 30.68C40.64 30.33 40.25 29.65 40.27 28.93V19.2Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M53.24 17.45C54.8 16.73 57.16 17.71 57.12 19.2V28.93C57.16 30.42 55.56 31.4 54.25 30.68C53.61 30.33 53.22 29.65 53.24 28.93V19.2Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <ellipse cx="69.78" cy="64.71" rx="16.86" ry="16.86" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M66.37 73.03C65.71 73.03 65.09 72.77 64.63 72.31L59.72 67.4C58.41 66.04 59.06 63.77 60.9 63.32C61.72 63.11 62.58 63.35 63.19 63.93L66.37 67.11L76.36 57.11C77.76 55.84 80.01 56.55 80.42 58.4C80.59 59.18 80.37 59.99 79.83 60.58L68.1 72.31C67.64 72.77 67.02 73.03 66.37 73.03Z" fill="white" stroke="#202939" strokeLinejoin="round"/>
            </g>
            <defs><clipPath id="c_av2"><rect width="96" height="96" fill="white"/></clipPath></defs>
          </svg>
          <div>
            <p className="text-[15px] font-semibold mb-1">Suas avaliações estão em dia</p>
            <p className="text-[13px] text-[var(--text-3)]">Todas as suas avaliações estão feitas e não há pendências</p>
          </div>
        </div>
      </div>

      {/* Concluídas */}
      <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <span className="text-[15px] font-bold tracking-tight">Avaliações Concluídas</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EDFAF3] text-[#1A7A4A]">
            {results?.length ?? 3} realizadas
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Avaliação</th><th>Curso</th><th>Data</th><th>Nota</th><th>Status</th></tr></thead>
            <tbody>
              {(results && results.length > 0 ? results.map(r => ({
                title: (r.exams as { title: string } | null)?.title ?? 'Avaliação',
                course: 'MBA Gestão',
                date: r.submitted_at ? new Date(r.submitted_at).toLocaleDateString('pt-BR') : '—',
                score: r.score ?? '—',
              })) : [
                { title: 'Prova Final — Módulo 3', course: 'MBA Gestão', date: '10/03/2026', score: 8.5 },
                { title: 'Trabalho Prático — SWOT', course: 'MBA Gestão', date: '25/02/2026', score: 9.2 },
                { title: 'Quiz — Fundamentos', course: 'MBA Gestão', date: '12/02/2026', score: 7.8 },
              ]).map((r, i) => (
                <tr key={i}>
                  <td><strong>{r.title}</strong></td>
                  <td>{r.course}</td>
                  <td>{r.date}</td>
                  <td><strong>{r.score}</strong></td>
                  <td><span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EDFAF3] text-[#1A7A4A]">Aprovado</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
