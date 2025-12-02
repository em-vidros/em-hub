"use client";

import {
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
} from "recharts";

import {
  CHART_COLORS,
  CHART_STROKE_WIDTH,
  ChartContainer,
  DefaultCartesianGrid,
} from "./chart-theme";

interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
  label?: string;
  category?: string;
}

interface RegressionPoint {
  x: number;
  y: number;
}

interface ScatterChartProps {
  data: ScatterPoint[];
  regression?: RegressionPoint[];
  correlation?: number;
  total_ok?: number;
  total_alerta?: number;
  total_critico?: number;
  xLabel: string;
  yLabel: string;
}

const STATUS_COLOR: Record<string, string> = {
  ok: CHART_COLORS.secondary,
  alerta: CHART_COLORS.primary,
  critico: "#F97373",
};

export function AdvancedScatterChart({
  data,
  regression,
  correlation,
  total_ok,
  total_alerta,
  total_critico,
  xLabel,
  yLabel,
}: ScatterChartProps) {
  return (
    <ChartContainer className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 16, bottom: 24, left: 16 }}>
          <DefaultCartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            unit="%"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            unit="%"
            tickLine={false}
            axisLine={false}
          />
          <ZAxis type="number" dataKey="z" range={[80, 160]} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: number, key: string) => {
              if (key === "x" || key === "y") {
                return `${value.toFixed(1)}%`;
              }
              if (key === "z") {
                return `${value.toFixed(1)} h`;
              }
              return value;
            }}
            labelFormatter={(_, payload) =>
              payload && payload[0]?.payload?.label
                ? String(payload[0].payload.label)
                : ""
            }
          />
          {regression && regression.length ? (
            <Line
              type="monotone"
              data={regression}
              dataKey="y"
              xAxisId={0}
              yAxisId={0}
              dot={false}
              stroke={CHART_COLORS.secondary}
              strokeWidth={CHART_STROKE_WIDTH}
            />
          ) : null}
          <Scatter data={data}>
            {data.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell
                key={index}
                fill={
                  entry.category && STATUS_COLOR[entry.category]
                    ? STATUS_COLOR[entry.category]
                    : CHART_COLORS.primary
                }
              />
            ))}
          </Scatter>
          <Legend
            verticalAlign="top"
            height={24}
            formatter={() => "Linhas de produção"}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-1 text-xs text-gray-500">
        Cada bolha representa uma linha, tamanho proporcional ao tempo médio de
        parada.{" "}
        {typeof correlation === "number" && !Number.isNaN(correlation) ? (
          <>
            Correlação OEE×retrabalho:{" "}
            <span className="font-medium">
              {correlation >= 0 ? "+" : ""}
              {correlation.toFixed(2)}
            </span>
            .
          </>
        ) : null}{" "}
        {typeof total_ok === "number" ||
        typeof total_alerta === "number" ||
        typeof total_critico === "number" ? (
          <>
            {" "}
            Linhas em cada zona — saudável: {total_ok ?? 0}, atenção:{" "}
            {total_alerta ?? 0}, crítico: {total_critico ?? 0}.
          </>
        ) : null}
      </p>
    </ChartContainer>
  );
}


