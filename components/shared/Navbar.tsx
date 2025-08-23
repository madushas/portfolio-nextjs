"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "#home" },
  { name: "Services", path: "#services" },
  { name: "About", path: "#about" },
  { name: "Projects", path: "#projects" },
  { name: "Blog", path: "#toparticles" },
  { name: "Contact", path: "#contact" },
];

export default function NavBar() {
  const [activePath, setActivePath] = useState("home");
  const [isFloating, setIsFloating] = useState(false);

  const scrollToView = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const element = document.querySelector(href);
    if (element instanceof HTMLElement) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsFloating(scrollY > 100);

    // Detect active section
    const sections = document.querySelectorAll("section");
    let currentSection: string | null = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    if (currentSection) {
      setActivePath(`#${currentSection}`);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <m.div
      className={cn(
        "z-50 mx-auto w-full transition-all duration-500 ease-in-out",
        isFloating
          ? "fixed top-4 left-1/2 max-w-fit -translate-x-1/2"
          : "sticky top-0 mb-8 max-w-full"
      )}
      layout
    >
      <div
        className={cn(
          "transition-all duration-500 ease-in-out",
          isFloating
            ? "glass-effect rounded-full px-4 py-2 shadow-lg"
            : "bg-card border-border rounded-none border-b p-2 backdrop-blur-md"
        )}
      >
        <nav
          className={cn(
            "relative flex items-center transition-all duration-500",
            isFloating
              ? "justify-center gap-1"
              : "justify-between gap-2"
          )}
        >
          {/* Logo - hide when floating */}
          <m.h3
            className={cn(
              "text-primary font-mono text-xl font-black transition-all duration-500",
              isFloating
                ? "w-0 overflow-hidden opacity-0"
                : "block rounded-full px-4 py-2 opacity-100"
            )}
          >
            <Link href="/" aria-label="Home">://madusha</Link>
          </m.h3>

          {/* Navigation Items */}
          <div
            className={cn(
              "flex transition-all duration-500",
              isFloating ? "gap-1" : "gap-2"
            )}
          >
            {navItems.map((item) => {
              const isActive = item.path === activePath;
              return (
                <Link
                  key={item.path}
                  className={cn(
                    "relative rounded-full font-semibold no-underline transition-all duration-300 ease-in hover:scale-105",
                    isFloating
                      ? "px-3 py-1.5 text-sm"
                      : "hidden px-4 py-2 text-sm md:block lg:text-base",
                    isActive
                      ? "text-primary font-bold"
                      : isFloating
                      ? "text-muted-foreground hover:text-foreground"
                      : "hover:text-accent-foreground"
                  )}
                  href={item.path}
                  aria-label={item.name}
                  onClick={scrollToView}
                  onMouseOver={() => setActivePath(item.path)}
                  onMouseLeave={handleScroll}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <m.div
                      className={cn(
                        "absolute rounded-full",
                        isFloating
                          ? "inset-0 bg-primary"
                          : "bottom-0 left-0 h-1 w-full bg-primary"
                      )}
                      layoutId="navbar-active"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        stiffness: 80,
                        damping: 12,
                        duration: 0.3,
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative transition-all duration-300",
                      isActive && isFloating ? "z-10 text-white" : ""
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle - hide when floating */}
          <m.div
            className={cn(
              "transition-all duration-500",
              isFloating
                ? "w-0 overflow-hidden opacity-0"
                : "flex-end justify-end opacity-100"
            )}
          >
            <ThemeToggle />
          </m.div>
        </nav>
      </div>
    </m.div>
  );
}

// Keep BlogNavBar for backward compatibility
export function BlogNavBar() {
  return (
    <div className="border-border bg-card text-accent-foreground sticky top-0 z-50 mx-auto mb-8 flex w-full max-w-full rounded-none border-b p-2 backdrop-blur-md">
      <nav className="relative z-50 flex w-full justify-between gap-2 rounded-lg">
        <h3 className="text-primary not-sr-only block justify-start rounded-full px-4 py-2 font-mono text-xl font-black">
          <Link href="/blog">://madusha</Link>
        </h3>
        <div className="flex justify-between gap-2">
          <Link
            className="relative hidden rounded-full px-4 py-2 text-sm font-semibold no-underline duration-300 ease-in md:block lg:text-base hover:text-accent-foreground"
            href="/"
          >
            Home
          </Link>
          <Link
            className="relative hidden rounded-full px-4 py-2 text-sm font-semibold no-underline duration-300 ease-in md:block lg:text-base text-primary font-bold"
            href="/blog"
          >
            <span>Blog</span>
            <m.div
              className="bg-primary absolute bottom-0 left-0 -z-10 h-1 rounded-full w-full"
              layoutId="blog-navbar"
              transition={{
                type: "spring",
                bounce: 0.15,
                stiffness: 80,
                damping: 12,
                duration: 0.3,
              }}
            />
          </Link>
        </div>
        <ThemeToggle className="flex-end justify-end justify-items-end" />
      </nav>
    </div>
  );
}
