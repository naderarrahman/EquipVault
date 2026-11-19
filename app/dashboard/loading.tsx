export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
      {/* Page Title & Action Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2.5">
          <div className="h-8 w-64 rounded-xl bg-muted" />
          <div className="h-4 w-96 max-w-full rounded-lg bg-muted/70" />
        </div>
        <div className="h-10 w-40 rounded-xl bg-muted" />
      </div>

      {/* 4 KPI Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded bg-muted" />
              <div className="size-9 rounded-xl bg-muted" />
            </div>
            <div className="h-7 w-28 rounded-lg bg-muted" />
            <div className="h-3 w-36 rounded bg-muted/70" />
          </div>
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="h-8 w-20 rounded-xl bg-muted" />
          <div className="h-8 w-20 rounded-xl bg-muted/70" />
          <div className="h-8 w-20 rounded-xl bg-muted/70" />
        </div>
        <div className="h-9 w-full sm:w-72 rounded-xl bg-muted" />
      </div>

      {/* Main Table / Cards Skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="h-5 w-44 rounded bg-muted" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-20 w-full rounded-xl bg-muted/60" />
          ))}
        </div>
      </div>
    </div>
  )
}