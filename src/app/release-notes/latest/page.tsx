import { notFound } from 'next/navigation';
import { fetchLatestReleaseKey, fetchReleaseByKey, fetchArchive } from '@/lib/directus';
import {
  Navigation,
  HeaderHero,
  ContributionList,
  ArchiveList,
} from '@/components/release-notes';

interface PageProps {
  searchParams: Promise<{ scope?: string }>;
}

/**
 * Latest Release Notes Page - Server Component
 * 
 * Fetches the current release key from settings, then loads that release.
 * This page always shows the latest published release.
 * 
 * URL: /release-notes/latest
 * With filter: /release-notes/latest?scope=finance
 */
export default async function LatestReleasePage({ searchParams }: PageProps) {
  const { scope } = await searchParams;
  
  // Get the current release key from settings
  const latestKey = await fetchLatestReleaseKey();
  
  if (!latestKey) {
    // If no latest key configured, show a fallback or redirect to archive
    notFound();
  }

  // Fetch the release data
  const release = await fetchReleaseByKey(latestKey, scope);
  
  if (!release) {
    notFound();
  }

  // Fetch archive for the bottom section
  const archive = await fetchArchive();

  // Extract issue number from release_key
  const issueNumber = release.period_key.replace(/\D/g, '').slice(-3) || '001';

  return (
    <main className="min-h-screen">
      <div className="max-w-[980px] mx-auto px-6">
        <Navigation 
          currentScope={scope || 'all'} 
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
      
      <ArchiveList releases={archive.filter(r => r.period_key !== latestKey)} />
    </main>
  );
}

export const metadata = {
  title: 'Latest Release - Ambak Weekly',
  description: 'The latest product updates and feature releases from Ambak',
};
