import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-slate-600">Página não encontrada.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-white"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
