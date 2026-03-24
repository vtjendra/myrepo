import { Skeleton, SkeletonText } from '@/components/ui/skeleton';

export default function CaseDetailLoading() {
  return (
    <div className="container-app max-w-2xl py-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Skeleton className="mb-2 h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <Skeleton className="mb-3 h-4 w-20" />
          <SkeletonText lines={4} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <Skeleton className="mb-4 h-4 w-20" />
          <SkeletonText lines={6} />
        </div>
      </div>
    </div>
  );
}
