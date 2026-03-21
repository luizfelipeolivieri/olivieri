import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/ui/section-card";

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfil"
        description="Visualize e gerencie as informações do usuário logado."
      />

      <SectionCard title="Informações do perfil">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Nome</p>
            <p className="font-medium text-slate-900">Usuário Exemplo</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">E-mail</p>
            <p className="font-medium text-slate-900">usuario@email.com</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Cargo</p>
            <p className="font-medium text-slate-900">Administrador</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium text-slate-900">Ativo</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
