export default function ComplaintLoading() {
  return (
    <div className="container-app py-8">
      <div className="animate-pulse space-y-6">
        {/* Step indicator */}
        <div className="mx-auto flex max-w-md justify-between">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="h-2 w-12 rounded bg-gray-100" />
            </div>
          ))}
        </div>
        {/* Content area */}
        <div className="mx-auto max-w-2xl space-y-4 rounded-lg border border-gray-200 p-6">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-100" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
