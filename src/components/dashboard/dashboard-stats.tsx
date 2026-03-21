import { StatCard } from "@/components/ui/stat-card";

const stats = [
  { title: "Produtos cadastrados", value: "128" },
  { title: "Usuários ativos", value: "24" },
  { title: "Aulas publicadas", value: "16" },
  { title: "Receita mensal", value: "R$ 45.300" },
];

export function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard key={item.title} title={item.title} value={item.value} />
      ))}
    </section>
  );
}
