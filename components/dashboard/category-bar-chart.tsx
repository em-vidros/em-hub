"use client";

import { memo, useMemo, useCallback } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CHART_COLORS,
  CHART_STROKE_WIDTH,
  ChartContainer,
  DefaultCartesianGrid,
} from "./chart-theme";

interface CategoryBarChartProps {
  data: { label: string; value: number; secondaryValue?: number }[];

  suffix?: string;
  yLabel?: string;
}

function CategoryBarChartComponent({
  data,
  suffix,
  yLabel,
}: CategoryBarChartProps) {
  const hasSecondaryValue = useMemo(
    () => data.some((d) => typeof d.secondaryValue === "number"),
    [data]
  );

  const tickFormatter = useCallback((v: number) => {
    if (suffix === "%") return `${v}`;
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
    return `${v}`;
  }, [suffix]);

  const tooltipFormatter = useCallback((value: number) => {
    return suffix ? `${value.toFixed(1)}${suffix}` : value.toLocaleString("pt-BR");
  }, [suffix]);

  const tooltipLabelFormatter = useCallback((label: string) => `${label}`, []);

  const legendFormatter = useCallback(() => (
    <span className="text-xs font-medium text-gray-500">Volume por categoria</span>
  ), []);
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%" minHeight={0}>
        <BarChart
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 32 }}
          barCategoryGap={24}
        >
          <DefaultCartesianGrid />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-xs font-medium text-gray-500"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={40}
            tickMargin={4}
            className="text-xs font-medium text-gray-500"
            tickFormatter={tickFormatter}
            name={yLabel}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted)/0.5)" }}
            contentStyle={{ color: "#000" }}
            formatter={tooltipFormatter}
            labelFormatter={tooltipLabelFormatter}
          />
          <Bar
            dataKey="value"
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
            isAnimationActive={false}
          />
          {hasSecondaryValue ? (
            <Bar
              dataKey="secondaryValue"
              fill={CHART_COLORS.secondary}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
              isAnimationActive={false}
            />
          ) : null}
          <Legend
            formatter={legendFormatter}
            wrapperStyle={{ bottom: 0 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export const CategoryBarChart = memo(CategoryBarChartComponent);


