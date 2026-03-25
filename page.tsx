'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { LoginModal } from '@/components/LoginModal'
import { MbxLogo } from '@/components/MbxLogo'
import Link from 'next/link'

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const searchParams = useSearchParams()

  // Abre modal automaticamente se redirecionado pelo middleware sem auth
  useEffect(() => {
    if (searchParams.get('login') === '1') setLoginOpen(true)
  }, [searchParams])

  return (
    <>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 h-[60px] flex items-center justify-between px-12 border-b border-[var(--border)]"
        style={{ background: 'rgba(245,244,241,0.92)', backdropFilter: 'blur(14px)' }}>
        <MbxLogo className="w-16 h-auto" />
        <ul className="hidden md:flex gap-8 list-none">
          {['Sobre', 'Serviços', 'Contato'].map(s => (
            <li key={s}>
              <a href={`#${s.toLowerCase()}`}
                className="text-[var(--text-2)] text-sm font-medium hover:text-[var(--text)] transition-colors">
                {s}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2.5">
          <button onClick={() => setLoginOpen(true)}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold border-[1.5px] border-[#D0CEC8] hover:border-[var(--text)] transition-colors bg-transparent text-[var(--text)]">
            Entrar
          </button>
          <button onClick={() => setLoginOpen(true)}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-[var(--text)] text-white hover:bg-[#333] transition-colors">
            Começar grátis
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center pt-[100px] pb-20 px-12 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#E5E3DD 1px, transparent 1px), linear-gradient(90deg, #E5E3DD 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 80%)',
          }} />

        <div className="relative z-10 max-w-[620px]">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[var(--text-2)] mb-6 px-3.5 py-1.5 bg-white border border-[var(--border)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Plataforma de Aprendizado
          </div>
          <h1 className="text-[clamp(44px,6vw,80px)] font-extrabold tracking-[-0.04em] leading-[1.04] mb-6 text-[var(--text)]">
            Aprenda.<br />Evolua.<br />Chegue lá.
          </h1>
          <p className="text-lg text-[var(--text-2)] mb-10 max-w-[460px] leading-[1.7]">
            Uma plataforma completa para sua jornada educacional — aulas, avaliações, TCC e muito mais em um só lugar.
          </p>
          <div className="flex gap-3.5 flex-wrap items-center">
            <button onClick={() => setLoginOpen(true)}
              className="px-7 py-3.5 bg-[var(--text)] text-white text-[14px] font-semibold rounded-lg hover:bg-[#333] transition-colors">
              Acessar plataforma
            </button>
            <a href="#servicos"
              className="px-5 py-3.5 text-[14px] font-semibold rounded-lg border-[1.5px] border-[#D0CEC8] text-[var(--text)] hover:border-[var(--text)] transition-colors">
              Ver serviços
            </a>
          </div>
          <div className="flex gap-12 mt-16 pt-10 border-t border-[var(--border)]">
            {[['12k+', 'Alunos ativos'], ['340+', 'Aulas gravadas'], ['98%', 'Satisfação']].map(([num, label]) => (
              <div key={label}>
                <div className="text-[30px] font-extrabold tracking-[-0.04em]">{num}</div>
                <div className="text-xs text-[var(--text-3)] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] max-w-[600px] hidden xl:block pr-12">
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] animate-[float_5s_ease-in-out_infinite]"
            style={{ animation: 'float 5s ease-in-out infinite' }}>
            <div className="h-10 bg-white border-b border-[var(--border)] flex items-center px-4 gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex">
              <div className="w-11 bg-white border-r border-[var(--border)] p-2 flex flex-col gap-1">
                {[true, false, false, false, false].map((active, i) => (
                  <div key={i} className={`w-7 h-7 rounded-md ${active ? 'bg-[var(--text)]' : 'bg-[var(--bg)]'}`} />
                ))}
              </div>
              <div className="flex-1 p-4 bg-[var(--bg)]">
                <div className="w-24 h-3.5 bg-[#D5D5D5] rounded mb-4" />
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[0,1,2].map(i => (
                    <div key={i} className="bg-white rounded-lg p-2.5 border border-[var(--border)]">
                      <div className="h-2 bg-[#E5E5E5] rounded mb-1.5 w-3/4" />
                      <div className="h-2 bg-[#E5E5E5] rounded mb-2 w-1/2" />
                      <div className="h-4 bg-[#D0D0D0] rounded w-3/5" />
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg p-3 border border-[var(--border)]">
                  <div className="h-2 bg-[#E5E5E5] rounded mb-3 w-20" />
                  <div className="flex items-end gap-1 h-10">
                    {[40,65,50,85,55,70,45].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-sm ${i === 3 ? 'bg-[var(--text)]' : 'bg-[#E5E5E5]'}`}
                        style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-24 px-12 bg-white border-t border-b border-[var(--border)]">
        <div className="max-w-[1120px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[.1em] uppercase text-[var(--text-3)] mb-3">Sobre a plataforma</p>
            <h2 className="text-[clamp(30px,4vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-4">
              Feita para quem<br />quer chegar longe
            </h2>
            <p className="text-base text-[var(--text-2)] leading-[1.75] mb-8">
              A MBX reúne tecnologia com metodologia pedagógica comprovada para criar uma experiência de aprendizado única e eficaz.
            </p>
            <div className="flex flex-col gap-3.5">
              {[
                'Aprendizado 100% online no seu ritmo',
                'Professores especialistas com experiência real',
                'Certificados reconhecidos pelo mercado',
                'Suporte dedicado e comunidade ativa',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-[var(--text-2)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--text)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '📱', title: 'Mobile First', desc: 'Acesse em qualquer dispositivo, a qualquer hora.' },
              { icon: '📊', title: 'Dashboard', desc: 'Acompanhe progresso com métricas em tempo real.', mt: true },
              { icon: '🎯', title: 'Avaliações', desc: 'Provas adaptativas ao seu nível de conhecimento.' },
              { icon: '🏆', title: 'Gamificação', desc: 'Conquistas e rankings para manter a motivação.', mt: true },
            ].map(c => (
              <div key={c.title}
                className={`bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 hover:bg-white hover:shadow-[var(--shadow)] transition-all ${c.mt ? 'mt-6' : ''}`}>
                <div className="text-2xl mb-2.5">{c.icon}</div>
                <h4 className="text-[14px] font-bold mb-1.5 tracking-tight">{c.title}</h4>
                <p className="text-[13px] text-[var(--text-3)] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="serviços" className="py-24 px-12 max-w-[1120px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[.1em] uppercase text-[var(--text-3)] mb-3">O que oferecemos</p>
            <h2 className="text-[clamp(30px,4vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.1]">Nossos serviços</h2>
          </div>
          <button onClick={() => setLoginOpen(true)}
            className="px-4 py-2.5 border-[1.5px] border-[#D0CEC8] rounded-lg text-[13px] font-semibold text-[var(--text)] hover:border-[var(--text)] transition-colors">
            Ver plataforma →
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { num: '01', title: 'Cursos Online', desc: 'Mais de 340 aulas gravadas com professores especialistas das maiores empresas do Brasil.', tag: 'Vídeo · Ebook' },
            { num: '02', title: 'Avaliações', desc: 'Sistema completo com questões objetivas, dissertativas e estudos de caso com feedback instantâneo.', tag: 'Adaptativo' },
            { num: '03', title: 'Meu TCC', desc: 'Plataforma dedicada para orientação, envio e acompanhamento do trabalho de conclusão de curso.', tag: 'Orientação' },
            { num: '04', title: 'Biblioteca Digital', desc: 'Acesso ilimitado a e-books, artigos científicos, cases e materiais complementares exclusivos.', tag: 'PDF · Artigos' },
          ].map(s => (
            <div key={s.num}
              className="bg-white border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[var(--shadow)] transition-all"
              style={{ '--tw-border-opacity': 1 } as React.CSSProperties}>
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--text)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="text-[13px] font-bold text-[var(--text-3)] tracking-widest mb-5">{s.num}</div>
              <h3 className="text-[18px] font-bold tracking-tight mb-2.5">{s.title}</h3>
              <p className="text-[13.5px] text-[var(--text-2)] leading-[1.7] mb-5">{s.desc}</p>
              <span className="inline-flex px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[11px] font-semibold text-[var(--text-2)]">
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section id="contato" className="py-24 px-12 bg-[var(--text)]">
        <div className="max-w-[1120px] mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <p className="text-[11px] font-bold tracking-[.1em] uppercase text-white/30 mb-3">Entre em contato</p>
            <h2 className="text-[clamp(30px,4vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mb-4">
              Fale com nossa equipe
            </h2>
            <p className="text-base text-white/50 leading-[1.75] mb-8">
              Tire dúvidas, conheça os planos ou solicite uma demonstração personalizada.
            </p>
            <div className="flex flex-col gap-5">
              {[['✉️', 'Email', 'contato@mbx.academy'], ['📞', 'Telefone', '(11) 4000-0000'], ['📍', 'Localização', 'São Paulo, SP — Brasil']].map(([icon, label, val]) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-base flex-shrink-0">{icon}</div>
                  <div>
                    <h5 className="text-[13px] font-semibold text-white">{label}</h5>
                    <p className="text-[12px] text-white/40">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={e => { e.preventDefault(); alert('Mensagem enviada!') }} className="flex flex-col gap-3.5">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-[12px] font-semibold text-white/50 block mb-1.5">Nome</label>
                <input type="text" placeholder="Seu nome" className="w-full bg-white/6 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/35 transition-colors" />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-white/50 block mb-1.5">Email</label>
                <input type="email" placeholder="seu@email.com" className="w-full bg-white/6 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/35 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-white/50 block mb-1.5">Assunto</label>
              <input type="text" placeholder="Sobre o que você quer falar?" className="w-full bg-white/6 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/35 transition-colors" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-white/50 block mb-1.5">Mensagem</label>
              <textarea placeholder="Como podemos ajudar?" rows={4} className="w-full bg-white/6 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-white/35 transition-colors resize-vertical" />
            </div>
            <button type="submit" className="bg-white text-[var(--text)] font-semibold text-sm py-3 rounded-lg hover:bg-[#F0F0F0] transition-colors">
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--text)] border-t border-white/7 px-12 py-7 flex items-center justify-between flex-wrap gap-4">
        <MbxLogo className="w-14 h-auto" white />
        <p className="text-[13px] text-white/30">© 2026 MBX Academy. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          {['Privacidade', 'Termos', 'Suporte'].map(l => (
            <a key={l} href="#" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50%) translateY(0); }
          50%       { transform: translateY(-50%) translateY(-12px); }
        }
      `}</style>
    </>
  )
}
