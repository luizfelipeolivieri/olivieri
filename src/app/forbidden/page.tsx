import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Acesso negado</h1>
      <p className="mt-4 max-w-md text-slate-600">
        Você não possui permissão para acessar esta página.
      </p>
      <Link
        href="/app/dashboard"
        className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-white"
      >
        Ir para o dashboard
      </Link>
    </main>
  );
}
