"use client";

import { usePermissions } from "@/hooks/usePermissions";

export default function PermissionGuard({ page, children }: any) {
  const { canAccess } = usePermissions();

  if (!canAccess(page)) {
    return <div className="p-6">Acesso negado</div>;
  }

  return children;
}
