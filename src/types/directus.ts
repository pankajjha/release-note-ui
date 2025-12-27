/**
 * Type definitions for Directus collections
 */

export interface DirectusUser {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ContributorJunction {
  directus_users_id: DirectusUser;
}

export interface ReleaseNoteSection {
  id: string;
  title: string;
  description: string;
  sort: number;
  status: 'draft' | 'approved' | 'published';
  scopes: string[]; // e.g., ['finance', 'yoddha', 'sangam']
  contributors: ContributorJunction[];
  media_type: 'image' | 'video' | 'none';
  media_file?: string; // Directus file ID
  media_url?: string;
  cta_link?: string;
}

export interface ReleaseNote {
  id: string;
  scope: string;
  period_type: 'week' | 'month' | 'year';
  period_key: string;
  title: string;
  summary: string;
  status: 'draft' | 'published' | 'archived';
  date_created: string;
  sections: ReleaseNoteSection[];
}

export interface ReleaseNoteSettings {
    current_period_type: 'week' | 'month' | 'year';
    current_period_key: string;
}

export interface ArchiveItem {
  period_key: string;
  title: string;
  published_at: string;
  status: 'published' | 'archived';
}

// Helper type for parsed contributor display
export interface Contributor {
  directus_users_id: DirectusUser;
}

// Parsed section with processed contributors
export interface ParsedSection extends Omit<ReleaseNoteSection, 'contributors'> {
  contributors: Contributor[];
  mediaUrl?: string;
}

// Parsed release note with processed sections
export interface ParsedReleaseNote extends Omit<ReleaseNote, 'sections'> {
  sections: ParsedSection[];
}

