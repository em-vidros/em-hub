"use client";

import {
  Line,
  LineChart,
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

interface SeriesPoint {
  label: string;
  value: number;
}

interface SmallSeries {
  name: string;
  points: SeriesPoint[];
}

interface SmallMultipleTimeSeriesProps {
  series: SmallSeries[];
}

/**
 * Small multiple time series – vários pequenos line charts,
 * um por canal/segmento, seguindo o estilo do exemplo de
 * \"Small multiple time series\" do Recharts.
 */
export function SmallMultipleTimeSeries({
  series,
}: SmallMultipleTimeSeriesProps) {
  if (!series.length) return null;

  return (
    <div className="space-y-3">
      {series.map((s, idx) => (
        <ChartContainer key={s.name} className="h-28">
          <div className="mb-1 text-xs font-medium text-gray-600 truncate">
            {s.name}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={s.points} margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
              <DefaultCartesianGrid />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={2}
                tick={{ fontSize: 10 }}
                tickFormatter={(v) =>
                  v >= 1_000 ? `${(v / 1_000).toFixed(0)}k` : `${v}`
                }
              />
              <Tooltip
                contentStyle={{ color: "#000" }}
                formatter={(value: number) => value.toLocaleString("pt-BR")}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={idx % 2 === 0 ? CHART_COLORS.secondary : CHART_COLORS.primary}
                strokeWidth={CHART_STROKE_WIDTH}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      ))}
    </div>
  );
}


