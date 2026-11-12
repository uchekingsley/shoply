import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
import { zustandStorage } from '@/utils/storage';

interface WishlistState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => { isWishlisted: boolean; message: string };
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product: Product) => {
        const { wishlist } = get();
        const exists = wishlist.some((p) => p.id === product.id);

        if (exists) {
          set({ wishlist: wishlist.filter((p) => p.id !== product.id) });
          return {
            isWishlisted: false,
            message: `Removed "${product.name}" from your wishlist.`,
          };
        } else {
          set({ wishlist: [product, ...wishlist] });
          return {
            isWishlisted: true,
            message: `Added "${product.name}" to your wishlist.`,
          };
        }
      },

      isInWishlist: (productId: string) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== productId),
        }));
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },
    }),
    {
      name: 'shoply_wishlist_store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

