"use client";

import { memo, useMemo, useCallback } from "react";
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

function TimeSeriesChartComponent({
  data,
  yLabel,
  suffix,
}: TimeSeriesChartProps) {
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
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%" minHeight={0}>
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
            tickFormatter={tickFormatter}
          />
          <Tooltip
            contentStyle={{ color: "#000" }}
            formatter={tooltipFormatter}
            labelFormatter={tooltipLabelFormatter}
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

export const TimeSeriesChart = memo(TimeSeriesChartComponent);


