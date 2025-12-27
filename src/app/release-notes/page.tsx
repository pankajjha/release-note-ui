import { redirect } from 'next/navigation';

/**
 * Redirect /release-notes to /release-notes/latest
 */
export default function ReleaseNotesIndexPage() {
  redirect('/release-notes/latest');
}

