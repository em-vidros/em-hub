interface MiniBarChartProps {
  values: number[];
}

export function MiniBarChart({ values }: MiniBarChartProps) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-20 items-end gap-1">
      {values.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-sm bg-[hsl(var(--chart-1))]/20"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}


