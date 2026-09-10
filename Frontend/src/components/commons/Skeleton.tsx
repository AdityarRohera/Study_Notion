/**
 * Shimmer placeholders. Preferred over a full-page spinner whenever the shape
 * of the incoming content is already known — it keeps the layout stable and
 * makes loads feel faster.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={`sn-skeleton ${className ?? ""}`} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export function CourseGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading courses"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListRowSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-2xl border border-ink-800 bg-ink-900 p-5 sm:flex-row sm:items-center"
        >
          <Skeleton className="h-32 w-full shrink-0 sm:h-24 sm:w-40" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
