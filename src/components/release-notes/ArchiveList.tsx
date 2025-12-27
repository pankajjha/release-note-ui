import Link from 'next/link';
import type { ArchiveItem } from '@/types/directus';

interface ArchiveListProps {
  releases: ArchiveItem[];
  showTitle?: boolean;
}

export function ArchiveList({ releases, showTitle = true }: ArchiveListProps) {
  // Group releases by month for better organization
  const groupedByMonth: Record<string, ArchiveItem[]> = {};
  
  releases.forEach((release) => {
    const date = new Date(release.published_at);
    const monthKey = date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    
    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = [];
    }
    groupedByMonth[monthKey].push(release);
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-[#FAFAFA] py-16 mt-20" id="archive">
      <div className="max-w-[980px] mx-auto px-6">
        {showTitle && (
          <h2 className="text-[32px] font-normal text-center mb-8">
            Archive
          </h2>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[800px] mx-auto">
          {releases.map((release) => (
            <Link
              key={release.period_key}
              href={`/release-notes/${release.period_key}`}
              className="bg-white p-5 rounded-xl text-center no-underline text-[#4A4A4A] font-sans text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            >
              <div className="font-semibold text-[#1A1A1A] mb-1">
                {release.title}
              </div>
              <div className="text-gray-500">
                {formatDate(release.published_at)}
              </div>
            </Link>
          ))}
        </div>
        
        {releases.length === 0 && (
          <p className="text-center text-gray-500">
            No archived releases found.
          </p>
        )}
      </div>
    </div>
  );
}

