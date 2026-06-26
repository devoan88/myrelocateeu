import Skeleton from "@/components/ui/skeleton";

export default function GuideSkeleton() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background lg:flex-row">
      <aside className="hidden w-[280px] shrink-0 border-r border-border p-6 lg:block">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-6 h-24 w-full rounded-xl" />
        <div className="mt-6 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[800px] p-6 lg:p-8">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="mt-8 h-9 w-64" />
          <Skeleton className="mt-2 h-5 w-80" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
