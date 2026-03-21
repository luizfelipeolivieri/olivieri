import { ProductTable } from "@/components/data/product-table";
import { PageHeader } from "@/components/layout/page-header";

export default function DataPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data"
        description="Gerencie produtos, preços, promoções e status."
      />

      <ProductTable />
    </div>
  );
}
