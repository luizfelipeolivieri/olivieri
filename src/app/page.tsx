import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
        <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
          Next.js + Supabase + Dashboard Admin
        </span>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Estrutura profissional pronta para iniciar seu projeto
        </h1>

        <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
          Base com dashboard, área de data, financeiro, usuários, aulas,
          autenticação preparada e layout administrativo moderno.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/login"
            className="rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:opacity-90"
          >
            Entrar no sistema
          </Link>

          <Link
            href="/app/dashboard"
            className="rounded-2xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Ver painel
          </Link>
        </div>
      </section>
    </main>
  );
}
