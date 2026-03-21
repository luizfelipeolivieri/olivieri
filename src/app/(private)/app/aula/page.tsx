import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/ui/section-card";

const lessons = [
  {
    title: "Introdução à Plataforma",
    description: "Visão geral do sistema, menus e fluxo principal.",
    type: "Vídeo",
  },
  {
    title: "Cadastro de Produtos",
    description: "Como inserir produtos, preços e promoções.",
    type: "E-book",
  },
  {
    title: "Gestão de Usuários",
    description: "Permissões, cargos e acesso por perfil.",
    type: "Vídeo",
  },
];

export default function AulaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Aula"
        description="Área de aulas, vídeos, materiais e trilhas de aprendizado."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <SectionCard key={lesson.title} title={lesson.title}>
            <p className="text-sm text-slate-600">{lesson.description}</p>
            <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {lesson.type}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
