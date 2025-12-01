"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
        >
          <defs>
            <linearGradient id="timeseriesLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
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
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              backgroundColor: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number) =>
              suffix ? `${value.toFixed(1)}${suffix}` : value.toLocaleString("pt-BR")
            }
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#timeseriesLine)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "hsl(var(--chart-1))", strokeWidth: 0 }}
            connectNulls
            isAnimationActive
          />
          {data.length ? (
            <ReferenceDot
              x={data[data.length - 1]?.label}
              y={data[data.length - 1]?.value}
              r={3}
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--background))"
              strokeWidth={1.5}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
      {yLabel ? (
        <p className="mt-1 text-xs text-gray-500 font-medium">{yLabel}</p>
      ) : null}
    </div>
  );
}


