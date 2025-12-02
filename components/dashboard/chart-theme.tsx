"use client";

import { ReactNode } from "react";
import { CartesianGrid } from "recharts";

export const CHART_COLORS = {
  primary: "#e8ddc9",
  secondary: "#badacd",
} as const;

export const CHART_STROKE_WIDTH = 2;

// Fundo neutro branco, permitindo que a grid cinza fique mais visível
export const CHART_BACKGROUND = "#FFFFFF";

interface ChartContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper padrão para gráficos Recharts:
 * - Fundo lilás quase branco
 * - Grid branca
 * - Padding e raio de borda consistentes
 */
export function ChartContainer({ children, className }: ChartContainerProps) {
  return (
    <div
      className={`w-full rounded-2xl border border-gray-100 p-4 ${
        className ?? "h-56"
      }`}
      style={{
        background: CHART_BACKGROUND,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Grid padrão usada em todos os gráficos.
 * Deve ser adicionada dentro do componente do Recharts.
 */
export function DefaultCartesianGrid() {
  return (
    <CartesianGrid
      strokeDasharray="3 3"
      vertical={false}
      stroke="#D4D4D8" // cinza claro, semelhante ao exemplo do Recharts
      opacity={0.9}
    />
  );
}


