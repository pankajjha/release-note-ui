import Link from 'next/link';
import type { ArchiveItem } from '@/types/directus';

interface ArchiveListProps {
  releases: ArchiveItem[];
  showTitle?: boolean;
}

export function ArchiveList({ releases, showTitle = true }: ArchiveListProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get relative time
  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (releases.length === 0) {
    return null;
  }

  return (
    <section className="py-16 mt-12" id="archive">
      <div className="max-w-[980px] mx-auto px-6">
        {showTitle && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-warm-300" />
              <span className="text-sm font-medium text-warm-500 uppercase tracking-wider">
                Previous Issues
              </span>
              <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-warm-300" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-warm-900">
              From the Archive
            </h2>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {releases.map((release, index) => (
            <Link
              key={release.period_key}
              href={`/release-notes/${release.period_key}`}
              className={`group feature-card glass-card-elevated rounded-2xl p-6 no-underline transition-all stagger-${Math.min(index + 1, 5)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                
                <span className="text-xs font-medium text-warm-400 bg-warm-100 px-2 py-1 rounded-full">
                  {getRelativeTime(release.date_created)}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-warm-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {release.title}
              </h3>
              
              <p className="text-sm text-warm-500">
                {formatDate(release.date_created)}
              </p>

              <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Read issue
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        {releases.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/release-notes/archive"
              className="inline-flex items-center gap-2 glass-card-subtle px-6 py-3 rounded-full text-sm font-medium text-warm-700 hover:text-warm-900 hover:shadow-lg transition-all no-underline"
            >
              View all issues
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
