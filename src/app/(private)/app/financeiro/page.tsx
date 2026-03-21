import { FinanceSummaryCards } from "@/components/financeiro/finance-summary-cards";
import { PageHeader } from "@/components/layout/page-header";

export default function FinanceiroPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Financeiro"
        description="Acompanhe entradas, saídas, saldo e performance por segmento."
      />

      <FinanceSummaryCards />
    </div>
  );
}
