import React from "react";
/**
 * React hook to detect online/offline status.
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = React.useState(typeof window !== 'undefined' ? window.navigator.onLine : true);
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * React hook to detect user's reduced motion preference.
 * Returns true if user prefers reduced motion.
 * Must be used in a client component.
 */
export function usePrefersReducedMotion(): boolean {
  "use client";
  const { useState, useEffect } = require('react');
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return reducedMotion;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}