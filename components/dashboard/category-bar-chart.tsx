"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CategoryBarChartProps {
  data: { label: string; value: number }[];
  suffix?: string;
}

export function CategoryBarChart({ data, suffix }: CategoryBarChartProps) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 32 }}
          barCategoryGap={24}
        >
          <defs>
            <linearGradient id="categoryBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.9} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.7} />
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
            cursor={{ fill: "hsl(var(--muted)/0.5)" }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
            formatter={(value: number) =>
              suffix ? `${value.toFixed(1)}${suffix}` : value.toLocaleString("pt-BR")
            }
            labelFormatter={(label) => `${label}`}
          />
          <Bar
            dataKey="value"
            fill="url(#categoryBar)"
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
            isAnimationActive
          />
          <Legend
            formatter={() => <span className="text-xs font-medium text-gray-500">Volume por categoria</span>}
            wrapperStyle={{ bottom: 0 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


