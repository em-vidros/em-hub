"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProducaoLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="rounded-xl border bg-card p-4 shadow-sm">
            <Skeleton className="mb-3 h-3 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div
            key={index}
            className="rounded-xl border bg-card p-4 shadow-sm md:p-5"
          >
            <div className="mb-4 space-y-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div
            key={index}
            className="rounded-xl border bg-card p-4 shadow-sm md:p-5"
          >
            <div className="mb-4 space-y-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ))}
      </section>
    </div>
  );
}


