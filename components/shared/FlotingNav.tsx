"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#toparticles" },
  { name: "Contact", href: "#contact" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      
      // Detect active section
      const sections = navItems.map(item => 
        document.querySelector(item.href)
      );
      
      const current = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center space-x-1 rounded-full px-4 py-2 border border-border bg-background shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full",
                  activeSection === item.href.slice(1)
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeSection === item.href.slice(1) && (
                  <m.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
            {/* add a theme toglle */}
            <ThemeToggle className="ml-2" />
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  );
}