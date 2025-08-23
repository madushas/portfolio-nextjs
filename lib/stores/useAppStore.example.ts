// Example usage of useAppStore for manual testing
import { useAppStore } from './useAppStore';

// Read theme
const theme = useAppStore.getState().theme;
console.log('Current theme:', theme);

// Set theme
useAppStore.getState().setTheme('dark');
console.log('Theme after set:', useAppStore.getState().theme);

// Read loading
const isLoading = useAppStore.getState().isLoading;
console.log('Is loading:', isLoading);

// Set loading
useAppStore.getState().setLoading(true);
console.log('Is loading after set:', useAppStore.getState().isLoading);

// Persistence test: reload the app and check if theme persists
// (Check localStorage for 'app-storage' key)
