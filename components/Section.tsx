import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 xl:px-8">
        {children}
      </div>
    </section>
  );
}
