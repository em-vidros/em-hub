"use client";

import { memo } from "react";
import { LayoutDashboard, BarChart3, PieChart } from "lucide-react";

type MobileNavItemKey = "operacional" | "insights" | "analises";

interface MobileBottomNavProps {
  activeSection?: MobileNavItemKey;
  onSectionSelect?: (section: MobileNavItemKey) => void;
}

const LABELS: Record<Exclude<MobileNavItemKey, "ai">, string> = {
  operacional: "Operacional",
  insights: "Insights",
  analises: "Análises",
};

function MobileBottomNavComponent({
  activeSection = "operacional",
  onSectionSelect,
}: MobileBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/80 bg-white/90 backdrop-blur-md shadow-[0_-6px_20px_rgba(15,23,42,0.04)] lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 pb-[env(safe-area-inset-bottom)] pt-2">
        <button
          type="button"
          onClick={() => onSectionSelect?.("operacional")}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            activeSection === "operacional"
              ? "text-gray-900"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <LayoutDashboard
            className={`h-5 w-5 ${
              activeSection === "operacional" ? "" : "opacity-80"
            }`}
          />
          <span>Operacional</span>
        </button>

        <button
          type="button"
          onClick={() => onSectionSelect?.("insights")}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            activeSection === "insights"
              ? "text-gray-900"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <BarChart3
            className={`h-5 w-5 ${
              activeSection === "insights" ? "" : "opacity-80"
            }`}
          />
          <span>Insights</span>
        </button>

        <button
          type="button"
          onClick={() => onSectionSelect?.("analises")}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            activeSection === "analises"
              ? "text-gray-900"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <PieChart
            className={`h-5 w-5 ${
              activeSection === "analises" ? "" : "opacity-80"
            }`}
          />
          <span>Análises</span>
        </button>

      </div>
    </nav>
  );
}

export const MobileBottomNav = memo(MobileBottomNavComponent);


