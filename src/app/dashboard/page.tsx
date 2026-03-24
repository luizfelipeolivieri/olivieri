'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {

  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {

  if (typeof window === 'undefined') return

  async function checkUser() {

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push('/login')
      return
    }

    setUserEmail(data.user.email ?? null)
    setLoading(false)
  }

  checkUser()

}, [router])

  async function handleLogout() {

    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Carregando...
      </main>
    )
  }

  return (
    <main style={{
      padding: '40px',
      fontFamily: 'Inter, sans-serif'
    }}>

      <h1>Dashboard</h1>

      <p style={{ marginTop: '10px' }}>
        Usuário logado: <b>{userEmail}</b>
      </p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          background: '#d33',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>

    </main>
  )
}
