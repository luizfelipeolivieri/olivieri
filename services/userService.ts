import { supabase } from "./supabaseClient";

export async function getUserRole(userId: string) {
  const { data } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return data?.role || "viewer";
}

export async function getPermissions(role: string) {
  const { data } = await supabase
    .from("permissions")
    .select("*")
    .eq("role", role);

  return data;
}

export async function updateUserRole(userId: string, role: string) {
  await supabase
    .from("user_roles")
    .upsert({ user_id: userId, role });
}
