'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MbxLogo } from './MbxLogo'

interface TopbarProps {
  userName?: string | null
  userEmail?: string | null
}

export function Topbar({ userName, userEmail }: TopbarProps) {
  const router = useRouter()
  const supabase = createClient()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <header
      className="flex items-center gap-3 bg-white border-b border-[var(--border)] flex-shrink-0 px-4 z-40"
      style={{ height: 'var(--topbar-h)' }}
    >
      {/* Hamburger */}
      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-2)] hover:bg-[var(--bg)] transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" className="w-5 h-5">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>
      </button>

      {/* Logo */}
      <Link href="/dashboard" className="flex items-center">
        <MbxLogo className="w-14 h-auto" />
      </Link>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1">

        {/* Inbox */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-2)] hover:bg-[var(--bg)] transition-colors" title="Caixa de Entrada">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <path d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"/>
          </svg>
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setProfileOpen(false) }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-2)] hover:bg-[var(--bg)] transition-colors relative"
            title="Notificações"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
            </svg>
            <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-red-500 border-[1.5px] border-white" />
          </button>

          {notifOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-80 bg-white rounded-2xl border border-[var(--border)] animate-fade-down z-50 overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
                <strong className="text-[13.5px]">Notificações</strong>
                <button className="text-[11px] text-[var(--text-3)] hover:text-[var(--text)] transition-colors">Marcar lidas</button>
              </div>
              {[
                { title: 'Nova aula disponível', body: 'Módulo 5 — Gestão Avançada foi liberado', time: 'há 2h', unread: true },
                { title: 'Avaliação em 3 dias', body: 'Prova Final de Estratégia Empresarial', time: 'há 1 dia', unread: true },
                { title: 'Pagamento confirmado', body: 'Mensalidade de Março processada', time: 'há 3 dias', unread: false },
              ].map((n, i) => (
                <div key={i} className="flex gap-3 px-5 py-3.5 border-b border-[var(--border-light)] last:border-b-0 hover:bg-[var(--bg)] transition-colors cursor-pointer">
                  <div className={`w-2 h-2 rounded-full mt-[5px] flex-shrink-0 ${n.unread ? 'bg-red-500' : 'bg-[var(--border)]'}`} />
                  <div>
                    <p className="text-[13px] font-semibold mb-0.5">{n.title}</p>
                    <p className="text-[12px] text-[var(--text-3)]">{n.body}</p>
                    <time className="text-[11px] text-[var(--text-3)] mt-1 block">{n.time}</time>
                  </div>
                </div>
              ))}
              <div className="py-3 text-center border-t border-[var(--border-light)]">
                <span className="text-[12px] text-[var(--text-3)] cursor-pointer hover:text-[var(--text)] transition-colors">Ver todas</span>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-2)] hover:bg-[var(--bg)] transition-colors" title="Apoio e Dicas">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
          </svg>
        </button>

        {/* Avatar / Profile */}
        <div ref={profileRef} className="relative ml-1">
          <button
            onClick={() => { setProfileOpen(v => !v); setNotifOpen(false) }}
            className="w-[34px] h-[34px] rounded-full bg-[#D0D0D0] flex items-center justify-center text-[12px] font-bold text-[#555] border-2 border-[var(--border)] hover:border-[var(--text-3)] transition-colors"
            title="Perfil"
          >
            {initials}
          </button>

          {profileOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-56 bg-white rounded-2xl border border-[var(--border)] animate-fade-down z-50 overflow-hidden" style={{ boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-[#D0D0D0] flex items-center justify-center text-[12px] font-bold text-[#555] flex-shrink-0">{initials}</div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-tight truncate">{userName || 'Usuário'}</p>
                  <p className="text-[11px] text-[var(--text-3)] leading-tight truncate">{userEmail}</p>
                </div>
              </div>
              <div className="p-1.5">
                {[
                  ['👤', 'Meu Perfil', '#'],
                  ['⚙️', 'Configurações', '#'],
                  ['🎓', 'Meus Cursos', '/dashboard/cursos'],
                ].map(([icon, label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
                  >
                    <span>{icon}</span>{label}
                  </Link>
                ))}
                <div className="h-px bg-[var(--border-light)] my-1" />
                <button
                  onClick={logout}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-red-500 hover:bg-red-50 transition-colors w-full"
                >
                  ← Sair da conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
