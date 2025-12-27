export default function Loading() {
  return (
    <main>
      <div className="max-w-[980px] mx-auto px-6">
        {/* Navigation skeleton */}
        <div className="sticky top-5 right-10 float-right bg-white py-3 px-5 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] mb-10">
          <div className="flex gap-5 items-center">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="w-px h-4 bg-gray-200" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="w-px h-4 bg-gray-200" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Metadata bar skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 border-b border-black/[0.08] mb-12 gap-3">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-6 w-16 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Hero skeleton */}
        <div className="text-center py-16 pb-10">
          <div className="h-16 w-80 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-48 bg-gray-200 rounded mx-auto mb-8 animate-pulse" />
          <div className="h-20 w-full max-w-[680px] bg-gray-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Contribution skeletons */}
        <div className="mt-20 space-y-24">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 space-y-4">
                <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-2xl animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded-2xl animate-pulse" />
                </div>
                <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-[3/2] bg-gray-200 rounded-2xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

