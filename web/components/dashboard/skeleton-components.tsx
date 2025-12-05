"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

/**
 * Skeleton para um card de KPI
 */
export function KpiCardSkeleton() {
  return (
    <Card className="h-full min-w-0 overflow-hidden flex flex-col">
      <div className="flex flex-row items-center justify-between mb-3 pb-0 px-6 pt-6">
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex flex-col gap-2 pb-0 px-6 items-center justify-center flex-1">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-1 mt-1 justify-center">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </Card>
  );
}

/**
 * Skeleton para um SectionCard com gráfico
 */
export function ChartCardSkeleton() {
  return (
    <Card className="min-w-0">
      <div className="mb-4 min-w-0 px-6 pt-6">
        <Skeleton className="h-4 w-40 mb-1" />
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="min-w-0 flex flex-col items-center justify-center px-6 pb-6">
        <Skeleton className="h-52 w-full rounded-2xl" />
      </div>
    </Card>
  );
}

/**
 * Skeleton para um SectionCard com gráfico pequeno (para grid 2x2)
 */
export function SmallChartCardSkeleton() {
  return (
    <Card className="min-w-0">
      <div className="mb-4 min-w-0 px-6 pt-6">
        <Skeleton className="h-4 w-32 mb-1" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="min-w-0 flex flex-col items-center justify-center px-6 pb-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </Card>
  );
}

/**
 * Skeleton para um SectionCard com tabela
 */
export function TableCardSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card className="min-w-0">
      <div className="mb-4 min-w-0 px-6 pt-6">
        <Skeleton className="h-4 w-40 mb-1" />
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="min-w-0 px-6 pb-6">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex gap-4 pb-2 border-b">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
          {/* Rows */}
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-4 py-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/**
 * Skeleton para um SectionCard com conteúdo de texto
 */
export function TextCardSkeleton() {
  return (
    <Card className="min-w-0">
      <div className="mb-4 min-w-0 px-6 pt-6">
        <Skeleton className="h-4 w-40 mb-1" />
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="min-w-0 px-6 pb-6 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </Card>
  );
}

