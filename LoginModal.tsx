'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MbxLogo } from './MbxLogo'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter()
  const supabase = createClient()
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setError(''); setSuccess('')
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open, tab])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Preencha email e senha.'); return }
    setLoading(true); setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError('Email ou senha incorretos.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) { setError('Preencha todos os campos.'); return }
    if (password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return }
    setLoading(true); setError('')
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }
    setSuccess('Conta criada! Verifique seu email para confirmar.')
    setLoading(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-[400px] rounded-[18px] bg-white p-10 animate-slide-in"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs hover:bg-[var(--bg)] transition-colors text-[var(--text-3)]"
        >✕</button>

        <MbxLogo className="w-14 h-auto mb-3" />

        {/* Tabs */}
        <div className="flex gap-0 mb-6 border border-[var(--border)] rounded-xl p-1">
          {(['login', 'signup'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setSuccess('') }}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
                tab === t ? 'bg-[var(--text)] text-white' : 'text-[var(--text-3)] hover:text-[var(--text)]'
              }`}
            >
              {t === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>

        {success ? (
          <div className="bg-[#F0FFF6] border border-[#BBF0D4] rounded-xl p-4 text-sm text-[#1A6A35] text-center">
            {success}
          </div>
        ) : (
          <form onSubmit={tab === 'login' ? handleLogin : handleSignup} className="flex flex-col gap-3">
            {tab === 'signup' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-2)]">Nome completo</label>
                <input
                  ref={tab === 'signup' ? inputRef : undefined}
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full border-[1.5px] border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm bg-[var(--bg)] outline-none focus:border-[var(--text)] focus:bg-white transition-colors"
                />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-2)]">Email</label>
              <input
                ref={tab === 'login' ? inputRef : undefined}
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com" autoComplete="email"
                className="w-full border-[1.5px] border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm bg-[var(--bg)] outline-none focus:border-[var(--text)] focus:bg-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--text-2)]">Senha</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                className="w-full border-[1.5px] border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm bg-[var(--bg)] outline-none focus:border-[var(--text)] focus:bg-white transition-colors"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}
            <button
              type="submit" disabled={loading}
              className="mt-1 w-full bg-[var(--text)] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (tab === 'login' ? 'Entrando...' : 'Criando conta...') : (tab === 'login' ? 'Entrar na plataforma' : 'Criar conta')}
            </button>
          </form>
        )}

        {tab === 'login' && !success && (
          <p className="text-center text-xs text-[var(--text-3)] mt-4">
            <button className="hover:text-[var(--text)] transition-colors">Esqueceu a senha?</button>
          </p>
        )}
      </div>
    </div>
  )
}
