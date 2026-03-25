export default function CaseDetailLoading() {
  return (
    <div className="container-app py-8">
      <div className="animate-pulse space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gray-200" />
          <div className="space-y-2">
            <div className="h-5 w-48 rounded bg-gray-200" />
            <div className="h-3 w-32 rounded bg-gray-100" />
          </div>
        </div>
        {/* Complaint text */}
        <div className="space-y-2 rounded-lg border border-gray-200 p-4">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-3/4 rounded bg-gray-100" />
        </div>
        {/* Timeline */}
        <div className="space-y-3">
          <div className="h-4 w-20 rounded bg-gray-200" />
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-40 rounded bg-gray-100" />
                <div className="h-3 w-24 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
