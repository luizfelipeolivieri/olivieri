'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { LoginModal } from '@/components/LoginModal'
import { MbxLogo } from '@/components/MbxLogo'
import Link from 'next/link'

function HomeContent() {
  const [loginOpen, setLoginOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('login') === '1') setLoginOpen(true)
  }, [searchParams])

  return (
    <>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 h-[60px] flex items-center justify-between px-12 border-b border-[var(--border)]"
        style={{ background: 'rgba(242,242,242,0.92)', backdropFilter: 'blur(14px)' }}
      >
        <MbxLogo className="w-16 h-auto" />
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {[['Sobre','#sobre'],['Serviços','#servicos'],['Contato','#contato']].map(([label, href]) => (
            <li key={label}>
              <a href={href} className="text-[var(--text-2)] text-sm font-medium hover:text-[var(--text)] transition-colors no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <button
            onClick={() => setLoginOpen(true)}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold border-[1.5px] border-[#D0D0D0] bg-transparent text-[var(--text)] hover:border-[var(--text)] transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={() => setLoginOpen(true)}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-[var(--text)] text-white hover:bg-[#333] transition-colors"
          >
            Começar grátis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-[100px] pb-20 px-12 relative overflow-hidden bg-[var(--bg)]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: .5,
            maskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, black 40%, transparent 80%)',
          }}
        />
        <div className="relative z-10 max-w-[600px]">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.08em] uppercase text-[var(--text-2)] mb-6 px-3.5 py-1.5 bg-white border border-[var(--border)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ animation: 'pulse 2s infinite' }} />
            Plataforma de Aprendizado
          </div>
          <h1 className="text-[clamp(44px,6vw,76px)] font-extrabold tracking-[-0.04em] leading-[1.04] mb-6 text-[var(--text)]">
            Aprenda.<br />Evolua.<br />Chegue lá.
          </h1>
          <p className="text-lg text-[var(--text-2)] mb-10 max-w-[440px] leading-[1.7]">
            Cursos, avaliações, TCC e biblioteca digital em um só lugar.
          </p>
          <div className="flex gap-3 flex-wrap items-center">
            <button
              onClick={() => setLoginOpen(true)}
              className="px-7 py-3.5 bg-[var(--text)] text-white text-[14px] font-semibold rounded-lg hover:bg-[#333] transition-colors"
            >
              Acessar plataforma
            </button>
            <a href="#servicos" className="px-5 py-3.5 text-[14px] font-semibold rounded-lg border-[1.5px] border-[#D0D0D0] text-[var(--text)] hover:border-[var(--text)] transition-colors">
              Ver serviços
            </a>
          </div>
          <div className="flex gap-12 mt-16 pt-10 border-t border-[var(--border)]">
            {[['12k+','Alunos ativos'],['340+','Aulas gravadas'],['98%','Satisfação']].map(([num, label]) => (
              <div key={label}>
                <div className="text-[28px] font-extrabold tracking-[-0.04em]">{num}</div>
                <div className="text-[12px] text-[var(--text-3)] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup flutuante */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[44%] max-w-[580px] hidden xl:block pr-12">
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden animate-float" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="h-9 bg-white border-b border-[var(--border)] flex items-center px-4 gap-2">
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
            </div>
            <div className="flex">
              <div className="w-10 bg-white border-r border-[var(--border)] p-2 flex flex-col gap-1">
                {[true,false,false,false,false].map((a,i) => (
                  <div key={i} className="w-6 h-6 rounded-md" style={{ background: a ? '#1A1A1A' : '#F2F2F2' }} />
                ))}
              </div>
              <div className="flex-1 p-4 bg-[var(--bg)]">
                <div className="w-24 h-3 bg-[#D0D0D0] rounded mb-4" />
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
                  <div className="flex items-end gap-1 h-9">
                    {[40,65,50,85,55,70,45].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 3 ? '#1A1A1A' : '#E5E5E5' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 px-12 bg-white border-t border-b border-[var(--border)]">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[.1em] uppercase text-[var(--text-3)] mb-3">Sobre a plataforma</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.1] mb-4">
              Feita para quem quer chegar longe
            </h2>
            <p className="text-[15px] text-[var(--text-2)] leading-[1.75] mb-8">
              A MBX reúne tecnologia com metodologia pedagógica comprovada para criar uma experiência de aprendizado única.
            </p>
            <div className="flex flex-col gap-3">
              {['Aprendizado 100% online no seu ritmo','Professores especialistas com experiência real','Certificados reconhecidos pelo mercado','Suporte dedicado e comunidade ativa'].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm text-[var(--text-2)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--text)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon:'📱', title:'Mobile First',       desc:'Acesse em qualquer dispositivo, a qualquer hora.', mt:false },
              { icon:'📊', title:'Dashboard',          desc:'Acompanhe progresso com métricas em tempo real.',  mt:true  },
              { icon:'🎯', title:'Avaliações',         desc:'Provas adaptativas ao seu nível de conhecimento.', mt:false },
              { icon:'🏆', title:'Gamificação',        desc:'Conquistas e rankings para manter a motivação.',   mt:true  },
            ].map(c => (
              <div key={c.title} className={`bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 hover:bg-white hover:shadow-[var(--shadow)] transition-all ${c.mt ? 'mt-6' : ''}`}>
                <div className="text-2xl mb-2.5">{c.icon}</div>
                <h4 className="text-[14px] font-bold mb-1.5 tracking-tight">{c.title}</h4>
                <p className="text-[13px] text-[var(--text-3)] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 px-12 bg-[var(--bg)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-[.1em] uppercase text-[var(--text-3)] mb-3">O que oferecemos</p>
              <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.1]">Nossos serviços</h2>
            </div>
            <button onClick={() => setLoginOpen(true)} className="px-4 py-2.5 border-[1.5px] border-[#D0D0D0] rounded-lg text-[13px] font-semibold text-[var(--text)] hover:border-[var(--text)] transition-colors">
              Ver plataforma →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n:'01', title:'Cursos Online',     desc:'Mais de 340 aulas gravadas com professores especialistas.',                      tag:'Vídeo · Ebook'   },
              { n:'02', title:'Avaliações',        desc:'Sistema completo com questões objetivas e estudos de caso práticos.',             tag:'Adaptativo'      },
              { n:'03', title:'Meu TCC',           desc:'Plataforma dedicada para orientação e acompanhamento do seu TCC.',               tag:'Orientação'      },
              { n:'04', title:'Biblioteca Digital',desc:'Acesso ilimitado a e-books, artigos científicos e materiais exclusivos.',        tag:'PDF · Artigos'   },
            ].map(s => (
              <div key={s.n} className="bg-white border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[var(--shadow)] transition-all">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--text)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="text-[12px] font-bold text-[var(--text-3)] tracking-widest mb-5">{s.n}</div>
                <h3 className="text-[17px] font-bold tracking-tight mb-2.5">{s.title}</h3>
                <p className="text-[13px] text-[var(--text-2)] leading-[1.7] mb-5">{s.desc}</p>
                <span className="inline-flex px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[11px] font-semibold text-[var(--text-2)]">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24 px-12 bg-[var(--text)]">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <p className="text-[11px] font-bold tracking-[.1em] uppercase text-white/30 mb-3">Entre em contato</p>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mb-4">
              Fale com nossa equipe
            </h2>
            <p className="text-[15px] text-white/50 leading-[1.75] mb-8">
              Tire dúvidas, conheça os planos ou solicite uma demonstração.
            </p>
            <div className="flex flex-col gap-5">
              {[['✉️','Email','contato@mbx.academy'],['📞','Telefone','(11) 4000-0000'],['📍','Localização','São Paulo, SP']].map(([icon, label, val]) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{background:'rgba(255,255,255,0.1)'}}>{icon}</div>
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
              {[['text','Nome','Seu nome'],['email','Email','seu@email.com']].map(([type, label, placeholder]) => (
                <div key={label}>
                  <label className="text-[12px] font-semibold text-white/50 block mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder} style={{background:'rgba(255,255,255,0.06)',border:'1.5px solid rgba(255,255,255,0.12)'}} className="w-full rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-[12px] font-semibold text-white/50 block mb-1.5">Assunto</label>
              <input type="text" placeholder="Sobre o que você quer falar?" style={{background:'rgba(255,255,255,0.06)',border:'1.5px solid rgba(255,255,255,0.12)'}} className="w-full rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-white/50 block mb-1.5">Mensagem</label>
              <textarea placeholder="Como podemos ajudar?" rows={4} style={{background:'rgba(255,255,255,0.06)',border:'1.5px solid rgba(255,255,255,0.12)'}} className="w-full rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors resize-y" />
            </div>
            <button type="submit" className="bg-white text-[var(--text)] font-semibold text-sm py-3 rounded-lg hover:bg-[#F0F0F0] transition-colors">
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--text)] px-12 py-6 flex items-center justify-between flex-wrap gap-4" style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
        <MbxLogo className="w-12 h-auto" white />
        <p className="text-[13px] text-white/30">© 2026 MBX Academy. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          {['Privacidade','Termos','Suporte'].map(l => (
            <a key={l} href="#" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .animate-float { animation: floatCard 5s ease-in-out infinite; }
      `}</style>
    </>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)]" />}>
      <HomeContent />
    </Suspense>
  )
}
