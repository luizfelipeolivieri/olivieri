import { DashboardFinanceSummary } from "@/components/dashboard/dashboard-finance-summary";
import { DashboardRecentProducts } from "@/components/dashboard/dashboard-recent-products";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Resumo geral dos principais indicadores do sistema."
      />

      <DashboardStats />
      <DashboardFinanceSummary />
      <DashboardRecentProducts />
    </div>
  );
}
