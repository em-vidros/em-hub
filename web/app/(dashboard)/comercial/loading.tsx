"use client";

import {
  KpiCardSkeleton,
  ChartCardSkeleton,
  TableCardSkeleton,
  SmallChartCardSkeleton,
} from "@/components/dashboard/skeleton-components";

export default function ComercialPageLoading() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ChartCardSkeleton />
        <TableCardSkeleton rows={5} />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </section>

      <section>
        <div className="mb-4">
          <div className="h-4 w-48 bg-muted/80 animate-pulse rounded mb-1" />
          <div className="h-3 w-64 bg-muted/80 animate-pulse rounded" />
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <SmallChartCardSkeleton />
          <SmallChartCardSkeleton />
          <SmallChartCardSkeleton />
          <SmallChartCardSkeleton />
        </div>
      </section>
    </div>
  );
}

