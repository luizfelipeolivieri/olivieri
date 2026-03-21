import { cn } from "@/lib/utils/cn";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize",
        normalized === "ativo" && "bg-emerald-100 text-emerald-700",
        normalized === "inativo" && "bg-slate-200 text-slate-700",
        normalized === "rascunho" && "bg-amber-100 text-amber-700"
      )}
    >
      {status}
    </span>
  );
}
