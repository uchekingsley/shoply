import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
import { zustandStorage } from '@/utils/storage';

const MAX_RECENT_ITEMS = 20;

interface RecentlyViewedState {
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addRecentlyViewed: (product: Product) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((p) => p.id !== product.id);
          return {
            recentlyViewed: [product, ...filtered].slice(0, MAX_RECENT_ITEMS),
          };
        });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },
    }),
    {
      name: 'shoply_recently_viewed_store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

