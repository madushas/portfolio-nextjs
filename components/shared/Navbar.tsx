"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  section?: string; // id on homepage
  route?: string;   // full route when not on homepage (or always route if no section)
  homepageOnly?: boolean; // hide off home
  cta?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", section: "home", homepageOnly: true },
  { label: "Services", section: "services" },
  { label: "About", section: "about" },
  { label: "Projects", section: "projects" },
  { label: "Blog", section: "toparticles", route: "/blog" },
  { label: "Contact", section: "contact", cta: true },
];

export default function NavBar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsObserved = useRef<Set<string>>(new Set());

  // Smooth scroll for internal section links
  const handleSectionNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!onHome) return; // only intercept on home
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 96; // offset for navbar
    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  }, [onHome]);

  // Observe sections for active state (performance friendly vs scroll loops)
  useEffect(() => {
    if (!onHome) return;
    const ids = NAV_ITEMS.filter(i => i.section).map(i => i.section!);
    const opts: IntersectionObserverInit = { rootMargin: "-60% 0px -35% 0px", threshold: [0, 1] };
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      let lastActive = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id && id !== "contact") lastActive = id;
        }
      });
      // Special handling for contact section: only set active if near bottom
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const atBottom = rect.top < windowHeight && window.scrollY + windowHeight >= document.body.scrollHeight - 10;
        if (atBottom) {
          setActive("contact");
          return;
        }
      }
      if (lastActive) setActive(lastActive);
    }, opts);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && !sectionsObserved.current.has(id)) {
        observerRef.current?.observe(el);
        sectionsObserved.current.add(id);
      }
    });
    return () => observerRef.current?.disconnect();
  }, [onHome]);

  // Floating style toggle
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  // Helper: compute href for nav item
  const computeHref = (item: NavItem): string => {
    if (onHome && item.section) return `#${item.section}`;
    if (item.route) return item.route;
    if (item.section) return `/#${item.section}`;
    return "/";
  };

  // Helper: derive active state
  const isItemActive = (item: NavItem): boolean => {
    const isBlog = item.label === "Blog";
    if (isBlog) return pathname.startsWith("/blog");
    if (onHome && item.section) return active === item.section;
    return false;
  };

  const buildItemClass = (item: NavItem, activeState: boolean): string => {
    const base = "relative px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70";
    if (item.cta) return cn(base, "ml-10 border border-primary bg-[hsl(var(--primary-solid))] text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-[hsl(var(--primary-foreground))] shadow-sm hover:bg-[hsl(var(--primary-solid-hover))]");
    const state = activeState ? "text-foreground" : "text-muted-foreground hover:text-foreground";
    return cn(base, state, "hover:bg-accent");
  };

  return (
    <div
      className={cn(
        "fixed left-1/2 top-3 z-50 -translate-x-1/2 w-full max-w-6xl px-3 sm:px-6",
        "transition-all duration-300"
      )}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <nav
        className={cn(
          // Force completely solid background using theme-aware CSS variables
          "flex items-center gap-8 rounded-none border border-border shadow-sm",
          "![background-color:hsl(var(--background))] !opacity-100 ![backdrop-filter:none]",
          floating ? "py-2.5 pl-5 pr-5" : "py-3.5 pl-6 pr-6"
        )}
        aria-label="Primary"
      >
        {/* Brand */}
  <Link href="/" className="font-mono text-[0.95rem] font-bold tracking-wide text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Home">MADUSHA</Link>

        {/* Desktop Nav */}
  <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.filter(i => !i.homepageOnly || onHome).map(item => {
            const href = computeHref(item);
            const activeState = isItemActive(item);
            const clickHandler = item.section && onHome
              ? (e: React.MouseEvent<HTMLAnchorElement>) => handleSectionNav(e, item.section!)
              : undefined;
            return (
              <li key={item.label}>
                <Link
                  href={href}
                  aria-label={item.label}
                  aria-current={activeState ? "page" : undefined}
                  onClick={clickHandler}
                  className={buildItemClass(item, activeState)}
                >
                  {item.label}
                  {activeState && <span className="absolute left-1/2 top-full mt-1 h-px w-6 -translate-x-1/2 bg-primary" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Controls */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-border bg-secondary text-sm font-medium md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="sr-only">Menu</span>
            <svg
              className={cn("h-5 w-5 transition-transform", menuOpen ? "rotate-90" : "")}
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
  </nav>

      {/* Mobile Panel */}
      <div
        className={cn(
          "md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul
          className={cn(
            "mt-3 space-y-1 rounded-2xl border border-border bg-card p-3 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
        >
          {NAV_ITEMS.filter(i => !i.homepageOnly || onHome).map(item => {
            const href = computeHref(item);
            const activeState = isItemActive(item);
            return (
              <li key={item.label}>
                <Link
                  href={href}
                  aria-current={activeState ? "page" : undefined}
                  onClick={item.section && onHome ? (e) => handleSectionNav(e, item.section!) : () => setMenuOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    activeState ? "bg-[hsl(var(--primary)/0.1)] text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    item.cta ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.9)]" : ""
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// Backwards compatibility export
export function BlogNavBar() { return <NavBar />; }
