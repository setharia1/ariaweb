import clsx from 'clsx';

interface VideoHeroProps {
  className?: string;
  /** Path under /public to your mp4/webm video. Default: /media/aria-hero.mp4 */
  src?: string;
  /** Optional poster image path under /public shown before the first frame. */
  poster?: string;
}

export default function VideoHero({ className = '', src = '/media/aria-hero.mp4', poster }: VideoHeroProps) {
  return (
    <section className={clsx('py-12 md:py-16', className)} aria-label="Hero video">
      <div className="px-0">
        <div className="relative overflow-hidden bg-black/50 aspect-[16/9] md:rounded-3xl">
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={src}
            poster={poster}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            aria-hidden="true"
          />

          {/* Subtle vignette and edge sheen to match site aesthetic */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 md:rounded-3xl" />
        </div>
      </div>
    </section>
  );
}


