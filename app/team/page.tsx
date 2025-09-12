import Section from '@/components/Section';

export default function TeamPage() {
  const team = [
    {
      name: 'Seth Liassides',
      title: 'Co‑Founder & Investing Partner',
      bio: 'Co‑founder of Aria. Experienced across investing and company building.',
      // Add a photo for Seth here if/when available, e.g. '/team/seth.jpg'
      photo: undefined as unknown as string | undefined,
    },
    {
      name: 'Marcus Liassides',
      title: 'Founder & Investing Partner',
      bio: 'Seasoned operator and investor supporting Aria’s growth.',
      // Headshot stored in public/team/IMG_2093.jpg
      photo: '/team/IMG_2093.jpg',
    }
  ];
  return (
    <>
      <Section className="pt-32">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl t-strong mb-6">
            Our Team
          </h1>
          <p className="t-muted max-w-3xl mx-auto text-lg">
            Our leadership team brings together decades of experience 
            in investment management, operational excellence, and strategic thinking.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div key={member.name} className="card p-6 glowable text-center">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`${member.name} headshot`}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-accent-a/20 to-accent-b/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
              )}
              <h3 className="font-serif text-xl t-strong mb-2">
                {member.name}
              </h3>
              <p className="text-accent-a text-sm mb-3">
                {member.title}
              </p>
              <p className="t-muted text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
