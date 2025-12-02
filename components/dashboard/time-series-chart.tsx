"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  CHART_COLORS,
  CHART_STROKE_WIDTH,
  ChartContainer,
  DefaultCartesianGrid,
} from "./chart-theme";

interface TimeSeriesChartProps {
  data: { label: string; value: number }[];
  yLabel?: string;
  suffix?: string;
}

export function TimeSeriesChart({
  data,
  yLabel,
  suffix,
}: TimeSeriesChartProps) {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <DefaultCartesianGrid />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
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
            contentStyle={{ color: "#000" }}
            formatter={(value: number) =>
              suffix ? `${value.toFixed(1)}${suffix}` : value.toLocaleString("pt-BR")
            }
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.secondary}
            strokeWidth={CHART_STROKE_WIDTH}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
      {yLabel ? (
        <p className="mt-1 text-xs text-gray-500 font-medium">{yLabel}</p>
      ) : null}
    </ChartContainer>
  );
}


