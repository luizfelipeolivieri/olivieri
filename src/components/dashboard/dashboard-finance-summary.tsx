import { SectionCard } from "@/components/ui/section-card";

export function DashboardFinanceSummary() {
  return (
    <SectionCard title="Resumo financeiro">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Entradas</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">R$ 78.000</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Saídas</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">R$ 32.700</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Saldo</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">R$ 45.300</p>
        </div>
      </div>
    </SectionCard>
  );
}
