import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Sistema Admin
            </p>
            <h1 className="mt-4 text-4xl font-bold">
              Acesse sua plataforma profissional
            </h1>
            <p className="mt-4 max-w-md text-slate-300">
              Gerencie produtos, usuários, relatórios financeiros e conteúdos
              em um único painel.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-300">
              Estrutura ideal para evolução com autenticação, permissões,
              Supabase e deploy no Vercel.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-slate-900">Login</h2>
            <p className="mt-2 text-sm text-slate-600">
              Entre com seu e-mail e senha para acessar o sistema.
            </p>

            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
