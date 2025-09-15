"use client";

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface VideoHeroProps {
  className?: string;
  /** Path under /public to your mp4/webm video. Default: /media/aria-hero.mp4 */
  src?: string;
  /** Optional poster image path under /public shown before the first frame. */
  poster?: string;
}

/**
 * Crossfading hero video that seamlessly loops by blending the end of one
 * playback with the start of the next. Implemented with two stacked videos
 * that alternate visibility and play states.
 */
export default function VideoHero({ className = '', src = '/media/aria-hero.mp4', poster }: VideoHeroProps) {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState<'a' | 'b'>('a');
  const isCrossfadingRef = useRef(false);

  // Fade timing (seconds and ms)
  const FADE_SECONDS = 0.6;
  const FADE_MS = 600;

  useEffect(() => {
    const primary = videoARef.current;
    if (!primary) return;
    const startPlayback = () => {
      primary.currentTime = 0;
      primary.play().catch(() => {});
    };
    if (primary.readyState >= 2) {
      startPlayback();
    } else {
      primary.addEventListener('loadeddata', startPlayback, { once: true });
    }
  }, []);

  // Crossfade near the end of the active video
  useEffect(() => {
    const getEls = () => ({
      activeEl: active === 'a' ? videoARef.current : videoBRef.current,
      otherEl: active === 'a' ? videoBRef.current : videoARef.current,
    });

    const handleTimeUpdate = () => {
      const { activeEl, otherEl } = getEls();
      if (!activeEl || !otherEl) return;
      const duration = activeEl.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const remaining = duration - activeEl.currentTime;
      if (!isCrossfadingRef.current && remaining <= FADE_SECONDS) {
        isCrossfadingRef.current = true;
        try {
          otherEl.currentTime = 0;
          otherEl.play().catch(() => {});
        } catch {}
        window.setTimeout(() => {
          setActive((prev) => (prev === 'a' ? 'b' : 'a'));
          // Prepare the previous active for the next cycle
          try {
            activeEl.pause();
            activeEl.currentTime = 0;
          } catch {}
          isCrossfadingRef.current = false;
        }, FADE_MS);
      }
    };

    const { activeEl } = getEls();
    if (!activeEl) return;
    activeEl.addEventListener('timeupdate', handleTimeUpdate);
    return () => activeEl.removeEventListener('timeupdate', handleTimeUpdate);
  }, [active]);

  return (
    <section className={clsx('py-12 md:py-16', className)} aria-label="Hero video">
      <div className="px-0 relative">
        <div className="relative overflow-hidden bg-black/50 aspect-[16/9] md:rounded-3xl">
          {/* Masked layer that fades top/bottom edges of the video content */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            }}
          >
            {/* Video A */}
            <video
              ref={videoARef}
              className={clsx(
                'absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity',
                active === 'a' ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              src={src}
              poster={poster}
              muted
              playsInline
              autoPlay
              preload="auto"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              aria-hidden="true"
            />

            {/* Video B (used for crossfade) */}
            <video
              ref={videoBRef}
              className={clsx(
                'absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity',
                active === 'b' ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              src={src}
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              aria-hidden="true"
            />
          </div>

          {/* Stronger vertical fades to blend top/bottom edges into surrounding sections */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-44 bg-gradient-to-b from-black/90 via-black/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 md:h-48 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

          {/* Subtle vignette and edge sheen to match site aesthetic */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 md:rounded-3xl" />
        </div>
        {/* Soft bottom glow bleed to blend into next section */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-8 md:-bottom-10 h-20 md:h-28 bg-gradient-to-b from-black/40 via-black/20 to-transparent blur-md" />
      </div>
    </section>
  );
}


