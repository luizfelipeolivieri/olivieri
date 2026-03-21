import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

const recentProducts = [
  {
    name: "Produto A",
    category: "Curso",
    price: "R$ 99,90",
    status: "ativo",
  },
  {
    name: "Produto B",
    category: "Mentoria",
    price: "R$ 199,90",
    status: "rascunho",
  },
  {
    name: "Produto C",
    category: "E-book",
    price: "R$ 49,90",
    status: "ativo",
  },
];

export function DashboardRecentProducts() {
  return (
    <SectionCard title="Produtos recentes">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="py-3 pr-4">Produto</th>
              <th className="py-3 pr-4">Categoria</th>
              <th className="py-3 pr-4">Preço</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentProducts.map((product) => (
              <tr key={product.name} className="border-b border-slate-100">
                <td className="py-4 pr-4 font-medium text-slate-900">
                  {product.name}
                </td>
                <td className="py-4 pr-4 text-slate-600">{product.category}</td>
                <td className="py-4 pr-4 text-slate-600">{product.price}</td>
                <td className="py-4">
                  <StatusBadge status={product.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
