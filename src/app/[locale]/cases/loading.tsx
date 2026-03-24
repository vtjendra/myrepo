export default function CasesLoading() {
  return (
    <div className="container-app py-8">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-3 w-56 rounded bg-gray-100" />
                <div className="h-3 w-full rounded bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
