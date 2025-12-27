import { redirect } from 'next/navigation';

/**
 * Root page - redirects to release notes
 */
export default function HomePage() {
  redirect('/release-notes/latest');
}

