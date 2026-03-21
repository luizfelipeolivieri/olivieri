import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

const products = [
  {
    id: "1",
    name: "Curso Front-end Pro",
    category: "Curso",
    price: "R$ 297,00",
    promotionalPrice: "R$ 197,00",
    status: "ativo",
  },
  {
    id: "2",
    name: "Guia de UX UI",
    category: "E-book",
    price: "R$ 67,00",
    promotionalPrice: "R$ 47,00",
    status: "ativo",
  },
  {
    id: "3",
    name: "Mentoria Premium",
    category: "Mentoria",
    price: "R$ 999,00",
    promotionalPrice: "-",
    status: "rascunho",
  },
];

export function ProductTable() {
  return (
    <SectionCard title="Produtos cadastrados">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="py-3 pr-4">Produto</th>
              <th className="py-3 pr-4">Categoria</th>
              <th className="py-3 pr-4">Preço</th>
              <th className="py-3 pr-4">Promocional</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-100">
                <td className="py-4 pr-4 font-medium text-slate-900">
                  {product.name}
                </td>
                <td className="py-4 pr-4 text-slate-600">{product.category}</td>
                <td className="py-4 pr-4 text-slate-600">{product.price}</td>
                <td className="py-4 pr-4 text-slate-600">
                  {product.promotionalPrice}
                </td>
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
