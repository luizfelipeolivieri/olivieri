import { supabase } from "./supabaseClient";

export async function getFinanceData(userId: string) {
  const { data, error } = await supabase
    .from("financeiro")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data;
}

export async function upsertFinance(item: any) {
  const { error } = await supabase
    .from("financeiro")
    .upsert(item, { onConflict: "id" });

  if (error) throw error;
}
