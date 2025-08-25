"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { useAppStore } from "@/lib/stores/useAppStore";

export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
  const stored = useAppStore((s) => s.theme);
  // Map persisted 'system' to undefined so next-themes can resolve system preference.
  const defaultTheme = stored === 'system' ? undefined : stored;
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
