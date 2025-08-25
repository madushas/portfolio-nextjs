"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAppStore } from "@/lib/stores/useAppStore";
import { Button } from "../ui/button";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Zustand global theme state
  const zustandTheme = useAppStore((state) => state.theme);
  const setZustandTheme = useAppStore((state) => state.setTheme);
  const { setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(zustandTheme === "dark");
  const [mounted, setMounted] = React.useState(false);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setZustandTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  React.useEffect(() => {
    setMounted(true);
    setIsDarkMode(zustandTheme === "dark");
  }, [zustandTheme]);

  // Render nothing on the server, and the full UI only on the client
  if (!mounted) {
    return null;
  }

  return (
    <div {...props} className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="secondary"
        shape="square"
        className="border-border bg-card hover:bg-accent border p-2 duration-200"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <m.div
              key="sun"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Sun />
            </m.div>
          ) : (
            <m.div
              key="moon"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              <Moon />
            </m.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
