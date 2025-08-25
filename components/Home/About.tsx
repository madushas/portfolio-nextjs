"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import MyImage from "@/public/images/me.jpg";
import { m, useScroll, useTransform } from "framer-motion";
import Certificates from "@/components/Home/Certifications";

const stats = [
  { label: "Coding Since", value: "2013" },
  { label: "Completed Projects", value: "8+" },
  { label: "Satisfied Clients", value: "6+" },
  { label: "Professional Certifications", value: <Certificates /> },
];

export default function About(
  props: Readonly<React.HTMLProps<HTMLDivElement>>,
) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 200], [0, -50]);
  const y2 = useTransform(scrollY, [0, 200], [0, 50]);
  const x1 = useTransform(scrollY, [0, 200], [0, -50]);
  const x2 = useTransform(scrollY, [0, 200], [0, 50]);

  return (
    <section className="relative py-8" {...props}>
      <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
        <div className="relative sm:py-16 lg:py-0">
          <m.div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
            style={{ y: y1, x: x1 }}
          >
            <div className="bg-popover absolute inset-y-0 right-1/2 w-full rounded-r-3xl lg:right-72" />
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
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-16">
            <div className="relative mx-auto mb-16 aspect-[4/5] overflow-hidden rounded-2xl shadow-xl md:mx-4">
              <Image
                className="absolute inset-0 h-full w-full object-cover object-center"
                src={MyImage}
                alt="Profile picture"
                fill
                priority
              />
              <div className="bg-primary absolute inset-0 mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-600 via-slate-600 opacity-70 dark:from-slate-800 dark:via-slate-800" />
              <div className="absolute right-0 bottom-0 left-0 z-10 px-8 pb-8">
                <div className="flex items-center text-white">
                  <MapPin className="h-8 w-8" />
                  Colombo, Sri Lanka
                </div>
                <blockquote className="my-4">
                  <div className="relative text-lg font-medium text-white md:grow">
                    <p className="relative text-white">
                      Building things for the web started as a curiosity. It’s
                      become my way of exploring ideas and solving puzzles.
                      Every project is a new story, a chance to turn imagination
                      into something real and useful.
                    </p>
                  </div>
                  <footer className="mt-2">
                    <p className="text-base font-semibold text-slate-100">
                      Madusha Sandaruwan
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-md px-4 py-4 sm:max-w-3xl sm:px-6 lg:px-0">
          <div className="mt-12 md:mt-16 lg:mt-20">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              About Me
            </h2>
            <div className="text-accent-foreground mt-6 space-y-6">
              <p className="text-base leading-7">
                Long before I wrote my first line of code, I was lost in books
                about history and philosophy. I didn't know it then, but they
                were teaching me about systems, how small decisions can lead to
                huge consequences, and how the strongest empires, arguments, and
                structures are always built on a solid foundation.
              </p>
              <p className="text-base leading-7">
                When I discovered programming, it felt strangely familiar. Here
                was another way to build worlds, to design systems with their
                own rules and logic. That’s the perspective I bring to my work
                today. I care about architecture and design because I know that
                strong foundations are what allow things to grow and last. For
                me, the most interesting challenges are the ones that require
                not just technical skill, but a deep and curious look at the
                problem itself.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-accent border-t-2 pt-6">
                  <dt className="text-accent-foreground text-base font-medium">
                    {stat.label}
                  </dt>
                  <dd className="text-muted-foreground text-3xl font-extrabold tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
