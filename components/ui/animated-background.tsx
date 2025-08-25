// animated-background.tsx (updated storytelling version)
"use client";
import React from "react";
import { m, easeInOut, RepeatType } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const Spotlight = ({
  translateY = -400,
  width = 560,
  smallWidth = 240,
  duration = 7,
  xOffset = 120,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animateLeft = prefersReducedMotion ? { x: 0 } : { x: [0, xOffset, 0] };
  const animateRight = prefersReducedMotion
    ? { x: 0 }
    : { x: [0, -xOffset, 0] };
  const transitionConfig = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration,
        repeat: Infinity,
        repeatType: "reverse" as RepeatType,
        ease: easeInOut,
      };

  return (
    <m.div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Left gradients */}
      <m.div className="pointer-events-none absolute inset-0 z-30">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-5" />
      </m.div>

      <m.div
        animate={animateLeft}
        transition={transitionConfig}
        className="absolute top-0 left-0 h-screen w-screen"
      >
        <div
          className="absolute top-0 left-0 rounded-full"
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            width,
            height: 1380,
            background:
              "radial-gradient(70% 70% at 55% 30%, hsl(var(--primary) / 0.08), transparent 80%)",
          }}
        />
        <div
          className="absolute top-0 left-0 rounded-full"
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            width: smallWidth,
            height: 1380,
            background:
              "radial-gradient(60% 60% at 50% 50%, hsl(var(--accent) / 0.07), transparent 100%)",
          }}
        />
      </m.div>

      {/* Right gradients */}
      <m.div
        animate={animateRight}
        transition={transitionConfig}
        className="absolute top-0 right-0 h-screen w-screen"
      >
        <div
          className="absolute top-0 right-0 rounded-full"
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            width,
            height: 1380,
            background:
              "radial-gradient(70% 70% at 55% 30%, hsl(var(--primary) / 0.08), transparent 80%)",
          }}
        />
        <div
          className="absolute top-0 right-0 rounded-full"
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            width: smallWidth,
            height: 1380,
            background:
              "radial-gradient(60% 60% at 50% 50%, hsl(var(--accent) / 0.07), transparent 100%)",
          }}
        />
      </m.div>
    </m.div>
  );
};

export default Spotlight;
