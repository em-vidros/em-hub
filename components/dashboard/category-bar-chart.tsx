"use client";

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
}

export function CategoryBarChart({ data, suffix }: CategoryBarChartProps) {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
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
            tickFormatter={(v) =>
              suffix === "%"
                ? `${v}`
                : v >= 1_000_000
                  ? `${(v / 1_000_000).toFixed(1)}M`
                  : v >= 1_000
                    ? `${(v / 1_000).toFixed(0)}k`
                    : `${v}`
            }
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted)/0.5)" }}
            contentStyle={{ color: "#000" }}
            formatter={(value: number) =>
              suffix ? `${value.toFixed(1)}${suffix}` : value.toLocaleString("pt-BR")
            }
            labelFormatter={(label) => `${label}`}
          />
          <Bar
            dataKey="value"
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
            isAnimationActive
          />
          {data.some((d) => typeof d.secondaryValue === "number") ? (
            <Bar
              dataKey="secondaryValue"
              fill={CHART_COLORS.secondary}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
              isAnimationActive
            />
          ) : null}
          <Legend
            formatter={() => <span className="text-xs font-medium text-gray-500">Volume por categoria</span>}
            wrapperStyle={{ bottom: 0 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}


