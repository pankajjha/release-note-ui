import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card-elevated rounded-3xl p-10 max-w-md text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="font-display text-5xl font-semibold text-warm-900 mb-3">404</h1>
        <h2 className="font-display text-xl font-medium text-warm-700 mb-4">
          Release Not Found
        </h2>
        <p className="text-warm-600 mb-8">
          The release you&apos;re looking for doesn&apos;t exist or may have been archived.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/release-notes/latest"
            className="inline-flex items-center justify-center gap-2 bg-warm-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-warm-800 transition-colors no-underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            View Latest Release
          </Link>
          <Link
            href="/release-notes/archive"
            className="inline-flex items-center justify-center gap-2 glass-card-subtle px-6 py-3 rounded-xl font-medium text-warm-700 hover:text-warm-900 hover:shadow-md transition-all no-underline"
          >
            Browse Archive
          </Link>
        </div>
      </div>
    </main>
  );
}
