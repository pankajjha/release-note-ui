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
  subtitle = 'New features • Every week',
  summary,
}: HeaderHeroProps) {
  // Format the date
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

  const formattedTime = publishedAt
    ? new Date(publishedAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : '10:30 AM';

  return (
    <>
      {/* Metadata Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 font-sans text-[13px] text-gray-500 border-b border-black/[0.08] mb-12 gap-3">
        <div className="flex items-center gap-2">
          {formattedDate} • {formattedTime}
        </div>
        
        <div className="flex items-center gap-2">
          Gurugram, India
        </div>
        
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 py-1 px-3 rounded-xl text-xs">
            Issue No. {issueNumber}
          </span>
          {appVersion && (
            <span className="bg-gray-100 py-1 px-3 rounded-xl text-xs">
              App {appVersion}
            </span>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 pb-10">
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight mb-3 text-[#1A1A1A]">
          {title}
        </h1>
        
        <p className="font-sans text-base italic text-gray-500 mb-8">
          {subtitle}
        </p>

        {summary && (
          <div className="text-lg text-[#4A4A4A] max-w-[680px] mx-auto leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
        )}
      </div>
    </>
  );
}

