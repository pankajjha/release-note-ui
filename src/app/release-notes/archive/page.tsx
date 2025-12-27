import Link from 'next/link';
import { fetchArchive } from '@/lib/directus';
import { Navigation, ArchiveList } from '@/components/release-notes';
export const revalidate = 10;
/**
 * Archive Page - Server Component
 * 
 * Lists all published and archived releases.
 * 
 * URL: /release-notes/archive
 */
export default async function ArchivePage() {
  const archive = await fetchArchive();

  return (
    <main>
      <div className="max-w-[980px] mx-auto px-6">
        <Navigation activePage="archive" />
        
        {/* Minimal Header */}
        <div className="text-center py-16">
          <h1 className="text-5xl md:text-7xl font-normal tracking-tight mb-3 text-[#1A1A1A]">
            Archive
          </h1>
          <p className="font-sans text-base italic text-gray-500 mb-8">
            Past releases and product updates
          </p>
          <Link 
            href="/release-notes/latest"
            className="inline-block font-sans text-[#6B4CE6] hover:underline"
          >
            ← View Latest Release
          </Link>
        </div>
      </div>
      
      <ArchiveList releases={archive} showTitle={false} />
    </main>
  );
}

export const metadata = {
  title: 'Archive - Ambak Weekly',
  description: 'Browse all past product updates and feature releases from Ambak',
};

