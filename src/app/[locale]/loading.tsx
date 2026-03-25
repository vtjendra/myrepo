export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-b from-brand-50 to-white px-4 py-16 sm:py-24">
        <div className="container-app text-center">
          <div className="mx-auto h-10 w-80 rounded bg-gray-200" />
          <div className="mx-auto mt-4 h-6 w-64 rounded bg-gray-200" />
          <div className="mx-auto mt-8 h-12 w-full max-w-lg rounded-lg bg-gray-200" />
        </div>
      </div>
      {/* How it works skeleton */}
      <div className="container-app py-16">
        <div className="mx-auto h-8 w-48 rounded bg-gray-200" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="mt-4 h-5 w-32 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-48 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
