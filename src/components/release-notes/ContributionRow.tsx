import Image from 'next/image';
import type { ParsedSection } from '@/types/directus';
import { AuthorByline } from './ContributorChip';

interface ContributionRowProps {
  section: ParsedSection;
  index: number;
}

// Scope badge styling
function getScopeBadgeClass(scope: string): string {
  const scopeLower = scope.toLowerCase();
  if (scopeLower === 'finance') return 'badge-finance';
  if (scopeLower === 'yoddha') return 'badge-yoddha';
  if (scopeLower === 'sangam') return 'badge-sangam';
  return 'badge-default';
}

export function ContributionRow({ section, index }: ContributionRowProps) {
  const hasMedia = section.mediaUrl && section.media_type !== 'none';

  return (
    <article className="feature-card glass-card-elevated rounded-3xl overflow-hidden mb-8">
      <div className={`flex flex-col ${hasMedia ? 'lg:flex-row' : ''}`}>
        {/* Media Section */}
        {hasMedia && (
          <div className="lg:w-1/2 relative">
            <div className="aspect-video lg:aspect-auto lg:absolute lg:inset-0">
              {section.media_type === 'video' ? (
                <video 
                  src={section.mediaUrl} 
                  controls 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={section.mediaUrl!}
                  alt={section.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            {/* Feature number badge */}
            <div className="absolute top-4 left-4 w-10 h-10 glass-card-elevated rounded-xl flex items-center justify-center font-display text-lg font-semibold text-warm-800">
              {index + 1}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className={`flex-1 p-6 md:p-8 ${hasMedia ? 'lg:w-1/2' : ''}`}>
          {/* Number badge for non-media cards */}
          {!hasMedia && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-display text-lg font-semibold text-white mb-4 shadow-lg shadow-indigo-500/25">
              {index + 1}
            </div>
          )}

          {/* Scope Tags */}
          {section.scopes && section.scopes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {section.scopes.map((scope) => (
                <span
                  key={scope}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getScopeBadgeClass(scope)}`}
                >
                  {scope}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-warm-900 mb-3 tracking-tight">
            {section.title}
          </h3>

          {/* Author Byline */}
          {section.contributors && section.contributors.length > 0 && (
            <div className="mb-5">
              <AuthorByline contributors={section.contributors} />
            </div>
          )}

          {/* Description */}
          <div 
            className="prose-content text-warm-700 text-base mb-6"
            dangerouslySetInnerHTML={{ __html: section.description }} 
          />

          {/* CTA Link */}
          {section.cta_link && (
            <a 
              href={section.cta_link}
              className="inline-flex items-center gap-2 text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors group"
            >
              Learn more
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
