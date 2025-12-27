import type { ParsedSection } from '@/types/directus';
import { ContributionRow } from './ContributionRow';

interface ContributionListProps {
  sections: ParsedSection[];
}

export function ContributionList({ sections }: ContributionListProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 font-sans">
          No contributions to display for the selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-20 pb-20">
      {sections.map((section, index) => (
        <ContributionRow 
          key={section.id} 
          section={section} 
          index={index}
        />
      ))}
    </div>
  );
}

