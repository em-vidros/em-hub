import { memo, useCallback, useMemo } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KpiValue } from "@/data/types";
import {
  formatCurrencyBRL,
  formatNumber,
  formatPercentage,
} from "@/lib/format";

interface KpiCardProps {
  kpi: KpiValue;
  variant?: "currency" | "percentage" | "number";
}

function KpiCardComponent({ kpi, variant = "number" }: KpiCardProps) {
  const { label, value, unit, trendPercentage } = kpi;

  const renderValue = useCallback(() => {
    if (variant === "currency") return formatCurrencyBRL(value);
    if (variant === "percentage") return formatPercentage(value);
    if (unit) return `${formatNumber(value)} ${unit}`;
    return formatNumber(value);
  }, [variant, value, unit]);

  const trendPositive = useMemo(
    () => (trendPercentage ?? 0) >= 0,
    [trendPercentage]
  );

  const formattedValue = useMemo(() => renderValue(), [renderValue]);

  return (
    <Card className="h-full min-w-0">
      <CardHeader className="flex flex-row items-center justify-between mb-3 pb-0">
        <CardTitle className="text-sm sm:text-[0.9rem] font-medium text-gray-900 capitalize min-w-0">
          <span className="block truncate" title={label}>
            {label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-0">
        <div className="flex items-baseline gap-2 min-w-0">
          <p className="text-[1.75rem] sm:text-[1.875rem] font-semibold leading-tight text-gray-900 break-words">
            {formattedValue}
          </p>
        </div>
        {trendPercentage !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {trendPositive ? (
              <ArrowUpRight className="h-4 w-4 text-[#10B981]" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-[#EF4444]" />
            )}
            <span
              className={`text-xs sm:text-sm font-medium ${
                trendPositive ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {trendPositive ? "+" : ""}
              {trendPercentage.toFixed(1)}%
            </span>
            <span className="text-[0.7rem] sm:text-xs text-gray-500 ml-1">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const KpiCard = memo(KpiCardComponent);


