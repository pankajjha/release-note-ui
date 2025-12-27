import Image from 'next/image';
import type { ParsedSection } from '@/types/directus';
import { ContributorChip } from './ContributorChip';

interface ContributionRowProps {
  section: ParsedSection;
  index: number;
  showNumber?: boolean;
}

export function ContributionRow({ section, index, showNumber = true }: ContributionRowProps) {
  const isReversed = index % 2 === 1;
  
  // Scope tag styling
  const getScopeTagClass = (scope: string) => {
    const primaryScopes = ['finance'];
    if (primaryScopes.includes(scope.toLowerCase())) {
      return 'bg-[#E8E0FF] text-[#6B4CE6]';
    }
    return 'bg-gray-100 text-gray-500';
  };

  const hasMedia = section.mediaUrl && section.media_type !== 'none';

  return (
    <div 
      className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-16 md:mb-24 relative ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <h2 className="text-3xl md:text-4xl font-normal mb-5 tracking-tight text-[#1A1A1A]">
          {section.title}
        </h2>
        
        {/* Tags */}
        {section.scopes && section.scopes.length > 0 && (
          <div className="flex gap-2 mb-5 flex-wrap">
            {section.scopes.map((scope) => (
              <span
                key={scope}
                className={`py-1.5 px-3.5 rounded-2xl font-sans text-[13px] capitalize ${getScopeTagClass(scope)}`}
              >
                {scope}
              </span>
            ))}
          </div>
        )}
        
        {/* Description */}
        <div 
          className="text-[17px] text-[#4A4A4A] mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.description }} 
        />
        
        {/* CTA Link */}
        {section.cta_link && (
          <a 
            href={section.cta_link}
            className="inline-block text-[#6B4CE6] font-sans text-sm font-medium mb-4 hover:underline"
          >
            Learn more →
          </a>
        )}
        
        {/* Authors */}
        {section.contributors && section.contributors.length > 0 && (
          <div className="flex items-center gap-3 mt-6">
            <span className="font-sans text-[13px] text-gray-400 italic">
              built by
            </span>
            {section.contributors.map((contributor, idx) => (
              <ContributorChip key={idx} contributor={contributor} />
            ))}
          </div>
        )}
      </div>
      
      {/* Media */}
      {hasMedia && (
        <div className="flex-1 relative">
          {showNumber && (
            <div className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-11 h-11 md:w-14 md:h-14 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center font-sans text-xl md:text-2xl font-semibold z-10">
              {index + 1}
            </div>
          )}
          
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-white">
            {section.media_type === 'video' ? (
              <video 
                src={section.mediaUrl} 
                controls 
                className="w-full h-auto block"
              />
            ) : (
              <Image
                src={section.mediaUrl!}
                alt={section.title}
                width={600}
                height={400}
                className="w-full h-auto block"
                unoptimized
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

