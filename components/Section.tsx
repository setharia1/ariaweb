import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  // Optional: override inner container width/padding classes for wider sections
  containerClassName?: string;
}

export default function Section({ children, className = '', containerClassName = '' }: SectionProps) {
  return (
    <section className={`py-12 md:py-16 relative ${className}`}>
      {/* Cinematic soft gradient overlay per section (subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-plus-lighter">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-royal/10" />
      </div>
      <div className={`relative mx-auto px-6 xl:px-8 prose prose-invert max-w-none prose-p:max-w-[70ch] prose-p:mx-auto prose-p:leading-relaxed max-w-7xl ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
