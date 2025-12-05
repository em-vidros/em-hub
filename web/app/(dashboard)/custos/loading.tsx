"use client";

import {
  KpiCardSkeleton,
  ChartCardSkeleton,
  TableCardSkeleton,
} from "@/components/dashboard/skeleton-components";

export default function CustosPageLoading() {
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

      <section>
        <TableCardSkeleton rows={5} />
      </section>
    </div>
  );
}

