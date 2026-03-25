import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/Sidebar'
import { Topbar } from '@/components/Topbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  // Busca perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name ?? user.email?.split('@')[0] ?? 'Usuário'
  const userEmail = user.email ?? ''

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg)]">
      <Topbar userName={userName} userEmail={userEmail} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          {children}
        </main>
      </div>
    </div>
  )
}
