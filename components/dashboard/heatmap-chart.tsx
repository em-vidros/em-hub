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

interface HeatmapPoint {
  x: string;
  y: string;
  value: number;
}

interface HeatmapChartProps {
  data: HeatmapPoint[];
  xLabel: string;
  yLabel: string;
}

function getColor(value: number, min: number, max: number) {
  const ratio = (value - min) / (max - min || 1);
  // Interpolação simples entre azul claro e azul escuro
  const light = 230;
  const dark = 30;
  const channel = Math.round(light + (dark - light) * ratio);
  return `rgb(${channel}, ${channel + 20}, 255)`;
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
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 16, right: 16, bottom: 40, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
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
            formatter={(value: number, _name, payload) => {
              const cell = payload?.payload as HeatmapPoint | undefined;
              const deviation = cell?.deviation ?? 0;
              const desvioText =
                Math.abs(deviation) >= 1
                  ? ` (${deviation > 0 ? "+" : ""}${deviation.toFixed(1)}%)`
                  : "";
              return `${value.toLocaleString("pt-BR")} m²${desvioText}`;
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
    </div>
  );
}


