import { useRecentlyViewedStore } from '@/store/recently-viewed-store';
import { type ReactNode } from 'react';

/**
 * Backwards compatibility adapter for components using useRecentlyViewed()
 */
export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useRecentlyViewed() {
  const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed);
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);
  const clearRecentlyViewed = useRecentlyViewedStore((state) => state.clearRecentlyViewed);

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
}
