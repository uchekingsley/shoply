import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, CartSummary, DeliveryAddress, Product, ProductVariation } from '@/types';
import { computeCartSummary, VALID_PROMO_CODES } from '@/utils/cart-calculations';
import { MOCK_ADDRESSES } from '@/data/mock-data';
import { zustandStorage } from '@/utils/storage';

interface CartState {
  items: CartItem[];
  selectedAddress: DeliveryAddress | null;
  appliedPromo: string | null;
  discountPercent: number;

  // Actions
  addToCart: (
    product: Product,
    variation?: ProductVariation,
    quantity?: number
  ) => { success: boolean; message: string };
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  setSelectedAddress: (address: DeliveryAddress) => void;

  // Getters / Selectors
  getSummary: () => CartSummary;
  getTotalUnits: () => number;
  getDistinctLineCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedAddress: MOCK_ADDRESSES[0] ?? null,
      appliedPromo: null,
      discountPercent: 0,

      addToCart: (product: Product, variation?: ProductVariation, quantity = 1) => {
        const { items } = get();

        // 1. Validation: product must be in stock
        const isOutOfStock = variation
          ? !variation.isAvailable || variation.stock <= 0
          : product.stockStatus === 'out_of_stock';

        if (isOutOfStock) {
          return {
            success: false,
            message: `"${product.name}" is currently out of stock.`,
          };
        }

        const availableStock = variation ? variation.stock : 99;

        // 2. Generate line item ID
        const lineItemId = variation
          ? `${product.id}_${variation.id}`
          : `${product.id}_base`;

        const existingItemIndex = items.findIndex((i) => i.id === lineItemId);

        if (existingItemIndex > -1) {
          const currentItem = items[existingItemIndex];
          const newQty = currentItem.quantity + quantity;

          if (newQty > availableStock) {
            return {
              success: false,
              message: `Cannot add more. Only ${availableStock} unit(s) available in stock.`,
            };
          }

          const unitPrice = variation ? variation.price : product.price;
          const updatedItems = items.map((item, idx) =>
            idx === existingItemIndex
              ? { ...item, quantity: newQty, subtotal: newQty * unitPrice }
              : item
          );

          set({ items: updatedItems });
          return {
            success: true,
            message: `Updated "${product.name}" quantity to ${newQty}.`,
          };
        }

        // New line item
        if (quantity > availableStock) {
          return {
            success: false,
            message: `Requested quantity exceeds available stock (${availableStock}).`,
          };
        }

        const unitPrice = variation ? variation.price : product.price;

        const newItem: CartItem = {
          id: lineItemId,
          productId: product.id,
          variationId: variation?.id,
          product,
          selectedVariation: variation,
          quantity,
          unitPrice,
          subtotal: quantity * unitPrice,
        };

        set({ items: [...items, newItem] });
        return {
          success: true,
          message: `Added "${product.name}" to cart.`,
        };
      },

      updateQuantity: (itemId: string, newQuantity: number) => {
        const { items } = get();
        if (newQuantity <= 0) {
          set({ items: items.filter((i) => i.id !== itemId) });
          return;
        }

        const updated = items.map((item) => {
          if (item.id !== itemId) return item;

          const maxStock = item.selectedVariation ? item.selectedVariation.stock : 99;
          const clampedQty = Math.min(newQuantity, maxStock);
          return {
            ...item,
            quantity: clampedQty,
            subtotal: clampedQty * item.unitPrice,
          };
        });

        set({ items: updated });
      },

      removeFromCart: (itemId: string) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== itemId) }));
      },

      clearCart: () => {
        set({ items: [], appliedPromo: null, discountPercent: 0 });
      },

      applyPromoCode: (code: string) => {
        const normalized = code.trim().toUpperCase();
        const percent = VALID_PROMO_CODES[normalized];

        if (percent !== undefined) {
          set({ appliedPromo: normalized, discountPercent: percent });
          return {
            success: true,
            message: `Promo code "${normalized}" applied successfully! (${percent}% OFF)`,
          };
        }

        return {
          success: false,
          message: `Invalid or expired promo code. Try "SHOPLY10" or "NAIJA10".`,
        };
      },

      removePromoCode: () => {
        set({ appliedPromo: null, discountPercent: 0 });
      },

      setSelectedAddress: (address: DeliveryAddress) => {
        set({ selectedAddress: address });
      },

      getSummary: () => {
        const { items, selectedAddress, discountPercent, appliedPromo } = get();
        return computeCartSummary(items, discountPercent, selectedAddress, appliedPromo);
      },

      getTotalUnits: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getDistinctLineCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'shoply_cart_store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
