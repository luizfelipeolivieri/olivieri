import { StatCard } from "@/components/ui/stat-card";

const financeStats = [
  { title: "Entradas", value: "R$ 78.000" },
  { title: "Saídas", value: "R$ 32.700" },
  { title: "Saldo", value: "R$ 45.300" },
  { title: "Margem", value: "58%" },
];

export function FinanceSummaryCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {financeStats.map((item) => (
        <StatCard key={item.title} title={item.title} value={item.value} />
      ))}
    </section>
  );
}
