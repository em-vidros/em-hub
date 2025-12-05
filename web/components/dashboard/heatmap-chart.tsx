"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Cell,
} from "recharts";

import { ChartContainer, DefaultCartesianGrid, CHART_COLORS } from "./chart-theme";

interface HeatmapPoint {
  x: string;
  y: string;
  value: number;
  deviation?: number;
  is_outlier?: boolean;
}

interface HeatmapChartProps {
  data: HeatmapPoint[];
  xLabel: string;
  yLabel: string;
}

function getColor(value: number, min: number, max: number) {
  const ratio = (value - min) / (max - min || 1);
  // Interpolação simples entre as duas cores padrão
  const start = CHART_COLORS.primary;
  const end = CHART_COLORS.secondary;

  const hexToRgb = (hex: string) => {
    const cleaned = hex.replace("#", "");
    const bigint = parseInt(cleaned, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const s = hexToRgb(start);
  const e = hexToRgb(end);

  const r = Math.round(s.r + (e.r - s.r) * ratio);
  const g = Math.round(s.g + (e.g - s.g) * ratio);
  const b = Math.round(s.b + (e.b - s.b) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
}

export function HeatmapChart({ data, xLabel, yLabel }: HeatmapChartProps) {
  if (!data.length) return null;

  const uniqueX = Array.from(new Set(data.map((d) => d.x)));
  const uniqueY = Array.from(new Set(data.map((d) => d.y)));

  const indexedData = data.map((d) => ({
    ...d,
    xi: uniqueX.indexOf(d.x),
    yi: uniqueY.indexOf(d.y),
  }));

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <ChartContainer className="h-64">
      <ResponsiveContainer width="100%" height="100%" minHeight={0}>
        <ScatterChart margin={{ top: 16, right: 16, bottom: 40, left: 40 }}>
          <DefaultCartesianGrid />
          <XAxis
            type="number"
            dataKey="xi"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            ticks={uniqueX.map((_, index) => index)}
            tickFormatter={(value) => uniqueX[value] ?? ""}
            name={xLabel}
          />
          <YAxis
            type="number"
            dataKey="yi"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            ticks={uniqueY.map((_, index) => index)}
            tickFormatter={(value) => uniqueY[value] ?? ""}
            name={yLabel}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{ color: "#000" }}
            formatter={(value: number, _name, payload) => {
              const cell = payload?.payload as HeatmapPoint | undefined;
              const deviation = cell?.deviation ?? 0;
              const desvioText =
                Math.abs(deviation) >= 1
                  ? ` (${deviation > 0 ? "+" : ""}${deviation.toFixed(1)}%)`
                  : "";
              return [`${value.toLocaleString("pt-BR")} m²${desvioText}`, "Volume produzido"];
            }}
            labelFormatter={(_, payload) =>
              payload && payload[0]?.payload
                ? `${payload[0].payload.x} · ${payload[0].payload.y}`
                : ""
            }
          />
          <Scatter data={indexedData}>
            {indexedData.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell
                key={index}
                fill={getColor(entry.value, min, max)}
                radius={16}
                stroke={entry.is_outlier ? "hsl(var(--destructive))" : "none"}
                strokeWidth={entry.is_outlier ? 1.5 : 0}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-1 text-xs text-gray-500">
        Intensidade de cor indica maior ou menor volume produzido por turno e
        dia da semana. Células contornadas em vermelho estão pelo menos 15%{" "}
        acima ou abaixo da média global.
      </p>
    </ChartContainer>
  );
}


