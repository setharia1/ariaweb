'use client';

import Section from '@/components/Section';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PORTFOLIO, type PortfolioItem } from '@/data/portfolio';
import { X } from 'lucide-react';

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-white/85 bg-white/5 ring-1 ring-white/10 tooltip" data-tooltip={label}>
      {label}
    </span>
  );
}

function FilterChip({ label, value, options, onChange }: { label: string; value: string | null; options: string[]; onChange: (v: string | null) => void }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white/70">{label}:</span>
      <div className="flex items-center gap-1">
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(value === opt ? null : opt)}
            className={`px-3 py-1 rounded-lg border ${value === opt ? 'border-accent-a/50 text-accent-a bg-accent-a/10' : 'border-white/15 text-white/80 hover:text-accent-a'}`}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

function CaseModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative max-w-2xl w-full rounded-2xl surface border-subtle p-6 md:p-8 text-left">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-2 text-white/70 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-20 h-12 rounded-md ring-1 ring-white/10 bg-gradient-to-br from-white/5 to-navy/20 overflow-hidden">
            <Image src={item.logo} alt={`${item.name} logo`} fill sizes="80px" className="object-contain p-2" />
          </div>
          <div>
            <h3 className="font-serif text-xl t-strong clamp-1">{item.headline || item.name}</h3>
            {item.year && <p className="text-xs text-white/60">{item.year} • {item.sector}</p>}
          </div>
        </div>
        <p className="t-muted text-sm mb-4">{item.overview || item.summary}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-sm">
          {item.role && <div className="card p-3"><strong className="text-white/80">Our role</strong><div className="text-white/70">{item.role}</div></div>}
          {item.metrics?.slice(0,3).map(m => (
            <div key={m.label} className="card p-3"><strong className="text-white/80">{m.label}</strong><div className="text-white/70">{m.value}</div></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Visit site</a>}
          <a href="/contact" className="btn-ghost">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [type, setType] = useState<string | null>(params.get('type'));
  const [sector, setSector] = useState<string | null>(params.get('sector'));
  const [status, setStatus] = useState<string | null>(params.get('status'));
  const [open, setOpen] = useState<string | null>(params.get('case'));

  // Sync URL when filters/dialog change
  useEffect(() => {
    const q = new URLSearchParams();
    if (type) q.set('type', type);
    if (sector) q.set('sector', sector);
    if (status) q.set('status', status);
    if (open) q.set('case', open);
    const query = q.toString();
    router.replace(`/portfolio${query ? `?${query}` : ''}`);
  }, [type, sector, status, open, router]);

  const withPlaceholders: PortfolioItem[] = useMemo(() => {
    const base = PORTFOLIO;
    if (base.length >= 4) return base;
    return [
      ...base,
      {
        name: 'Coming soon',
        summary: 'New partnership in progress.',
        logo:
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"><rect width="400" height="225" fill="%230A1A3C"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23C9A635" font-family="Inter,Arial" font-size="18">Coming soon</text></svg>',
        impact: 'Confidential',
        status: 'Coming soon',
        type: 'Partner',
        sector: 'TBD'
      }
    ];
  }, []);

  const filtered = useMemo(() => {
    return withPlaceholders.filter((c) =>
      (!type || c.type === type) && (!sector || c.sector === sector) && (!status || c.status === status)
    );
  }, [withPlaceholders, type, sector, status]);

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-5xl t-strong mb-6">
            Portfolio
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-base md:text-lg">
            Our diverse portfolio spans multiple asset classes and sectors, 
            reflecting our commitment to thoughtful diversification and 
            long-term value creation.
          </p>
        </div>
      </Section>

      <Section>
        {/* Stat bar under heading */}
        <div className="max-w-5xl mx-auto mb-6 text-center text-sm text-white/70">
          2 active | 1 in pipeline | $100K AUM exposure
        </div>

        {/* Filters */}
        <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-2 items-center">
          <FilterChip label="Type" value={type} options={["Operator-Built","Partner","Public"]} onChange={setType} />
          <FilterChip label="Sector" value={sector} options={["Consumer","SaaS","Media","TBD"]} onChange={setSector} />
          <FilterChip label="Status" value={status} options={["Active","Exited","Coming soon"]} onChange={setStatus} />
          {(type || sector || status) && (
            <button onClick={() => { setType(null); setSector(null); setStatus(null); }} className="ml-auto text-sm text-white/80 hover:text-accent-a underline">
              Reset filters
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-white/70 py-10">No results. Adjust filters above.</div>
          )}
          {filtered.map((c) => (
            <article key={c.name} className="card p-4 md:p-5 glowable group h-full will-change-transform relative overflow-hidden"
              style={{ perspective: 1000 }}>
              <div className="relative aspect-video rounded-lg mb-3 md:mb-4 overflow-hidden transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-[0.25deg] bg-gradient-to-br from-white/5 to-navy/20 ring-1 ring-white/10">
                <Image src={c.logo} alt={`${c.name} logo`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain p-6" />
              </div>
              <h3 className="font-serif text-base md:text-lg t-strong mb-1 clamp-1">{c.name}</h3>
              <p className="t-muted text-sm clamp-2">{c.summary}</p>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {c.type && <Badge label={c.type} />}
                {c.sector && <Badge label={c.sector} />}
                {c.status && <Badge label={c.status} />}
              </div>

              {/* Hover CTA glow */}
              <button onClick={() => setOpen(c.name)} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-a text-sm mt-3 underline underline-offset-4">
                View case
              </button>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-accent-a/0 group-hover:ring-accent-a/25 transition-all" />
            </article>
          ))}
        </div>
      </Section>

      {/* Detail Modal */}
      {open && (
        <CaseModal item={withPlaceholders.find(i => i.name === open)!} onClose={() => setOpen(null)} />)
      }
    </>
  );
}


