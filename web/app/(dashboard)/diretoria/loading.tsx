"use client";

import {
  KpiCardSkeleton,
  ChartCardSkeleton,
  TableCardSkeleton,
} from "@/components/dashboard/skeleton-components";

export default function DiretoriaPageLoading() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCardSkeleton />
        <KpiCardSkeleton />
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
        <TableCardSkeleton rows={5} />
        <TableCardSkeleton rows={5} />
      </section>
    </div>
  );
}

