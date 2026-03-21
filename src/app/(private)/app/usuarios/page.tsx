import { PageHeader } from "@/components/layout/page-header";
import { UsersTable } from "@/components/usuarios/users-table";

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuários"
        description="Gerencie usuários, cargos, permissões e status."
      />

      <UsersTable />
    </div>
  );
}
