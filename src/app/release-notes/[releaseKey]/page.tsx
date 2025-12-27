import { notFound } from 'next/navigation';
import { fetchReleaseByKey, fetchArchive } from '@/lib/directus';
import {
  Navigation,
  HeaderHero,
  ContributionList,
  ArchiveList,
} from '@/components/release-notes';

interface PageProps {
  params: Promise<{ releaseKey: string }>;
  searchParams: Promise<{ scope?: string }>;
}

/**
 * Release Notes Page - Server Component
 * 
 * Fetches release data server-side from Directus REST API.
 * Supports scope filtering via query parameter (server-side filtering).
 * 
 * URL: /release-notes/[releaseKey]
 * Example: /release-notes/2025-W52
 * With filter: /release-notes/2025-W52?scope=finance
 */
export default async function ReleaseNotePage({ params, searchParams }: PageProps) {
  const { releaseKey } = await params;
  const { scope } = await searchParams;
  
  // Fetch release data with optional scope filter
  const release = await fetchReleaseByKey(releaseKey, scope);
  
  if (!release) {
    notFound();
  }

  // Fetch archive for the bottom section
  const archive = await fetchArchive();

  // Extract issue number from release_key (e.g., "2025-W52" -> "052")
  // Adjust this logic based on your actual release_key format
  const issueNumber = release.period_key.replace(/\D/g, '').slice(-3) || '001';

  return (
    <main>
      <div className="max-w-[980px] mx-auto px-6">
        <Navigation 
          currentScope={scope || 'all'} 
          releaseKey={releaseKey}
          activePage="latest"
        />
        
        <HeaderHero
          issueNumber={issueNumber}
          appVersion="v1.7.0"
          publishedAt={release.date_created}
          title={release.title || 'Ambak Weekly'}
          summary={release.summary}
        />
        
        <ContributionList sections={release.sections} />
      </div>
      
      <ArchiveList releases={archive.filter(r => r.period_key !== releaseKey)} />
    </main>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps) {
  const { releaseKey } = await params;
  const release = await fetchReleaseByKey(releaseKey);
  
  if (!release) {
    return {
      title: 'Release Not Found - Ambak Weekly',
    };
  }

  return {
    title: `${release.title} - Ambak Weekly`,
    description: release.summary?.slice(0, 160),
  };
}

