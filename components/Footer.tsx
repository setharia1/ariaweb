'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface FooterProps {
  className?: string;
  showNewsletter?: boolean;
  newsletterEnabled?: boolean;
  contactEmail?: string;
  location?: string;
}

export default function Footer({
  className,
  showNewsletter = true,
  newsletterEnabled = false,
  contactEmail = 'invest@aria.capital',
  location = 'Lehi, UT',
}: FooterProps) {
  const pathname = usePathname?.() ?? '';
  const isTeamPage = pathname === '/team';
  const year = useMemo(() => new Date().getFullYear(), []);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [contactError, setContactError] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactFrom, setContactFrom] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
  }, [email]);

  const showEmailError = emailTouched && !isEmailValid;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    // Not wired to backend; keep disabled or early return
    if (!newsletterEnabled || !isEmailValid) return;
  };

  const submitCompactContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    setContactError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactFrom, message: contactMsg }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setContactStatus('sent');
      setContactName(''); setContactFrom(''); setContactMsg('');
    } catch (err: any) {
      setContactStatus('error');
      setContactError(err?.message || 'Something went wrong');
    }
  };

  return (
    <footer role="contentinfo" aria-label="Footer" className={`relative z-10 overflow-hidden ${className ?? ''}`}>
      {/* Top gold rule */}
      <div className="w-full h-[2px] bg-accent-a/50 shadow-[0_0_12px_rgba(201,166,53,0.3)]" />

      {/* Background */}
      <div className="relative bg-gradient-to-b from-navy to-black text-[#E6E9EF]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.45))]" />

        <div className="relative max-w-7xl mx-auto px-6 xl:px-8 py-12 md:py-14">
          {/* Top grid: Brand, Links, Contact, Newsletter + Compact Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* Brand lockup */}
            <section aria-label="Brand" className="space-y-3">
              <Link href="/" className="inline-block font-serif text-2xl font-semibold tracking-[0.06em] bg-gradient-to-r from-gold via-royal to-gold bg-clip-text text-transparent">
                ARIA
              </Link>
              <p className="text-[#BFC6D1] text-sm leading-snug max-w-sm">
                Operator-built investment platform partnering with builders to create durable value.
              </p>
            </section>

            {/* Quick links */}
            <nav aria-label="Quick links" className="grid grid-cols-2 gap-6">
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-accent-a transition-colors" href="/">Home</Link></li>
                <li><Link className="hover:text-accent-a transition-colors" href="/about">About</Link></li>
                <li><Link className="hover:text-accent-a transition-colors" href="/investment-approach">Investment Approach</Link></li>
                <li><Link className="hover:text-accent-a transition-colors" href="/portfolio">Portfolio</Link></li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li><Link className="hover:text-accent-a transition-colors" href="/stewardship">Stewardship</Link></li>
                <li><Link className="hover:text-accent-a transition-colors" href="/insights">Insights</Link></li>
                <li><Link className="hover:text-accent-a transition-colors" href="/team">Team</Link></li>
                <li><Link className="hover:text-accent-a transition-colors" href="/contact">Contact</Link></li>
              </ul>
            </nav>

            {/* Contact */}
            <section aria-label="Contact" className="space-y-3">
              <h3 className="font-serif text-base tracking-[0.05em] text-[#E6E9EF]">Contact</h3>
              <div className="text-sm text-[#BFC6D1] space-y-1">
                {!isTeamPage && (
                  <p>
                    <a className="hover:text-accent-a transition-colors" href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </p>
                )}
                <p>{location}</p>
                <p><a className="hover:text-accent-a transition-colors" href="#">Office</a></p>
              </div>
            </section>

            {/* Newsletter */}
            {showNewsletter && (
              <section aria-label="Newsletter" className="space-y-3">
                <h3 className="font-serif text-base tracking-[0.05em] text-[#E6E9EF]">Newsletter</h3>
                <form className="space-y-2" onSubmit={handleSubscribe} noValidate>
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    aria-label="Email address"
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? 'newsletter-error' : undefined}
                    placeholder="you@example.com"
                    className="w-full rounded-md bg-black/30 border border-accent-a/30 px-3 py-2 text-sm text-[#E6E9EF] placeholder:text-[#BFC6D1] focus:outline-none focus:ring-2 focus:ring-accent-a"
                  />
                  {showEmailError && (
                    <p id="newsletter-error" className="text-xs text-accent-a/90">Please enter a valid email.</p>
                  )}
                  <button
                    type="submit"
                    disabled={!newsletterEnabled}
                    title={!newsletterEnabled ? 'Coming soon' : undefined}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-disabled={!newsletterEnabled}
                  >
                    Subscribe
                  </button>
                  {!newsletterEnabled && (
                    <p className="text-xs text-[#BFC6D1]">Subscriptions not enabled yet.</p>
                  )}
                </form>
              </section>
            )}
            {/* Compact contact form */}
            <section aria-label="Quick message" className="space-y-3">
              <h3 className="font-serif text-base tracking-[0.05em] text-[#E6E9EF]">Quick message</h3>
              {contactStatus === 'sent' ? (
                <div className="text-sm text-emerald-400">Thanks—your message was sent.</div>
              ) : (
                <form className="space-y-2" onSubmit={submitCompactContact}>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={contactName} onChange={(e)=>setContactName(e.target.value)} required placeholder="Name"
                      className="w-full rounded-md bg-black/30 border border-accent-a/30 px-3 py-2 text-sm text-[#E6E9EF] placeholder:text-[#BFC6D1] focus:outline-none focus:ring-2 focus:ring-accent-a" />
                    <input value={contactFrom} onChange={(e)=>setContactFrom(e.target.value)} required type="email" placeholder="Email"
                      className="w-full rounded-md bg-black/30 border border-accent-a/30 px-3 py-2 text-sm text-[#E6E9EF] placeholder:text-[#BFC6D1] focus:outline-none focus:ring-2 focus:ring-accent-a" />
                  </div>
                  <textarea value={contactMsg} onChange={(e)=>setContactMsg(e.target.value)} required placeholder="Message" rows={2}
                    className="w-full rounded-md bg-black/30 border border-accent-a/30 px-3 py-2 text-sm text-[#E6E9EF] placeholder:text-[#BFC6D1] focus:outline-none focus:ring-2 focus:ring-accent-a" />
                  {contactStatus === 'error' && <div className="text-xs text-red-400">{contactError}</div>}
                  <button type="submit" className="btn-primary w-full justify-center" disabled={contactStatus==='sending'}>
                    {contactStatus==='sending' ? 'Sending…' : 'Send'}
                  </button>
                </form>
              )}
            </section>
          </div>

          {/* Divider */}
          <div className="mt-10 border-t border-accent-a/20" />

          {/* Bottom row: Legal + Utilities */}
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-sm text-[#BFC6D1] flex flex-wrap items-center gap-3">
              <span>© {year} Aria. All rights reserved.</span>
              <span className="hidden md:inline text-white/20">|</span>
              <Link href="/privacy" className="hover:text-accent-a transition-colors">Privacy</Link>
              <span className="hidden md:inline text-white/20">|</span>
              <Link href="/terms" className="hover:text-accent-a transition-colors">Terms</Link>
            </div>
            <div className="flex items-center gap-3">
              {!isTeamPage && (
                <>
                  <Link href="https://www.linkedin.com/company/aria" aria-label="LinkedIn" className="p-2 rounded-md hover:text-accent-a focus:outline-none focus:ring-2 focus:ring-accent-a transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </Link>
                  <Link href="#" aria-label="X" className="p-2 rounded-md hover:text-accent-a focus:outline-none focus:ring-2 focus:ring-accent-a transition-colors">
                    <Twitter className="w-4 h-4" />
                  </Link>
                </>
              )}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className="ml-2 inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md border border-accent-a/40 hover:shadow-[0_0_12px_rgba(201,166,53,0.25)] hover:border-accent-a/60 focus:outline-none focus:ring-2 focus:ring-accent-a"
              >
                Back to top <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
