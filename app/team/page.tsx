import Section from '@/components/Section';
import Image from 'next/image';
 

export default function TeamPage() {
  const team = [
    {
      name: 'Seth Liassides',
      title: 'Investing Partner',
      bio: 'Investing partner at Aria focused on operator‑built products and founder partnerships at pre‑seed and seed. Works hands‑on with teams on product, distribution, and monetization; leads diligence on revenue models and go‑to‑market.',
      // Add a photo for Seth here if/when available, e.g. '/team/seth.jpg'
      photo: undefined as unknown as string | undefined,
      specialization: 'Product, distribution, monetization',
    },
    {
      name: 'Marcus Liassides',
      title: 'Founder & Investing Partner',
      bio: 'Founder & operator with 20+ years in digital media and TV. Founded Inuk Networks (Freewire IPTV; acquired by Move Networks), served as CEO of Move Networks (adaptive bitrate streaming), and held leadership roles at Specific Media/Viant, Xumo, and Sorenson Media. Focused on product, distribution, and monetization.',
      // Headshot stored in public/team/IMG_2093.jpg
      photo: '/team/IMG_2093.jpg',
      specialization: 'Media technology, distribution, operations',
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
            <div key={member.name} className="card p-6 glowable text-center group relative overflow-hidden">
              {member.photo ? (
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={member.photo}
                    alt={`${member.name} headshot`}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
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
