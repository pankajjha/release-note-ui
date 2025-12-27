import type { Contributor } from '@/types/directus';

interface ContributorChipProps {
  contributor: Contributor;
}

export function ContributorChip({ contributor }: ContributorChipProps) {
  return (
    <div className="flex items-center gap-2 bg-white py-1.5 pl-1.5 pr-3.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="w-7 h-7 rounded-full author-avatar-gradient flex items-center justify-center text-white font-sans text-xs font-semibold">
        {
          (contributor.directus_users_id.first_name?.charAt(0) || '') + (contributor.directus_users_id.last_name?.charAt(0) || '')
          .toUpperCase()
          .trim()
        }
      </div>
      <span className="font-sans text-sm font-medium text-[#1A1A1A]">
        {contributor.directus_users_id.first_name}
      </span>
    </div>
  );
}

