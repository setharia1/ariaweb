'use client';

import clsx from 'clsx';

interface Props { className?: string }

export default function WaveDivider({ className = '' }: Props) {
  return (
    <div aria-hidden className={clsx('relative h-12 md:h-16', className)}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ariaWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(75,0,130,0.35)" />
            <stop offset="50%" stopColor="rgba(201,166,53,0.35)" />
            <stop offset="100%" stopColor="rgba(75,0,130,0.35)" />
          </linearGradient>
        </defs>
        <path d="M0,64 C240,112 420,0 720,48 C1020,96 1200,16 1440,64 L1440,120 L0,120 Z" fill="url(#ariaWave)" fillOpacity="0.25" />
      </svg>
    </div>
  );
}


