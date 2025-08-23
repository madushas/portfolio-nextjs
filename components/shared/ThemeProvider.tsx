"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { useAppStore } from "@/lib/stores/useAppStore";

export function ThemeProvider({
  children,
  ...props
}: Readonly<ThemeProviderProps>) {
  const theme = useAppStore((state) => state.theme);
  return (
    <NextThemesProvider attribute="class" defaultTheme={theme} {...props}>
      {children}
    </NextThemesProvider>
  );
}
