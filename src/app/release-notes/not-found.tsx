import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-normal mb-4 text-[#1A1A1A]">404</h1>
        <h2 className="text-2xl font-normal mb-6 text-[#4A4A4A]">
          Release Not Found
        </h2>
        <p className="text-gray-500 font-sans mb-8 max-w-md">
          The release you&apos;re looking for doesn&apos;t exist or may have been archived.
        </p>
        <div className="flex gap-4 justify-center font-sans">
          <Link
            href="/release-notes/latest"
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
          >
            View Latest Release
          </Link>
          <Link
            href="/release-notes/archive"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors text-[#4A4A4A]"
          >
            Browse Archive
          </Link>
        </div>
      </div>
    </main>
  );
}

