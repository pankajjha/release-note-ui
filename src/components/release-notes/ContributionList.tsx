import type { ParsedSection } from '@/types/directus';
import { ContributionRow } from './ContributionRow';
import { MakersSection } from './MakersSection';

interface ContributionListProps {
  sections: ParsedSection[];
}

export function ContributionList({ sections }: ContributionListProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="glass-card-elevated rounded-2xl p-8 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-display text-xl font-semibold text-warm-800 mb-2">
            No updates yet
          </h3>
          <p className="text-warm-600">
            There are no contributions for the selected filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Section Intro */}
      <div className="text-center mb-12 pt-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-warm-300" />
          <span className="text-sm font-medium text-warm-500 uppercase tracking-wider">
            What&apos;s New
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-warm-300" />
        </div>
        
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-warm-900">
          This Week&apos;s Updates
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <ContributionRow 
            key={section.id} 
            section={section} 
            index={index}
          />
        ))}
      </div>

      {/* Makers Section */}
      <MakersSection sections={sections} />
    </>
  );
}
