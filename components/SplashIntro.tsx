"use client";

import { useEffect, useRef, useState } from "react";

export default function SplashIntro({ src, mobileSrc }: { src: string; mobileSrc?: string }) {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Only once per session
    try {
      const seen = sessionStorage.getItem("splashSeen") === "1";
      if (!seen) setShow(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!show || !videoRef.current) return;

    const video = videoRef.current;
    let fallbackTimer: number | undefined;

    const handleLoaded = () => {
      try {
        video.playbackRate = 2.0; // 200%
      } catch {}
      video.play().catch(() => {});
      // Fallback fade-out in case 'ended' doesn't fire
      const expectedMs = (video.duration ? (video.duration * 1000) / 2 : 6000) + 500;
      fallbackTimer = window.setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          try { sessionStorage.setItem("splashSeen", "1"); } catch {}
          setShow(false);
        }, 700);
      }, expectedMs);
    };

    const handleEnded = () => {
      setFadeOut(true);
      setTimeout(() => {
        try { sessionStorage.setItem("splashSeen", "1"); } catch {}
        setShow(false);
      }, 700);
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("canplay", handleLoaded, { once: true } as any);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded as any);
      video.removeEventListener("ended", handleEnded);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches && mobileSrc ? mobileSrc : src}
        muted
        autoPlay
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
      />
      <button
        type="button"
        onClick={() => {
          setFadeOut(true);
          setTimeout(() => {
            try { sessionStorage.setItem("splashSeen", "1"); } catch {}
            setShow(false);
          }, 700);
        }}
        className="absolute bottom-4 right-4 text-xs px-3 py-2 rounded-md border border-white/30 text-white/80 bg-black/30 backdrop-blur hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-accent-a"
      >
        Skip intro
      </button>
      {/* Soft vignette to blend edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(0,0,0,0.6))]" />
    </div>
  );
}


