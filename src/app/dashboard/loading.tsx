import Skeleton from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <aside className="hidden w-56 shrink-0 border-r border-border p-4 lg:block">
        <Skeleton className="h-8 w-32" />
        <div className="mt-6 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      </aside>

      <div className="flex-1 p-6 lg:p-8">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="mt-2 h-5 w-96" />

        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <Skeleton className="h-44 w-44 rounded-full" />
          <div className="grid w-full flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
