"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Cell,
} from "recharts";

import {
  CHART_COLORS,
  ChartContainer,
} from "./chart-theme";

interface JointPoint {
  x: number;
  y: number;
  label?: string;
}

interface JointDistributionChartProps {
  points: JointPoint[];
  xLabel: string;
  yLabel: string;
}

/**
 * Joint distribution simples (scatter) inspirado no sns.jointplot,
 * usado para relacionar duas métricas contínuas (ex.: faturamento × margem).
 */
export function JointDistributionChart({
  points,
  xLabel,
  yLabel,
}: JointDistributionChartProps) {
  if (!points.length) return null;

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 16, bottom: 24, left: 32 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" opacity={0.9} />
          <XAxis
            type="number"
            dataKey="x"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(v) =>
              v >= 1_000_000
                ? `${(v / 1_000_000).toFixed(1)}M`
                : v >= 1_000
                  ? `${(v / 1_000).toFixed(0)}k`
                  : `${v}`
            }
            name={xLabel}
          />
          <YAxis
            type="number"
            dataKey="y"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(v) => `${v.toFixed(1)}%`}
            name={yLabel}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ color: "#000" }}
            formatter={(value: number, key: string) =>
              key === "x"
                ? value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 0,
                  })
                : `${(value as number).toFixed(1)}%`
            }
            labelFormatter={(_, payload) =>
              payload && payload[0]?.payload?.label
                ? String(payload[0].payload.label)
                : ""
            }
          />
          <Scatter data={points}>
            {points.map((p, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell
                key={idx}
                fill={CHART_COLORS.secondary}
                fillOpacity={0.9}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}


