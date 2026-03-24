import { Skeleton, SkeletonText } from '@/components/ui/skeleton';

export default function CasesLoading() {
  return (
    <div className="container-app max-w-2xl py-6">
      <Skeleton className="mb-6 h-8 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Skeleton className="mb-2 h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="mt-3 flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
