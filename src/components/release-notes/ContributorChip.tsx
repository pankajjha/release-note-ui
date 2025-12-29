import type { Contributor } from '@/types/directus';

interface ContributorChipProps {
  contributor: Contributor;
  variant?: 'default' | 'large' | 'inline';
  index?: number;
}

// Rotating gradient classes for variety
const avatarGradients = [
  'avatar-gradient-1',
  'avatar-gradient-2', 
  'avatar-gradient-3',
  'avatar-gradient-4',
  'avatar-gradient-5',
  'avatar-gradient-6',
];

function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';
  return (first + last).toUpperCase() || '?';
}

function getFullName(firstName?: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(' ') || 'Unknown';
}

export function ContributorChip({ contributor, variant = 'default', index = 0 }: ContributorChipProps) {
  const { first_name, last_name } = contributor.directus_users_id;
  const initials = getInitials(first_name, last_name);
  const fullName = getFullName(first_name, last_name);
  const gradientClass = avatarGradients[index % avatarGradients.length];

  // Large variant - for "The Makers" section
  if (variant === 'large') {
    return (
      <div className="flex flex-col items-center gap-3 p-4 group">
        <div className={`w-16 h-16 rounded-2xl ${gradientClass} flex items-center justify-center text-white text-lg font-semibold shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
          {initials}
        </div>
        <div className="text-center">
          <p className="font-medium text-warm-800 text-sm">
            {first_name}
          </p>
          {last_name && (
            <p className="text-warm-500 text-xs">
              {last_name}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Inline variant - just name with small avatar
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className={`w-5 h-5 rounded-full ${gradientClass} flex items-center justify-center text-white text-[10px] font-semibold`}>
          {initials}
        </span>
        <span className="font-medium text-warm-700 text-sm">
          {first_name}
        </span>
      </span>
    );
  }

  // Default chip variant
  return (
    <div className="inline-flex items-center gap-2 glass-card-subtle py-1.5 pl-1.5 pr-3.5 rounded-full transition-all duration-200 hover:shadow-md">
      <div className={`w-7 h-7 rounded-full ${gradientClass} flex items-center justify-center text-white text-xs font-semibold`}>
        {initials}
      </div>
      <span className="font-medium text-warm-800 text-sm">
        {first_name}
      </span>
    </div>
  );
}

// Stacked avatars for compact display
interface ContributorStackProps {
  contributors: Contributor[];
  maxDisplay?: number;
}

export function ContributorStack({ contributors, maxDisplay = 4 }: ContributorStackProps) {
  const displayContributors = contributors.slice(0, maxDisplay);
  const remaining = contributors.length - maxDisplay;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayContributors.map((contributor, idx) => {
          const { first_name, last_name } = contributor.directus_users_id;
          const initials = getInitials(first_name, last_name);
          const gradientClass = avatarGradients[idx % avatarGradients.length];

          return (
            <div
              key={idx}
              className={`w-8 h-8 rounded-full ${gradientClass} flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm`}
              title={getFullName(first_name, last_name)}
            >
              {initials}
            </div>
          );
        })}
        {remaining > 0 && (
          <div className="w-8 h-8 rounded-full bg-warm-200 flex items-center justify-center text-warm-600 text-xs font-semibold border-2 border-white">
            +{remaining}
          </div>
        )}
      </div>
      <div className="ml-3 text-sm text-warm-600">
        <span className="font-medium text-warm-700">
          {displayContributors.map(c => c.directus_users_id.first_name).join(', ')}
        </span>
        {remaining > 0 && ` +${remaining} more`}
      </div>
    </div>
  );
}

// Author byline for editorial feel
interface AuthorBylineProps {
  contributors: Contributor[];
}

export function AuthorByline({ contributors }: AuthorBylineProps) {
  if (!contributors || contributors.length === 0) return null;

  const names = contributors.map(c => c.directus_users_id.first_name).filter(Boolean);
  
  const formatNames = (names: string[]) => {
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} & ${names[1]}`;
    return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-1.5">
        {contributors.slice(0, 3).map((contributor, idx) => {
          const { first_name, last_name } = contributor.directus_users_id;
          const initials = getInitials(first_name, last_name);
          const gradientClass = avatarGradients[idx % avatarGradients.length];

          return (
            <div
              key={idx}
              className={`w-6 h-6 rounded-full ${gradientClass} flex items-center justify-center text-white text-[10px] font-semibold border-2 border-white`}
            >
              {initials}
            </div>
          );
        })}
      </div>
      <span className="text-sm text-warm-600">
        By <span className="font-medium text-warm-700">{formatNames(names)}</span>
      </span>
    </div>
  );
}
