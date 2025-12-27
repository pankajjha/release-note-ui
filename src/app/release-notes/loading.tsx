export default function Loading() {
  return (
    <main>
      <div className="max-w-[980px] mx-auto px-6">
        {/* Navigation skeleton - Glassmorphism style */}
        <nav className="sticky top-4 z-50 hidden md:flex justify-center mb-8">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-2 py-2">
            <div className="flex items-center gap-1">
              <div className="h-10 w-20 bg-gray-200/60 rounded-full animate-pulse" />
              <div className="h-10 w-20 bg-gray-200/60 rounded-full animate-pulse" />
              <div className="w-px h-5 bg-gray-200/80 mx-2" />
              <div className="h-10 w-32 bg-gray-200/60 rounded-full animate-pulse" />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation skeleton */}
        <nav className="sticky top-0 z-50 md:hidden mb-6">
          <div className="backdrop-blur-xl bg-white/80 border-b border-gray-200/50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-16 bg-gray-200/60 rounded-full animate-pulse" />
                <div className="h-9 w-16 bg-gray-200/60 rounded-full animate-pulse" />
              </div>
              <div className="h-9 w-28 bg-gray-200/60 rounded-full animate-pulse" />
            </div>
          </div>
        </nav>

        {/* Metadata bar skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 border-b border-black/[0.08] mb-12 gap-3">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-6 w-20 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Hero skeleton */}
        <div className="text-center py-16 pb-10">
          <div className="h-14 md:h-20 w-72 md:w-96 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-52 bg-gray-100 rounded mx-auto mb-8 animate-pulse" />
          <div className="space-y-2 max-w-[680px] mx-auto">
            <div className="h-5 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-5 w-4/5 bg-gray-100 rounded mx-auto animate-pulse" />
            <div className="h-5 w-3/4 bg-gray-100 rounded mx-auto animate-pulse" />
          </div>
        </div>

        {/* Contribution skeletons */}
        <div className="mt-20 pb-20">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-16 md:mb-24 relative ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Text Content */}
              <div className="flex-1 min-w-0 space-y-5">
                <div className="h-9 md:h-10 w-4/5 bg-gray-200 rounded-lg animate-pulse" />
                
                {/* Tags skeleton */}
                <div className="flex gap-2 flex-wrap">
                  <div className="h-7 w-20 bg-gray-100 rounded-2xl animate-pulse" />
                  <div className="h-7 w-24 bg-gray-100 rounded-2xl animate-pulse" />
                </div>
                
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                </div>
                
                {/* CTA link skeleton */}
                <div className="h-4 w-24 bg-violet-100 rounded animate-pulse" />
                
                {/* Contributors skeleton */}
                <div className="flex items-center gap-3 mt-6">
                  <div className="h-4 w-14 bg-gray-100 rounded animate-pulse" />
                  <div className="h-8 w-28 bg-gray-100 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Media skeleton */}
              <div className="flex-1 relative">
                {/* Number badge skeleton */}
                <div className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-11 h-11 md:w-14 md:h-14 bg-gray-300 rounded-full animate-pulse z-10" />
                <div className="aspect-[3/2] bg-gray-200 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archive section skeleton */}
      <div className="bg-[#FAFAFA] py-16 mt-20">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="h-9 w-32 bg-gray-200 rounded mx-auto mb-8 animate-pulse" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[800px] mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl animate-pulse"
              >
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto mb-2" />
                <div className="h-4 w-1/2 bg-gray-100 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
