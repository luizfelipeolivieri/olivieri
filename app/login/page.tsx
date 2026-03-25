'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
    }else{
      router.push('/dashboard')
    }

  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      
      <div style={{width:350}}>
        <h1>MBX</h1>

        <input
          type="email"
          placeholder="E-mail"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Senha"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button onClick={handleLogin}>
          Iniciar sessão
        </button>

      </div>

    </div>
  )
}