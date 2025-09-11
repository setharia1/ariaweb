'use client';

interface SectionSeparatorProps {
  className?: string;
  variant?: 'top' | 'bottom' | 'both';
}

export default function SectionSeparator({ className = '', variant = 'both' }: SectionSeparatorProps) {
  return (
    <div className={`relative ${className}`}>
      {variant === 'top' || variant === 'both' ? (
        <svg
          className="absolute top-0 left-0 w-full h-12 -translate-y-1"
          viewBox="0 0 1200 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,48 C200,24 400,0 600,24 C800,48 1000,24 1200,48 L1200,48 L0,48 Z"
            fill="url(#gradient-top)"
          />
          <defs>
            <linearGradient id="gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(51, 225, 237, 0.1)" />
              <stop offset="50%" stopColor="rgba(106, 200, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(51, 225, 237, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}
      
      {variant === 'bottom' || variant === 'both' ? (
        <svg
          className="absolute bottom-0 left-0 w-full h-12 translate-y-1"
          viewBox="0 0 1200 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C200,24 400,48 600,24 C800,0 1000,24 1200,0 L1200,0 L0,0 Z"
            fill="url(#gradient-bottom)"
          />
          <defs>
            <linearGradient id="gradient-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(51, 225, 237, 0.1)" />
              <stop offset="50%" stopColor="rgba(106, 200, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(51, 225, 237, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}
    </div>
  );
}
