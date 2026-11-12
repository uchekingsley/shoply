import { useCartStore } from '@/store/cart-store';
import { type ReactNode } from 'react';

/**
 * Backwards compatibility adapter for components using useCart()
 */
export function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useCart() {
  const items = useCartStore((state) => state.items);
  const selectedAddress = useCartStore((state) => state.selectedAddress);
  const appliedPromo = useCartStore((state) => state.appliedPromo);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyPromoCode = useCartStore((state) => state.applyPromoCode);
  const removePromoCode = useCartStore((state) => state.removePromoCode);
  const setSelectedAddress = useCartStore((state) => state.setSelectedAddress);
  const getSummary = useCartStore((state) => state.getSummary);
  const getTotalUnits = useCartStore((state) => state.getTotalUnits);
  const getDistinctLineCount = useCartStore((state) => state.getDistinctLineCount);

  return {
    items,
    isInitialized: true,
    totalUnits: getTotalUnits(),
    distinctLineCount: getDistinctLineCount(),
    summary: getSummary(),
    selectedAddress,
    appliedPromo,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
    setSelectedAddress,
  };
}
