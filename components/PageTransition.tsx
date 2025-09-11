"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function getAnimation(pathname: string) {
  // Subtle, route‑specific page animations
  if (pathname.startsWith("/about")) {
    return {
      variants: {
        initial: { opacity: 0, y: 16 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -12 },
      },
      transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.28 },
    };
  }

  if (pathname.startsWith("/investment-approach")) {
    return {
      variants: {
        initial: { opacity: 0, scale: 0.98, y: 6 },
        in: { opacity: 1, scale: 1, y: 0 },
        out: { opacity: 0, scale: 0.985, y: -6 },
      },
      transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.3 },
    };
  }

  if (pathname.startsWith("/portfolio")) {
    return {
      variants: {
        initial: { opacity: 0, x: 24 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -12 },
      },
      transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.28 },
    };
  }

  if (pathname.startsWith("/stewardship")) {
    return {
      variants: {
        initial: { opacity: 0, x: -24 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: 12 },
      },
      transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.28 },
    };
  }

  if (pathname.startsWith("/insights")) {
    return {
      variants: {
        initial: { opacity: 0, filter: "blur(8px)", y: 8 },
        in: { opacity: 1, filter: "blur(0px)", y: 0 },
        out: { opacity: 0, filter: "blur(4px)", y: -8 },
      },
      transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.32 },
    };
  }

  if (pathname.startsWith("/team")) {
    return {
      variants: {
        initial: { opacity: 0, scale: 0.97 },
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 0.99 },
      },
      transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.26 },
    };
  }

  // Default
  return {
    variants: {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 },
    },
    transition: { type: "tween" as const, ease: [0.16, 1, 0.3, 1], duration: 0.25 },
  };
}

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { variants, transition } = getAnimation(pathname || "/");

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
