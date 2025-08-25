"use client";

import { SiFacebook, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import { HTMLProps, useEffect, useState } from "react";
import { IconBaseProps } from "react-icons/lib";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/madusha.kv", icon: (p: IconBaseProps) => <SiFacebook {...p} /> },
  { name: "Twitter", href: "https://twitter.com/_MadushaS", icon: (p: IconBaseProps) => <SiX {...p} /> },
  { name: "GitHub", href: "https://github.com/MadushaS", icon: (p: IconBaseProps) => <SiGithub {...p} /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/madushasandaruwan/", icon: (p: IconBaseProps) => <SiLinkedin {...p} /> },
];

const year = new Date().getFullYear().toString();

export default function Footer(props: Readonly<HTMLProps<HTMLDivElement>>) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="mt-[var(--sp-9)] border-t border-border bg-card" {...props}>
      <div className="container py-[var(--sp-7)]">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 font-mono text-xl font-black text-primary">://madusha</div>
            <p className="readable text-sm text-muted-foreground">
              Software engineer focused on systems and architecture. Building clean, resilient products.
            </p>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">Navigation</h4>
            <nav className="grid gap-2 text-sm text-muted-foreground">
              <Link href="#home">Home</Link>
              <Link href="#services">What I do</Link>
              <Link href="#projects">Projects</Link>
              <Link href="#toparticles">Blog</Link>
              <Link href="#contact">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">Contact</h4>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <a href="mailto:work@madusha.dev">work@madusha.dev</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">Social</h4>
            <div className="flex gap-3">
              {socials.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full p-2 text-foreground transition-colors hover:bg-accent"
                  target="_blank"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">&copy; {year} Madusha Sandaruwan. All rights reserved.</p>
          <div className="text-xs text-muted-foreground">Made with care, measured twice.</div>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 rounded-full border border-border bg-card px-3 py-2 text-sm shadow-sm transition-all ${showTop ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        Top
      </button>
    </footer>
  );
}
