export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  promotional_price?: number | null;
  status: "ativo" | "inativo" | "rascunho";
  created_at?: string;
  updated_at?: string;
}
