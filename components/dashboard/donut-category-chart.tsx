"use client";

import { useMemo, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

import { CHART_COLORS, ChartContainer } from "./chart-theme";

interface DonutCategoryChartProps {
  data: { label: string; value: number }[];
}

const DONUT_COLORS = [
  "#6D28D9",
  "#0EA5E9",
  "#22C55E",
  "#F97316",
  "#EC4899",
  "#3B82F6",
  "#EAB308",
  "#14B8A6",
  "#F59E0B",
  "#8B5CF6",
];

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { label: string; percentage: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const { value, payload: item } = payload[0];

  return (
    <div className="rounded-xl border border-gray-200 bg-white/95 px-3 py-2 shadow-sm">
      <p className="text-[11px] font-medium text-gray-900">{item.label}</p>
      <p className="mt-0.5 text-[11px] tabular-nums text-gray-600">
        {value.toLocaleString("pt-BR")}{" "}
        <span className="ml-1 text-[11px] text-emerald-600">
          {item.percentage.toFixed(0)}%
        </span>
      </p>
    </div>
  );
}

export function DonutCategoryChart({ data }: DonutCategoryChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const total = useMemo(
    () => data.reduce((acc, item) => acc + (item.value ?? 0), 0),
    [data],
  );

  const enriched = useMemo(
    () =>
      data.map((item, index) => {
        const percentage = total > 0 ? (item.value / total) * 100 : 0;
        return {
          ...item,
          percentage,
          color: DONUT_COLORS[index % DONUT_COLORS.length],
        };
      }),
    [data, total],
  );

  const currentIndex =
    activeIndex ?? selectedIndex ?? (enriched.length ? 0 : null);

  return (
    <ChartContainer className="h-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="hidden min-w-[180px] flex-1 space-y-2 text-xs text-muted-foreground sm:block">
          {enriched.map((item, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  setSelectedIndex((prev) => (prev === index ? null : index))
                }
                className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-900"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-[11px] font-medium">
                    {item.label}
                  </span>
                </div>
                <span className="text-[11px] tabular-nums">
                  {item.percentage.toFixed(0)}%
                </span>
              </button>
            );
          })}
          {!enriched.length ? (
            <p className="text-[11px] text-gray-400">
              Sem dados suficientes para exibir a distribuição.
            </p>
          ) : null}
        </div>

        {/* Donut */}
        <div className="flex flex-1 items-center justify-center">
          <ResponsiveContainer width="100%" height={220} minHeight={160}>
            <PieChart>
              <Tooltip
                content={<DonutTooltip />}
                cursor={false}
              />
              <Pie
                data={enriched}
                dataKey="value"
                nameKey="label"
                innerRadius={52}
                outerRadius={88}
                paddingAngle={0.2}
                cornerRadius={8}
                strokeWidth={4}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={(_, index) =>
                  setSelectedIndex((prev) => (prev === index ? null : index))
                }
              >
                {enriched.map((entry, index) => {
                  const isActive = currentIndex === index;
                  return (
                    <Cell
                      // eslint-disable-next-line react/no-array-index-key
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#FFFFFF"
                      fillOpacity={isActive ? 0.95 : 0.7}
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartContainer>
  );
}


