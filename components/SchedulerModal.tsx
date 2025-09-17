'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface SchedulerModalProps {
  open: boolean;
  onClose: () => void;
  url?: string;
}

export default function SchedulerModal({ open, onClose, url }: SchedulerModalProps) {
  const schedulerUrl = url || process.env.NEXT_PUBLIC_SCHEDULER_URL || 'https://calendly.com/your-org/intro-call';

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Schedule a call">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl h-[80vh] card glowable overflow-hidden">
        <button className="absolute top-3 right-3 p-2 rounded-md hover:text-accent-a focus:outline-none focus:ring-2 focus:ring-accent-a" onClick={onClose} aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <iframe
          src={schedulerUrl}
          title="Scheduler"
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}


