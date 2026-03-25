import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { getUserRole, getPermissions } from "@/services/userService";

export function usePermissions() {
  const [permissions, setPermissions] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const role = await getUserRole(userData.user.id);
      const perms = await getPermissions(role);

      setPermissions(perms);
    }

    load();
  }, []);

  function canAccess(page: string) {
    return permissions.find(p => p.page === page)?.can_view;
  }

  function canEdit(page: string) {
    return permissions.find(p => p.page === page)?.can_edit;
  }

  return { canAccess, canEdit };
}
