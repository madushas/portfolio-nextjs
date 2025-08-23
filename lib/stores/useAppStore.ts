// Global app state store using Zustand
// Only theme and loading slices for now; expand as needed

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'light' | 'dark' | 'system';

interface AppState {
  isLoading: boolean;
  theme: ThemeType;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: ThemeType) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: false,
      theme: 'system',
      setLoading: (loading) => set({ isLoading: loading }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage', // localStorage key
    }
  )
);

// Usage example:
// const theme = useAppStore((state) => state.theme);
// const setTheme = useAppStore((state) => state.setTheme);
