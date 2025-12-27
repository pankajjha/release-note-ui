/**
 * Directus REST API data layer
 * All functions are server-only and use SSR fetch
 */

import type {
  ReleaseNote,
  ReleaseNoteSettings,
  ArchiveItem,
  ParsedReleaseNote,
  ParsedSection,
  Contributor,
} from '@/types/directus';
import { mockRelease, mockArchive } from './mock-data';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

// Use mock data when Directus is not configured
const USE_MOCK_DATA = !DIRECTUS_URL || !DIRECTUS_TOKEN;

if (USE_MOCK_DATA) {
  console.warn('Directus not configured - using mock data for development');
}

/**
 * Base fetch helper with authorization
 * 
 * CACHING NOTES:
 * - Currently using cache: "no-store" for development
 * - For production, change to: next: { revalidate: 600 } (10 minutes)
 * - Or use: next: { tags: ['release-notes'] } for on-demand revalidation
 */
async function directusFetch<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${DIRECTUS_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      // Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Current: no caching for development
    cache: 'no-store',
    // Future options for caching:
    // next: { revalidate: 600 }, // Revalidate every 10 minutes
    // next: { tags: ['release-notes'] }, // For on-demand revalidation
  });

  if (!response.ok) {
    throw new Error(`Directus API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.data as T;
}

/**
 * Fetch the current release key from settings
 */
export async function fetchLatestReleaseKey(): Promise<string | null> {
  // Return mock data if Directus is not configured
  if (USE_MOCK_DATA) {
    return mockRelease.period_key;
  }

  try {
    const settings = await directusFetch<ReleaseNoteSettings>(
      '/items/release_notes_settings'
    );
    return settings?.current_period_key || null;
  } catch (error) {
    console.error('Failed to fetch latest release key:', error);
    // Fallback to mock data on error
    return mockRelease.period_key;
  }
}

/**
 * Parse raw Directus response into usable format
 */
function parseContributor(junction: { directus_users_id: { first_name: string; last_name: string; email: string } }): Contributor {
  const { first_name, last_name, email } = junction.directus_users_id;

  return {
    directus_users_id: {
      first_name: first_name || '',
      last_name: last_name || '',
      email: email || '',
    },
  };
}

function parseSection(section: ReleaseNote['sections'][number]): ParsedSection {
  // Determine media URL
  let mediaUrl: string | undefined;
  
  if (section.media_file) {
    mediaUrl = `${DIRECTUS_URL}/assets/${section.media_file}`;
  } else if (section.media_url) {
    mediaUrl = section.media_url;
  }

  // Parse authors from junction table
  const contributors = (section.contributors || []).map(parseContributor);

  return {
    ...section,
    contributors,
    mediaUrl,
  };
}

function parseReleaseNote(release: ReleaseNote): ParsedReleaseNote {
  return {
    ...release,
    sections: (release.sections || [])
      .filter(s => s.status === 'published')
      .sort((a, b) => a.sort - b.sort)
      .map(parseSection),
  };
}

/**
 * Fetch a release by its release_key with all sections and authors
 */
export async function fetchReleaseByKey(
  releaseKey: string,
  scope?: string
): Promise<ParsedReleaseNote | null> {
  console.log('fetchReleaseByKey', releaseKey, scope);
  // Return mock data if Directus is not configured
  if (USE_MOCK_DATA) {
    const release = { ...mockRelease };
    
    // Filter sections by scope if provided
    if (scope && scope !== 'all') {
      release.sections = release.sections.filter(section =>
        section.scopes?.includes(scope.toLowerCase())
      );
    }
    
    return release;
  }

  try {
    // Build fields parameter for nested relations
    const fields = [
      'id',
      'scope',
      'period_type',
      'period_key',
      'title',
      'highlights',
      'summary',
      'status',
      'date_created',
      'sections.id',
      'sections.title',
      'sections.description',
      'sections.sort',
      'sections.status',
      'sections.media_type',
      'sections.media_file',
      'sections.media_url',
      'sections.cta_link',
      // 'sections.scopes',
      'sections.contributors.directus_users_id.first_name',
      'sections.contributors.directus_users_id.last_name',
      'sections.contributors.directus_users_id.email',
    ].join(',');

    const releases = await directusFetch<ReleaseNote[]>('/items/release_notes', {
      'filter[period_key][_eq]': releaseKey,
      'filter[status][_in]': 'published,archived',
      fields,
      'sort[]': 'sections.sort',
    });

    if (!releases || releases.length === 0) {
      return null;
    }

    const parsed = parseReleaseNote(releases[0]);

    // Filter sections by scope if provided
    if (scope && scope !== 'all') {
      parsed.sections = parsed.sections.filter(section =>
        section.scopes?.includes(scope.toLowerCase())
      );
    }

    return parsed;
  } catch (error) {
    console.error('Failed to fetch release:', error);
    // Fallback to mock data on error
    return mockRelease;
  }
}

/**
 * Fetch archive list of all published/archived releases
 */
export async function fetchArchive(): Promise<ArchiveItem[]> {
  // Return mock data if Directus is not configured
  if (USE_MOCK_DATA) {
    return mockArchive;
  }

  const fields = [
    'period_key',
    'title',
    'date_created',
    'status',
  ].join(',');

  try {
    const releases = await directusFetch<ArchiveItem[]>('/items/release_notes', {
      'filter[status][_in]': 'published,archived',
      fields,
      'sort[]': '-date_created',
    });

    return releases || [];
  } catch (error) {
    console.error('Failed to fetch archive:', error);
    // Fallback to mock data on error
    return mockArchive;
  }
}

/**
 * Get available scopes from all sections (for filter dropdown)
 * In a real app, this might come from a separate collection
 */
export function getAvailableScopes(): { value: string; label: string }[] {
  return [
    { value: 'all', label: 'All Projects' },
    { value: 'finance', label: 'Finance' },
    { value: 'yoddha', label: 'Yoddha' },
    { value: 'sangam', label: 'Sangam' },
  ];
}

