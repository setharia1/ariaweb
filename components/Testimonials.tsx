import Section from '@/components/Section';
import { TESTIMONIALS } from '@/data/testimonials';

export default function Testimonials() {
  if (!TESTIMONIALS?.length) return null;
  return (
    <Section className="pt-6" containerClassName="max-w-5xl">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl t-strong">What partners say</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TESTIMONIALS.slice(0, 4).map((t) => (
          <figure key={t.name} className="matte-card p-5">
            <blockquote className="text-white/85">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-white/70">
              <span className="font-medium text-white/90">{t.name}</span>
              {t.role ? `, ${t.role}` : ''}
              {t.company ? ` · ${t.company}` : ''}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}


