import { cn } from "@/lib/utils";

type StatusVariant = "ok" | "alerta" | "critico";

interface StatusPillProps {
  status: StatusVariant;
  children?: React.ReactNode;
}

const LABELS: Record<StatusVariant, string> = {
  ok: "Saudável",
  alerta: "Atenção",
  critico: "Crítico",
};

export function StatusPill({ status, children }: StatusPillProps) {
  const label = children ?? LABELS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-transparent",
        status === "ok" &&
          "bg-[#10B981]/10 text-[#10B981]",
        status === "alerta" &&
          "bg-[#F59E0B]/10 text-[#F59E0B]",
        status === "critico" &&
          "bg-[#EF4444]/10 text-[#EF4444]"
      )}
    >
      {label}
    </span>
  );
}


