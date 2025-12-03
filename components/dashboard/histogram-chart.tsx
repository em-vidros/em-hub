"use client";

import {
  Bar,
  BarChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  DensityPoint,
  HistogramBin,
  HistogramStats,
} from "@/lib/analytics-client";

import {
  CHART_COLORS,
  CHART_STROKE_WIDTH,
  ChartContainer,
  DefaultCartesianGrid,
} from "./chart-theme";

interface HistogramChartProps {
  values?: number[];
  bins?: HistogramBin[];
  density?: DensityPoint[];
  stats?: HistogramStats;
  binCount?: number;
  unit?: string;
}

export function HistogramChart({
  values = [],
  bins,
  density,
  stats,
  binCount = 8,
  unit,
}: HistogramChartProps) {
  if (!values.length && !bins?.length) return null;

  const computedBuckets = (() => {
    if (bins && bins.length) {
      return bins.map((b) => ({
        label: `${Math.round(b.start / 1000)}k - ${Math.round(b.end / 1000)}k`,
        value: b.count,
      }));
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const step = (max - min) / binCount || 1;

    return Array.from({ length: binCount }, (_, index) => {
      const start = min + index * step;
      const end = start + step;
      const count = values.filter(
        (v) => v >= start && (index === binCount - 1 ? v <= end : v < end),
      ).length;

      return {
        label: `${Math.round(start / 1000)}k - ${Math.round(end / 1000)}k`,
        value: count,
      };
    });
  })();

  const mean = stats?.mean;
  const median = stats?.median;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%" minHeight={0}>
        <BarChart
          data={computedBuckets}
          margin={{ left: 8, right: 8, top: 8, bottom: 40 }}
        >
          <DefaultCartesianGrid />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            angle={-30}
            textAnchor="end"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            tickMargin={4}
          />
          <Tooltip
            contentStyle={{ color: "#000" }}
            formatter={(value: number) => `${value} pedidos`}
            labelFormatter={(label) => `${label} ${unit ?? ""}`}
          />
          <Bar
            dataKey="value"
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
          />
          {density && density.length ? (
            <Line
              type="monotone"
              data={density}
              dataKey="y"
              xAxisId={0}
              yAxisId={0}
              dot={false}
              stroke={CHART_COLORS.secondary}
              strokeWidth={CHART_STROKE_WIDTH}
            />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-1 text-xs text-gray-500">
        Distribuição de pedidos por faixa de valor.
        {typeof median === "number" ? (
          <>
            {" "}
            Mediana em torno de{" "}
            <span className="font-medium">
              {median.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </span>
            .
          </>
        ) : null}
      </p>
    </ChartContainer>
  );
}


