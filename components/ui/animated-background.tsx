"use client";
import React from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { m, RepeatType, easeInOut } from "framer-motion";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Animation config: disable or simplify if reduced motion is preferred
  const leftAnimate = prefersReducedMotion ? { x: 0 } : { x: [0, xOffset, 0] };
  const rightAnimate = prefersReducedMotion ? { x: 0 } : { x: [0, -xOffset, 0] };
  const leftTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration, repeat: Infinity, repeatType: "reverse" as RepeatType, ease: easeInOut };
  const rightTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration, repeat: Infinity, repeatType: "reverse" as RepeatType, ease: easeInOut };
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ willChange: "opacity" }}
    >
      <m.div
        animate={leftAnimate}
        transition={leftTransition}
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
            willChange: "transform, opacity",
          }}
          className={`absolute top-0 left-0`}
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
            willChange: "transform, opacity",
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
            willChange: "transform, opacity",
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
      </m.div>
      <m.div
        animate={rightAnimate}
        transition={rightTransition}
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
            willChange: "transform, opacity",
          }}
          className={`absolute top-0 right-0`}
        />
        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
            willChange: "transform, opacity",
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
            willChange: "transform, opacity",
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
      </m.div>
    </m.div>
  );
};

export default Spotlight;