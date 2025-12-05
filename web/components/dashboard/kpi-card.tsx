import { memo, useCallback, useMemo } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KpiValue } from "@/warehouse/types";
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
    <Card className="h-full min-w-0 overflow-hidden flex flex-col items-stretch">
      <CardHeader className="flex flex-col items-center justify-center mb-3 pb-0 text-center">
        <CardTitle className="text-sm sm:text-[0.9rem] font-medium text-gray-900 capitalize min-w-0 w-full text-center">
          <span className="block truncate" title={label}>
            {label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-0 items-center justify-center flex-1 text-center">
        <div className="flex items-baseline gap-2 min-w-0 justify-center">
          <p className="text-[1.75rem] sm:text-[1.875rem] font-semibold leading-tight text-gray-900 break-words text-center">
            {formattedValue}
          </p>
        </div>
        {trendPercentage !== undefined && (
          <div className="flex items-center gap-1 mt-1 justify-center">
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
              vs último mês
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const KpiCard = memo(KpiCardComponent);


