import { supabase } from "./supabaseClient";

export async function getMarketData(userId: string) {
  const { data, error } = await supabase
    .from("mercado")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function upsertMarket(item: any) {
  const { error } = await supabase
    .from("mercado")
    .upsert(item);

  if (error) throw error;
}
