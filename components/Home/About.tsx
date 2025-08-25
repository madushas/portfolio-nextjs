"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import MyImage from "@/public/images/me.webp";
import { m, useScroll, useTransform } from "framer-motion";
import Certificates from "@/components/Home/Certifications";

const stats = [
  { label: "Coding Since", value: "2013" },
  { label: "Projects", value: "8+" },
  { label: "Clients", value: "6+" },
  { label: "Professional Certifications", value: <Certificates /> },
];

export default function About(
  props: Readonly<React.HTMLProps<HTMLDivElement>>,
) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 200], [0, -50]);
  const x1 = useTransform(scrollY, [0, 200], [0, -50]);

  return (
  <section className="relative py-16" {...props}>
      <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
        <div className="relative sm:py-16 lg:py-0">
          <m.div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
            style={{ y: y1, x: x1 }}
          >
            <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-accent/40 lg:right-72" />
            <m.svg
              className="absolute top-8 left-1/2 -ml-3 lg:top-12 lg:-right-8 lg:left-auto"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-secondary"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={392}
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
              />
            </m.svg>
          </m.div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20">
            <figure className="relative mx-auto mb-12 aspect-[4/5] overflow-hidden rounded-[var(--r-3)] border border-border bg-muted shadow-sm md:mx-4">
              <Image
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                src={MyImage}
                alt="Portrait of Madusha Sandaruwan"
                fill
                priority
              />
              {/* Stronger theme-aware bottom gradient for better contrast */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.8)] to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 space-y-4 px-6 py-6">
                <div className="inline-flex items-center gap-2 rounded-[var(--r-1)] bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-xs font-medium text-primary">
                  <MapPin className="h-4 w-4" />
                  Colombo, Sri Lanka
                </div>
                <blockquote className="rounded-[var(--r-2)] bg-[hsl(var(--background)/0.95)] border border-border p-4 text-sm leading-relaxed text-foreground md:text-base shadow-sm">
                  <p>
                    Building things for the web started as a curiosity. It&apos;s become my way of exploring
                    ideas and solving puzzles. Every project is a new story—a chance to turn imagination into
                    something real and useful.
                  </p>
                  <footer className="mt-3 text-sm font-semibold text-foreground">Madusha Sandaruwan</footer>
                </blockquote>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="relative mx-auto max-w-md px-4 py-4 sm:max-w-3xl sm:px-6 lg:px-0">
          <div className="mt-4 md:mt-8 lg:mt-12">
            <h2 className="text-foreground font-semibold tracking-tight text-3xl md:text-5xl mb-6">About Me</h2>
            <div className="text-accent-foreground mt-8 space-y-6 text-base leading-7">
              <p>
                Long before I wrote my first line of code, I was lost in books
                about history and philosophy. I didn&apos;t know it then, but they
                were teaching me about systems, how small decisions can lead to
                huge consequences, and how the strongest empires, arguments, and
                structures are always built on a solid foundation.
              </p>
              <p>
                When I discovered programming, it felt strangely familiar. Here
                was another way to build worlds, to design systems with their
                own rules and logic. That&apos;s the perspective I bring to my work
                today. I care about architecture and design because I know that
                strong foundations are what allow things to grow and last. For
                me, the most interesting challenges are the ones that require
                not just technical skill, but a deep and curious look at the
                problem itself.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:[&>li]:min-w-[10rem]">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="group relative overflow-hidden rounded-[var(--r-2)] border border-border bg-card px-4 py-5 transition md:px-5 md:py-6"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-primary/30 opacity-70" />
                  <p className="text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground/80 md:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-none text-foreground md:text-3xl">
                    {stat.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
