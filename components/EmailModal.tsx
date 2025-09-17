'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  ctaLabel?: string;
}

export default function EmailModal({ open, onClose, title = 'Get insights', ctaLabel = 'Subscribe' }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="email-modal-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div ref={dialogRef} className="relative w-full max-w-md card p-6 glowable">
        <button className="absolute top-3 right-3 p-2 rounded-md hover:text-accent-a" onClick={onClose} aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <h3 id="email-modal-title" className="font-serif text-xl t-strong mb-2">{title}</h3>
        <p className="t-muted text-sm mb-4">Occasional notes on building, monetization, and stewardship. No spam.</p>
        {status === 'success' ? (
          <div className="text-emerald-400">Thanks—check your inbox soon.</div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <label className="sr-only" htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-a/40 focus:border-accent-a/40"
              placeholder="you@company.com"/>
            <button className="btn-primary w-full" disabled={status==='sending'}>{status==='sending'? 'Sending…' : ctaLabel}</button>
          </form>
        )}
      </div>
    </div>
  );
}


