'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {

  const router = useRouter()

  useEffect(() => {

    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if(!data.user){
        router.push('/login')
      }
    }

    checkUser()

  }, [])

  return (
    <div style={{padding:40}}>
      <h1>Dashboard</h1>
      <p>Usuário logado</p>
    </div>
  )
}