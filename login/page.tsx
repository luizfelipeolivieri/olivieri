'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (!error) router.push('/dashboard')
    else alert(error.message)
  }

  return (
    <div>
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setSenha(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}