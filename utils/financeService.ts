import { supabase } from "./supabaseClient";

export async function getFinanceData(userId: string) {
  const { data, error } = await supabase
    .from("financeiro")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data;
}
