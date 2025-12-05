"use client";

import {
  KpiCardSkeleton,
  ChartCardSkeleton,
  TextCardSkeleton,
} from "@/components/dashboard/skeleton-components";

export default function OverviewPageLoading() {
  return (
    <div className="space-y-8">
      {/* Operacional */}
      <section
        id="section-operacional"
        className="space-y-4 pt-2 scroll-mt-20 lg:scroll-mt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Operacional
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCardSkeleton />
          <KpiCardSkeleton />
          <KpiCardSkeleton />
          <KpiCardSkeleton />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <ChartCardSkeleton />
          <ChartCardSkeleton />
          <ChartCardSkeleton />
        </div>
      </section>

      {/* Insights */}
      <section
        id="section-insights"
        className="space-y-4 pt-4 scroll-mt-20 lg:scroll-mt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Insights
        </p>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <ChartCardSkeleton />
          <ChartCardSkeleton />
        </div>
      </section>

      {/* Análises */}
      <section
        id="section-analises"
        className="space-y-4 pt-4 pb-4 scroll-mt-20 lg:scroll-mt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Análises
        </p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ChartCardSkeleton />
          <ChartCardSkeleton />
          <TextCardSkeleton />
        </div>
      </section>
    </div>
  );
}

