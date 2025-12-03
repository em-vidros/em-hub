"use client";

import { memo } from "react";
import { LayoutDashboard, BarChart3, PieChart, Sparkles } from "lucide-react";

type SectionKey = "operacional" | "insights" | "analises";

interface DashboardDockNavProps {
  activeSection: SectionKey;
  onSectionSelect?: (section: SectionKey) => void;
  onOpenAI?: () => void;
}

const LABELS: Record<SectionKey, string> = {
  operacional: "Operacional",
  insights: "Insights",
  analises: "Análises",
};

const ICONS: Record<SectionKey, React.ComponentType<{ className?: string }>> = {
  operacional: LayoutDashboard,
  insights: BarChart3,
  analises: PieChart,
};

function DashboardDockNavComponent({
  activeSection,
  onSectionSelect,
  onOpenAI,
}: DashboardDockNavProps) {
  const items: SectionKey[] = ["operacional", "insights", "analises"];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex items-end justify-center lg:hidden">
      <div className="pointer-events-auto flex items-center gap-3 px-4 w-full max-w-md">
        {/* Dock principal */}
        <nav className="flex flex-1 items-center justify-between gap-1 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.15)] backdrop-blur-xl">
          {items.map((key) => {
            const Icon = ICONS[key];
            const isActive = activeSection === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSectionSelect?.(key)}
                className={`group flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span
                  className={`flex items-center justify-center rounded-full transition-transform duration-200 ${
                    isActive
                      ? "scale-110 translate-y-[-1px]"
                      : "group-hover:scale-105 group-hover:translate-y-[-0.5px] scale-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-80"
                    }`}
                  />
                </span>
                <span
                  className={`transition-colors ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {LABELS[key]}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Botão de IA lateral */}
        <button
          type="button"
          onClick={onOpenAI}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/90 text-teal-600 shadow-[0_10px_30px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-transform duration-200 hover:scale-105 active:scale-95"
          aria-label="Abrir assistente de IA"
        >
          <Sparkles className="h-5 w-5" strokeWidth={1.7} />
        </button>
      </div>
    </div>
  );
}

export const DashboardDockNav = memo(DashboardDockNavComponent);


