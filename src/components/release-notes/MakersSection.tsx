import type { ParsedSection, Contributor } from '@/types/directus';
import { ContributorChip } from './ContributorChip';

interface MakersSectionProps {
  sections: ParsedSection[];
}

// Extract unique contributors from all sections
function getUniqueContributors(sections: ParsedSection[]): Contributor[] {
  const seen = new Set<string>();
  const unique: Contributor[] = [];

  sections.forEach(section => {
    section.contributors?.forEach(contributor => {
      const email = contributor.directus_users_id.email;
      if (email && !seen.has(email)) {
        seen.add(email);
        unique.push(contributor);
      }
    });
  });

  return unique;
}

export function MakersSection({ sections }: MakersSectionProps) {
  const contributors = getUniqueContributors(sections);

  if (contributors.length === 0) {
    return null;
  }

  return (
    <section className="py-16 my-8">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
              The People Behind This Release
            </span>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-warm-900 mb-3">
            Meet the Makers ✨
          </h2>
          
          <p className="text-warm-600 text-lg max-w-xl mx-auto">
            These amazing people worked hard to bring you these updates
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="glass-card-elevated rounded-3xl p-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {contributors.map((contributor, index) => (
              <ContributorChip
                key={contributor.directus_users_id.email || index}
                contributor={contributor}
                variant="large"
                index={index}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-warm-200/50">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="font-display text-3xl font-semibold text-warm-900">
                  {sections.length}
                </div>
                <div className="text-sm text-warm-500">
                  Features Shipped
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-semibold text-warm-900">
                  {contributors.length}
                </div>
                <div className="text-sm text-warm-500">
                  Team Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

