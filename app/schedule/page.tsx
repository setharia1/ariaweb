import Section from '@/components/Section';

export default function SchedulePage() {
  const url = process.env.NEXT_PUBLIC_SCHEDULER_URL || 'https://calendly.com/your-org/intro-call';
  return (
    <Section className="pt-24 md:pt-32">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl md:text-5xl t-strong mb-4">Schedule a Call</h1>
        <p className="t-muted max-w-2xl mx-auto">Pick a time that works for you directly on our calendar.</p>
      </div>
      <div className="card p-2 glowable">
        <iframe src={url} title="Scheduler" className="w-full h-[70vh] rounded-xl border-0" />
      </div>
    </Section>
  );
}


