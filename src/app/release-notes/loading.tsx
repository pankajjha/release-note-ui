export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Navigation skeleton */}
        <nav className="sticky top-4 z-50 hidden md:flex justify-center mb-8">
          <div className="glass-card-elevated rounded-full px-2 py-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-7 h-7 rounded-lg bg-warm-200 animate-pulse" />
                <div className="h-5 w-16 bg-warm-200 rounded animate-pulse" />
              </div>
              <div className="w-px h-5 bg-warm-200 mx-2" />
              <div className="h-10 w-20 bg-warm-100 rounded-full animate-pulse" />
              <div className="h-10 w-20 bg-warm-100 rounded-full animate-pulse" />
              <div className="w-px h-5 bg-warm-200 mx-2" />
              <div className="h-10 w-32 bg-warm-100 rounded-full animate-pulse" />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation skeleton */}
        <nav className="sticky top-0 z-50 md:hidden mb-6">
          <div className="glass-card-elevated px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-warm-200 animate-pulse" />
                <div className="h-5 w-16 bg-warm-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-1 bg-warm-100 rounded-full p-1">
                <div className="h-8 w-16 bg-warm-200 rounded-full animate-pulse" />
                <div className="h-8 w-16 bg-warm-200 rounded-full animate-pulse" />
              </div>
              <div className="h-8 w-16 bg-warm-100 rounded-full animate-pulse" />
            </div>
          </div>
        </nav>

        {/* Header skeleton */}
        <header className="pt-8 pb-16">
          {/* Issue Badge */}
          <div className="flex justify-center mb-8">
            <div className="glass-card-subtle rounded-full px-5 py-2">
              <div className="h-4 w-24 bg-warm-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-14 md:h-16 w-3/4 bg-warm-200 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-1/2 bg-warm-100 rounded mx-auto mb-6 animate-pulse" />
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-10 h-[1px] bg-warm-200" />
              <div className="h-4 w-40 bg-warm-100 rounded animate-pulse" />
              <div className="w-10 h-[1px] bg-warm-200" />
            </div>

            {/* Summary card skeleton */}
            <div className="glass-card-elevated rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="hidden md:block w-12 h-12 rounded-xl bg-warm-200 animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 bg-warm-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-warm-100 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-warm-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Section intro skeleton */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-warm-200" />
            <div className="h-3 w-20 bg-warm-100 rounded animate-pulse" />
            <div className="w-12 h-[1px] bg-warm-200" />
          </div>
          <div className="h-10 w-64 bg-warm-200 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Feature cards skeleton */}
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-card-elevated rounded-3xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Media skeleton */}
                <div className="lg:w-1/2 relative">
                  <div className="aspect-video bg-warm-100 animate-pulse" />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-warm-200 rounded-xl animate-pulse" />
                </div>

                {/* Content skeleton */}
                <div className="flex-1 p-6 md:p-8 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-warm-100 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-warm-100 rounded-full animate-pulse" />
                  </div>
                  <div className="h-8 w-4/5 bg-warm-200 rounded animate-pulse" />
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      <div className="w-6 h-6 rounded-full bg-warm-200 animate-pulse" />
                      <div className="w-6 h-6 rounded-full bg-warm-200 animate-pulse" />
                    </div>
                    <div className="h-4 w-32 bg-warm-100 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-warm-100 rounded animate-pulse" />
                    <div className="h-4 w-full bg-warm-100 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-warm-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Makers section skeleton */}
        <section className="py-16 my-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-amber-200" />
                <div className="h-3 w-32 bg-amber-100 rounded animate-pulse" />
                <div className="w-8 h-[2px] bg-amber-200" />
              </div>
              <div className="h-10 w-48 bg-warm-200 rounded-lg mx-auto mb-3 animate-pulse" />
              <div className="h-5 w-64 bg-warm-100 rounded mx-auto animate-pulse" />
            </div>

            <div className="glass-card-elevated rounded-3xl p-8">
              <div className="flex flex-wrap justify-center gap-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-3 p-4">
                    <div className="w-16 h-16 rounded-2xl bg-warm-200 animate-pulse" />
                    <div className="h-4 w-16 bg-warm-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Archive section skeleton */}
      <section className="py-16 mt-12">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-warm-200" />
              <div className="h-3 w-24 bg-warm-100 rounded animate-pulse" />
              <div className="w-8 h-[2px] bg-warm-200" />
            </div>
            <div className="h-10 w-48 bg-warm-200 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass-card-elevated rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-100 animate-pulse" />
                  <div className="h-5 w-16 bg-warm-100 rounded-full animate-pulse" />
                </div>
                <div className="h-5 w-3/4 bg-warm-200 rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-warm-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
