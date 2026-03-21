export type UserRole = "admin" | "financeiro" | "operador" | "aluno";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}
