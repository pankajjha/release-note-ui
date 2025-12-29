interface HeaderHeroProps {
  issueNumber: string;
  appVersion?: string;
  publishedAt?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
}

export function HeaderHero({
  issueNumber,
  appVersion,
  publishedAt,
  title = 'Ambak Weekly',
  subtitle = 'What we built for you this week',
  summary,
}: HeaderHeroProps) {
  // Format the date in a friendly way
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <header className="pt-8 pb-16">
      {/* Issue Badge */}
      <div className="flex justify-center mb-8">
        <div className="glass-card-subtle rounded-full px-5 py-2 flex items-center gap-3">
          <span className="text-sm font-medium text-warm-600">
            Issue #{issueNumber}
          </span>
          {appVersion && (
            <>
              <span className="w-1 h-1 rounded-full bg-warm-400" />
              <span className="text-sm text-warm-500">
                {appVersion}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-warm-900 mb-4">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl text-warm-600 font-medium mb-6">
          {subtitle}
        </p>

        {/* Date with flourish */}
        <div className="flourish text-sm mb-10">
          <span>{formattedDate}</span>
        </div>

        {/* Summary in glass card */}
        {summary && (
          <div className="glass-card-elevated rounded-2xl p-6 md:p-8 text-left">
            <div className="flex items-start gap-4">
              <div className="hidden md:flex w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-warm-800 mb-2">
                  This Week&apos;s Highlights
                </h2>
                <div 
                  className="prose-content text-warm-700 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: summary }} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
