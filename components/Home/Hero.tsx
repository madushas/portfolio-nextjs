// hero.tsx
"use client";
import React, { HTMLProps } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SiLinkedin, SiX, SiGithub } from "react-icons/si";
import HeroImage from "@/public/images/profile.webp";
import Spotlight from "../ui/animated-background";

const socialMedia = [
  {
    text: "LinkedIn",
    url: "https://linkedin.com/in/madushasandaruwan",
    icon: <SiLinkedin size={24} />,
  },
  { text: "GitHub", url: "https://github.com/madushaS/", icon: <SiGithub size={24} /> },
  { text: "X", url: "https://x.com/_MadushaS", icon: <SiX size={24}/> },
];

export default function Hero(props: Readonly<HTMLProps<HTMLDivElement>>) {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 300], [0, -50]);
  const yImage = useTransform(scrollY, [0, 300], [0, 80]);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:pt-32"
      {...props}
      aria-labelledby="hero-heading"
    >
      {/* Animated Background */}
      <Spotlight translateY={-400} xOffset={120} />
      <m.div
        className="z-10 container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10"
        style={{ y: yText }}
      >
        {/* Content */}
        <div className="flex flex-col md:col-span-7 lg:col-span-7 xl:col-span-6">
          <div className="flex flex-col gap-6 md:gap-7">
            {/* Status Badge */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
        <div className="inline-flex items-center gap-2 rounded-none border border-primary bg-[hsl(var(--primary)/0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm md:text-[0.72rem]">
                <div className="relative inline-block h-2 w-2" aria-hidden="true">
          <div className="h-2 w-2 animate-pulse bg-emerald-500" />
                </div>
                <span>Available for Work</span>
              </div>
            </m.div>

            {/* Main Heading */}
            <header className="overflow-hidden">
              <div className="flex flex-col gap-1.5">
                <m.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18, duration: 0.45 }}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-primary/70 md:text-xs"
                >
                  👋 Hello, I&apos;m
                </m.p>
                <m.h1
                  id="hero-heading"
                  initial={{ y: 38, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.7 }}
                  className="text-gradient text-[3.05rem] font-extrabold leading-[1.02] tracking-tight md:text-[3.55rem] lg:text-[4.15rem]"
                >
                  Madusha Sandaruwan
                </m.h1>
                <m.h2
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.55 }}
                  className="relative inline-block max-w-xl text-[1.42rem] font-semibold leading-tight text-foreground/90 md:text-[1.85rem] lg:text-[1.95rem]"
                >
                  <span className="pr-3 font-semibold text-primary">Software Engineer</span>
                  <span className="inline-block h-4 w-px translate-y-0.5 bg-foreground/30 align-middle" aria-hidden="true" />
                  <span className="pl-3 text-foreground/70"><br></br>Systems & Architecture</span>
                  <span className="absolute -bottom-1 left-0 h-px w-20 bg-primary/60" aria-hidden="true" />
                </m.h2>
              </div>
            </header>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.5 }}
              className="max-w-xl text-[1rem] leading-relaxed text-muted-foreground md:text-[1.05rem]"
            >
              I design software systems that survive failure. Resilience, observability & simplicity first—then scale.
            </m.p>

            {/* CTA + Social grouped for alignment */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  shape="square"
                  className="group relative h-auto border border-primary/70 bg-[hsl(var(--primary-solid))] px-9 py-4 text-[0.95rem] font-semibold tracking-wide text-[hsl(var(--primary-foreground))] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-solid-hover))] hover:shadow-md focus-visible:ring-offset-0 md:text-[1rem]"
                  aria-label="View selected software projects"
                >
                  <Link href="#projects">
                    <span className="flex items-center">
                      View My Work
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                    </span>
                  </Link>
                </Button>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-primary/60 bg-[hsl(var(--primary-soft))] px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground/80 shadow-sm transition-all hover:border-primary/70 hover:bg-[hsl(var(--primary))/15] hover:text-foreground md:text-[0.7rem]"
                  aria-label="Open contact section"
                >
                  <Mail className="h-4 w-4 text-primary/90" /> <span>Let&apos;s Talk</span>
                </Link>
              </div>
              <m.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.45 }}
        className="flex gap-2.5"
                aria-label="Social links"
              >
                {socialMedia.map((item) => (
                  <Button
                    key={item.text}
                    asChild
                    variant="outline"
                    size="icon"
                    shape="square"
                    className="group border-primary/30 bg-[hsl(var(--primary-soft))] text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-[hsl(var(--primary-soft))]/70 hover:text-primary"
                  >
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.icon}
                      <span className="sr-only">{item.text}</span>
                    </Link>
                  </Button>
                ))}
              </m.div>
            </m.div>
          </div>
        </div>

        {/* Hero Image */}
        <m.div
          className="relative mx-auto flex items-center justify-center md:col-span-5 lg:col-span-5 xl:col-span-6"
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.85 }}
        >
          <div className="relative">
            {/* Structural frame (square variant) */}
            <div className="absolute -inset-2 animate-pulse-slow border border-primary/25 bg-primary/10 blur-[2px]" aria-hidden="true" />
            {/* Image container */}
            <div className="relative aspect-[4/5] w-[16.5rem] overflow-hidden border border-border/60 shadow-md md:w-[19rem] lg:w-[21rem] xl:w-[23rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 opacity-40 transition-opacity duration-500 hover:opacity-60" />
              <Image
                src={HeroImage}
                alt="Portrait of Madusha Sandaruwan"
                width={352}
                height={440}
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
