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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setError('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Preencha email e senha.'); return }
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Email ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-[400px] rounded-[18px] bg-white p-11 animate-slide-in"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-3)] hover:bg-[var(--bg)] transition-colors text-sm"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Logo */}
        <MbxLogo className="w-16 h-auto mb-2" />
        <p className="text-[var(--text-2)] text-sm mb-7">Entre na sua conta para continuar</p>

        {/* Demo hint */}
        <div className="bg-[#F5FFF8] border border-[#C3EFD3] rounded-lg p-3 text-xs text-[#1A6A35] mb-6 leading-relaxed">
          <strong>Demo:</strong> Crie uma conta em{' '}
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
            supabase.com
          </a>{' '}
          ou cadastre-se abaixo.
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[var(--text-2)]">Email</label>
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border-[1.5px] border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text)] bg-[var(--bg)] outline-none transition-colors focus:border-[var(--text)] focus:bg-white"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[var(--text-2)]">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border-[1.5px] border-[var(--border)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text)] bg-[var(--bg)] outline-none transition-colors focus:border-[var(--text)] focus:bg-white"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full bg-[var(--text)] text-white rounded-lg py-3 text-sm font-semibold transition-colors hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar na plataforma'}
          </button>
        </form>

        <p className="text-center text-xs text-[var(--text-3)] mt-4">
          <button className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
            Esqueceu a senha?
          </button>
          {' · '}
          <button className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
            Criar conta
          </button>
        </p>
      </div>
    </div>
  )
}
