"use client";

import {
  Area,
  AreaChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  CHART_COLORS,
  CHART_STROKE_WIDTH,
  ChartContainer,
  DefaultCartesianGrid,
} from "./chart-theme";

interface DensityChartProps {
  samples: number[];
  secondarySamples?: number[];
  xLabel?: string;
}

/**
 * Gráfico de densidade simples inspirado no seaborn,
 * aproximado a partir de um histograma normalizado.
 */
export function DensityChart({
  samples,
  secondarySamples,
  xLabel,
}: DensityChartProps) {
  if (!samples.length) return null;

  const allSamples = secondarySamples?.length
    ? [...samples, ...secondarySamples]
    : samples;

  const min = Math.min(...allSamples);
  const max = Math.max(...allSamples);
  const binCount = 24;
  const step = (max - min) / binCount || 1;

  const bins = Array.from({ length: binCount }, (_, i) => {
    const start = min + i * step;
    const end = start + step;
    const countA = samples.filter(
      (v) => v >= start && (i === binCount - 1 ? v <= end : v < end),
    ).length;
    const density = countA / (samples.length * step);

    let densityPrev: number | undefined;
    if (secondarySamples?.length) {
      const countB = secondarySamples.filter(
        (v) => v >= start && (i === binCount - 1 ? v <= end : v < end),
      ).length;
      densityPrev = countB / (secondarySamples.length * step);
    }

    return {
      x: (start + end) / 2,
      density,
      densityPrev,
    };
  });

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={bins} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <DefaultCartesianGrid />
          <XAxis
            dataKey="x"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <Tooltip
            contentStyle={{ color: "#000" }}
            formatter={(value: number, name: string) =>
              [
                `${(value as number).toFixed(2)}`,
                name === "density" ? "Atual" : "Anterior",
              ]
            }
            labelFormatter={(label) => `${label.toFixed(1)}`}
          />
          <Area
            type="monotone"
            dataKey="density"
            stroke={CHART_COLORS.secondary}
            strokeWidth={CHART_STROKE_WIDTH}
            fill={CHART_COLORS.secondary}
            fillOpacity={0.25}
            isAnimationActive
          />
          {secondarySamples?.length ? (
            <Area
              type="monotone"
              dataKey="densityPrev"
              stroke={CHART_COLORS.primary}
              strokeWidth={CHART_STROKE_WIDTH}
              fill={CHART_COLORS.primary}
              fillOpacity={0.18}
              isAnimationActive
            />
          ) : null}
          {secondarySamples?.length ? (
            <Legend verticalAlign="top" height={24} />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
      {xLabel ? (
        <p className="mt-2 text-xs text-gray-500 text-center">{xLabel}</p>
      ) : null}
    </ChartContainer>
  );
}


