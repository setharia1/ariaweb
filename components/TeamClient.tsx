'use client';

import Section from '@/components/Section';
import WaveDivider from '@/components/WaveDivider';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  photo?: string;
  specialization?: string; // comma-separated focus areas
  years?: string; // e.g., '20+ yrs'
  linkedin?: string; // optional
  email?: string; // optional, shown in modal only
};

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

export default function TeamClient() {
  const team: TeamMember[] = [
    {
      name: 'Seth Liassides',
      title: 'Investing Partner',
      bio: 'Investing partner at Aria focused on operator‑built products and founder partnerships at pre‑seed and seed. Works hands‑on with teams on product, distribution, and monetization; leads diligence on revenue models and go‑to‑market.',
      photo: undefined,
      specialization: 'Product, Distribution, Monetization',
      years: undefined,
      linkedin: '#',
      email: 'invest@aria.capital',
    },
    {
      name: 'Marcus Liassides',
      title: 'Founder & Investing Partner',
      bio: 'Founder & operator with 20+ years in digital media and TV. Founded Inuk Networks (Freewire IPTV; acquired by Move Networks), served as CEO of Move Networks (adaptive bitrate streaming), and held leadership roles at Specific Media/Viant, Xumo, and Sorenson Media. Focused on product, distribution, and monetization.',
      photo: '/team/IMG_2093.jpg',
      specialization: 'Media Technology, Distribution, Operations',
      years: '20+ yrs',
      linkedin: '#',
      email: 'invest@aria.capital',
    },
  ];

  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState<string | null>(params.get('member'));

  useEffect(() => {
    const current = params.get('member');
    setOpen(current);
  }, [params]);

  const handleOpen = (slug: string) => {
    const q = new URLSearchParams(params.toString());
    q.set('member', slug);
    router.replace(`/team?${q.toString()}`);
  };
  const handleClose = () => {
    const q = new URLSearchParams(params.toString());
    q.delete('member');
    router.replace(`/team${q.toString() ? `?${q.toString()}` : ''}`);
  };

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  } as const;

  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Our Team
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            Our leadership team brings together decades of experience 
            in investment management, operational excellence, and strategic thinking.
          </p>
        </div>
        <WaveDivider className="mt-2" />
      </Section>

      <Section>
        {/* Floating orbs background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-orb purple w-48 h-48 top-8 left-6" />
          <div className="hero-orb gold w-56 h-56 bottom-10 right-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, idx) => {
            const slug = toSlug(member.name);
            return (
              <motion.article
                key={member.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                variants={variants}
                className="card p-6 glowable group relative overflow-hidden h-full focus-within:ring-2 focus-within:ring-accent-a"
                role="button"
                tabIndex={0}
                onClick={() => handleOpen(slug)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(slug); } }}
              >
                {/* Headshot / initials */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 ring-1 ring-accent-a/30 relative">
                  <div className="absolute inset-0 rounded-full p-[2px]" style={{ background: 'linear-gradient(135deg, rgba(75,0,130,0.6), rgba(201,166,53,0.6))' }} />
                  <div className="absolute inset-[2px] rounded-full bg-black/40 backdrop-blur-sm" />
                  <div className="absolute inset-[2px] rounded-full overflow-hidden flex items-center justify-center">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={`Headshot of ${member.name}`}
                        width={96}
                        height={96}
                        sizes="96px"
                        className="object-cover w-full h-full"
                        priority={idx < 2}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-royal/30 to-accent-a/20 text-white/90">
                        <span className="text-xl font-semibold">{getInitials(member.name)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl t-strong mb-1 clamp-1">{member.name}</h3>
                <p className="text-royal text-sm mb-2">{member.title}</p>
                <p className="t-muted text-sm clamp-2">{member.bio}</p>

                {/* Chips */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {member.specialization?.split(',').map((s) => (
                    <span key={s.trim()} className="px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
                      {s.trim()}
                    </span>
                  ))}
                  {member.years && <span className="px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">{member.years}</span>}
                </div>

                {/* Socials on hover (email kept in modal) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-4 flex items-center justify-center gap-3">
                  {member.linkedin && (
                    <a href={member.linkedin} className="tooltip" data-tooltip="LinkedIn" aria-label={`${member.name} LinkedIn`} onClick={(e) => e.stopPropagation()}>
                      <Linkedin className="w-5 h-5 text-white/80" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </Section>

      {open && (
        <ProfileModal member={team.find(m => toSlug(m.name) === open)!} onClose={handleClose} />
      )}
    </>
  );
}

function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); (last as HTMLElement).focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); (first as HTMLElement).focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.activeElement as HTMLElement | null;
    setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button, a')?.focus(), 0);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus(); };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="profile-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div ref={dialogRef} className="relative max-w-2xl w-full rounded-2xl surface border-subtle p-6 md:p-8 text-left">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-2 text-white/70 hover:text-white ring-1 ring-white/10 rounded-md">
          ✕
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-24 h-24 rounded-full ring-1 ring-accent-a/30 overflow-hidden">
            {member.photo ? (
              <Image src={member.photo} alt={`Headshot of ${member.name}`} fill sizes="96px" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-royal/30 to-accent-a/20 text-white/90">
                <span className="text-2xl font-semibold">{getInitials(member.name)}</span>
              </div>
            )}
          </div>
          <div>
            <h3 id="profile-title" className="font-serif text-2xl t-strong">{member.name}</h3>
            <p className="text-royal">{member.title}</p>
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <p className="t-muted">{member.bio}</p>
          {member.specialization && (
            <div>
              <strong className="text-white/85">Focus areas</strong>
              <ul className="list-disc ml-4 mt-2 text-white/80">
                {member.specialization.split(',').map(s => <li key={s.trim()}>{s.trim()}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {member.linkedin && <a href={member.linkedin} className="btn-ghost">LinkedIn</a>}
          {member.email && <a href={`mailto:${member.email}`} className="btn-primary">Email</a>}
        </div>
      </div>
    </div>
  );
}


