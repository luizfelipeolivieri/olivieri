import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single()

  const firstName = profile?.full_name?.split(' ')[0]
    ?? user?.email?.split('@')[0]
    ?? 'Aluno'

  // Data de hoje em pt-BR
  const hoje = new Date()
  const dataFormatada = hoje.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'short',
  })
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1).replace('.', '')

  return (
    <div className="grid h-full animate-fade-in" style={{ gridTemplateColumns: '1fr 280px', minHeight: '100%' }}>

      {/* ── COLUNA ESQUERDA ── */}
      <div className="flex flex-col gap-5 p-8 overflow-y-auto">

        {/* Saudação */}
        <h1 className="text-[26px] font-bold tracking-[-0.03em] leading-tight">
          Olá, {firstName}.{' '}
          <span className="font-normal text-[var(--text-2)]">É bom te ver!</span>
        </h1>

        {/* ── SUAS AULAS ── */}
        <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
          {/* Header do card */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <span className="text-[15px] font-bold tracking-tight">Suas Aulas</span>
            <div className="flex items-center gap-2.5">
              {/* Dropdown filtro */}
              <button className="flex items-center gap-1.5 border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--text)] hover:bg-[var(--bg)] transition-colors">
                Não visualizadas
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[var(--text-3)]">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                </svg>
              </button>
              {/* Setas de navegação */}
              <div className="flex gap-1">
                {[
                  'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18',
                  'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
                ].map((d, i) => (
                  <button key={i} disabled
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-3)] opacity-30 cursor-not-allowed transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d={d}/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Empty state — aulas em dia */}
          <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
            <svg width="96" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.50977 50.6966C1.50977 84.8321 38.4626 106.167 68.0248 89.0991C81.7446 81.1779 90.1965 66.5389 90.1965 50.6966C90.1965 16.5611 53.2437-4.7736 23.6814 12.2941C9.96151 20.2153 1.50977 34.8542 1.50977 50.6966Z" fill="#D6D6D6" fillOpacity="0.48"/>
              <path opacity="0.15" d="M9.31152 77.5188C9.31152 79.223 38.8276 80.2882 62.4404 79.4361C73.3992 79.0406 80.15 78.3098 80.15 77.5188C80.15 75.8146 50.634 74.7494 27.0211 75.6015C16.0624 75.9971 9.31152 76.7279 9.31152 77.5188Z" fill="#26272B"/>
              <path d="M72.3989 28.8431H14.1107C12.8862 28.8431 11.8936 29.8357 11.8936 31.0603V68.6634H74.6161V31.0603C74.6161 29.8357 73.6235 28.8431 72.3989 28.8431Z" fill="white" stroke="#26272B" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M70.1885 33.2719H16.3823L16.3213 68.6646H70.1885V33.2719Z" fill="#F5F5F5" stroke="#26272B" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M80.1496 73.0923H6.3623V69.7732C6.3623 69.1609 6.85862 68.6645 7.47091 68.6646H79.0411C79.6534 68.6645 80.1496 69.1609 80.1496 69.7732V73.0923ZM80.1496 73.0923C73.2971 75.0497 66.2022 76.0429 59.0755 76.0433H27.4332C20.3067 76.0429 13.2147 75.0497 6.3623 73.0923H80.1496Z" fill="white" stroke="#26272B" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="68.625" cy="23.297" r="21.639" fill="white" stroke="#26272B" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M68.6255 34.6476C67.787 34.6488 66.9826 34.3157 66.3906 33.722L60.0716 27.403C58.3508 25.6826 59.1376 22.7445 61.488 22.1144C62.5788 21.8219 63.7428 22.1336 64.5415 22.9321L68.6287 27.0195L81.5005 14.1488C83.221 12.4283 86.1587 13.2155 86.7884 15.5657C87.0806 16.6564 86.7688 17.8202 85.9704 18.6186L70.8604 33.7208C70.2685 34.315 69.4641 34.6486 68.6255 34.6476Z" fill="#F5F5F5" stroke="#26272B" strokeMiterlimit="10"/>
            </svg>
            <div>
              <p className="text-[15px] font-semibold mb-1">Suas aulas estão em dia</p>
              <p className="text-[13px] text-[var(--text-3)]">Todas as aulas estão feitas e não há pendencias</p>
            </div>
          </div>
        </div>

        {/* ── AVALIAÇÕES EM ABERTO ── */}
        <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <span className="text-[15px] font-bold tracking-tight">Avaliações em Aberto (0)</span>
          </div>

          {/* Empty state — avaliações em dia */}
          <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip_aval)">
                <path d="M0.960938 48C0.960938 84.2114 40.1609 106.844 71.5209 88.7378C86.0752 80.3349 95.0409 64.8058 95.0409 48C95.0409 11.7886 55.841-10.8436 24.4809 7.26222C9.92667 15.6651 0.960938 31.1942 0.960938 48Z" fill="#D6D6D6" fillOpacity="0.48"/>
                <path d="M20.1738 24.3882H64.2563V65.8775H20.1739L20.1738 24.3882Z" fill="white" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31.1943 28.9253C31.2312 30.4222 29.6338 31.3977 28.3191 30.6811C27.6787 30.3322 27.2873 29.6543 27.3053 28.9253V19.2021C27.2685 17.7052 28.866 16.7299 30.1807 17.4466C30.8209 17.7955 31.2122 18.4732 31.1943 19.2021V28.9253Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M44.1591 28.9253C44.1961 30.4222 42.5986 31.3977 41.2839 30.6811C40.6435 30.3322 40.2522 29.6543 40.2702 28.9253V19.2021C40.2334 17.7052 41.8308 16.7299 43.1455 17.4466C43.7858 17.7955 44.1771 18.4732 44.1592 19.2021L44.1591 28.9253Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M57.1241 28.9253C57.1609 30.4222 55.5636 31.3977 54.2488 30.6811C53.6084 30.3322 53.217 29.6543 53.235 28.9253V19.2021C53.1982 17.7052 54.7958 16.7299 56.1105 17.4466C56.7506 17.7955 57.1419 18.4732 57.1241 19.2021V28.9253Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.0547 76.2957C21.0437 78.2919 38.8639 79.5409 53.1312 78.544C59.7615 78.0807 63.8451 77.2233 63.8399 76.2957C63.8509 74.2996 46.0306 73.0505 31.7634 74.0475C25.1331 74.5107 21.0495 75.368 21.0547 76.2957Z" fill="#D6D6D6"/>
                <circle cx="69.7756" cy="64.711" r="16.856" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M66.3663 73.0289C65.715 73.0294 65.0903 72.7704 64.6306 72.3091L59.7231 67.404C58.4111 66.0445 59.063 63.7746 60.8964 63.3182C61.717 63.1139 62.5849 63.3465 63.1935 63.9336L66.3687 67.1088L76.3647 57.1128C77.7602 55.8393 80.0111 56.5541 80.4163 58.3995C80.5875 59.1796 80.3685 59.9942 79.8292 60.5832L68.1009 72.3103C67.6415 72.7714 67.0172 73.03 66.3663 73.0289Z" fill="white" stroke="#202939" strokeLinejoin="round"/>
              </g>
              <defs><clipPath id="clip_aval"><rect width="96" height="96" fill="white"/></clipPath></defs>
            </svg>
            <div>
              <p className="text-[15px] font-semibold mb-1">Suas avaliações estão em dia</p>
              <p className="text-[13px] text-[var(--text-3)]">Todas as suas avaliações estão feitas e não há pendências</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── COLUNA DIREITA: Agenda ── */}
      <div className="border-l border-[var(--border)] bg-white p-6 flex flex-col overflow-y-auto">
        {/* Header da agenda */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <span className="text-[15px] font-bold tracking-tight">{dataCapitalizada}</span>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-3)] hover:bg-[var(--bg)] transition-colors"
            title="Ver todos os compromissos"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
            </svg>
          </button>
        </div>

        {/* Empty agenda */}
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <svg width="80" height="80" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip_ag)">
              <path d="M0.960938 48C0.960938 84.2114 40.1609 106.844 71.5209 88.7378C86.0752 80.3349 95.0409 64.8058 95.0409 48C95.0409 11.7886 55.841-10.8436 24.4809 7.26222C9.92667 15.6651 0.960938 31.1942 0.960938 48Z" fill="#D6D6D6" fillOpacity="0.48"/>
              <path d="M20.1738 24.3882H64.2563V65.8775H20.1739L20.1738 24.3882Z" fill="white" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M31.1943 19.2021V28.9253C31.2312 30.4222 29.6338 31.3977 28.3191 30.6811C27.6787 30.3322 27.2873 29.6543 27.3053 28.9253V19.2021C27.2685 17.7052 28.866 16.7299 30.1807 17.4466C30.8209 17.7955 31.2122 18.4732 31.1943 19.2021Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M44.1591 19.2021L44.1592 28.9253C44.1961 30.4222 42.5986 31.3977 41.2839 30.6811C40.6435 30.3322 40.2522 29.6543 40.2702 28.9253V19.2021C40.2334 17.7052 41.8308 16.7299 43.1455 17.4466C43.7858 17.7955 44.1771 18.4732 44.1591 19.2021Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M57.1241 19.2021V28.9253C57.1609 30.4222 55.5636 31.3977 54.2488 30.6811C53.6084 30.3322 53.217 29.6543 53.235 28.9253V19.2021C53.1982 17.7052 54.7958 16.7299 56.1105 17.4466C56.7506 17.7955 57.1419 18.4732 57.1241 19.2021Z" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path opacity="0.3" d="M21.0547 76.2957C21.0437 78.2919 38.8639 79.5409 53.1312 78.544C59.7615 78.0807 63.8451 77.2233 63.8399 76.2957C63.8509 74.2996 46.0306 73.0505 31.7634 74.0475C25.1331 74.5107 21.0495 75.368 21.0547 76.2957Z" fill="#D6D6D6"/>
              <circle cx="69.7756" cy="64.711" r="16.856" fill="#D6D6D6" stroke="#202939" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M66.3663 73.0289C65.715 73.0294 65.0903 72.7704 64.6306 72.3091L59.7231 67.404C58.4111 66.0445 59.063 63.7746 60.8964 63.3182C61.717 63.1139 62.5849 63.3465 63.1935 63.9336L66.3687 67.1088L76.3647 57.1128C77.7602 55.8393 80.0111 56.5541 80.4163 58.3995C80.5875 59.1796 80.3685 59.9942 79.8292 60.5832L68.1009 72.3103C67.6415 72.7714 67.0172 73.03 66.3663 73.0289Z" fill="white" stroke="#202939" strokeLinejoin="round"/>
            </g>
            <defs><clipPath id="clip_ag"><rect width="96" height="96" fill="white"/></clipPath></defs>
          </svg>
          <div>
            <p className="text-[14px] font-semibold mb-1">Nada planejado para o dia</p>
            <p className="text-[12.5px] text-[var(--text-3)] leading-relaxed">Aproveite ou organize seu próximo passo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
