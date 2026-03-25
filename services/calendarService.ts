import { supabase } from "./supabaseClient";

export async function getEvents(userId: string) {
  const { data, error } = await supabase
    .from("calendario")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function createEvent(event: any) {
  const { error } = await supabase
    .from("calendario")
    .insert([event]);

  if (error) throw error;
}
