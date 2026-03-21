export interface FinanceRecord {
  id: string;
  title: string;
  type: "entrada" | "saida";
  amount: number;
  category: string;
  created_at: string;
}
