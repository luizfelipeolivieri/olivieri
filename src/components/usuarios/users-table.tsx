import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

const users = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana@empresa.com",
    role: "Administrador",
    status: "ativo",
  },
  {
    id: "2",
    name: "Carlos Souza",
    email: "carlos@empresa.com",
    role: "Financeiro",
    status: "ativo",
  },
  {
    id: "3",
    name: "Marina Costa",
    email: "marina@empresa.com",
    role: "Operador",
    status: "inativo",
  },
];

export function UsersTable() {
  return (
    <SectionCard title="Usuários cadastrados">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="py-3 pr-4">Nome</th>
              <th className="py-3 pr-4">E-mail</th>
              <th className="py-3 pr-4">Cargo</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100">
                <td className="py-4 pr-4 font-medium text-slate-900">
                  {user.name}
                </td>
                <td className="py-4 pr-4 text-slate-600">{user.email}</td>
                <td className="py-4 pr-4 text-slate-600">{user.role}</td>
                <td className="py-4">
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
