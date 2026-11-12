import { CartItem, CartSummary, DeliveryAddress } from '@/types';

export const VALID_PROMO_CODES: Record<string, number> = {
  SHOPLY10: 10,
  NAIJA10: 10,
  WELCOME: 10,
};

/**
 * Calculate Nigerian delivery fee based on customer address
 * Lagos: ₦2,500; Abuja: ₦3,500; other states: ₦4,500
 */
export function calculateDeliveryFee(address: DeliveryAddress | null): {
  fee?: number;
  isCalculated: boolean;
} {
  if (!address) {
    return { fee: undefined, isCalculated: false };
  }

  const stateLower = address.state.toLowerCase();
  if (stateLower.includes('lagos')) {
    return { fee: 2500, isCalculated: true };
  }
  if (stateLower.includes('abuja')) {
    return { fee: 3500, isCalculated: true };
  }
  return { fee: 4500, isCalculated: true };
}

/**
 * Compute subtotal, discount, delivery fee, and final cart totals
 */
export function computeCartSummary(
  items: CartItem[],
  discountPercent: number,
  address: DeliveryAddress | null,
  appliedPromo: string | null
): CartSummary {
  const subtotal = items.reduce((acc, curr) => acc + curr.subtotal, 0);
  const discount = (subtotal * discountPercent) / 100;
  const { fee: deliveryFee, isCalculated } = calculateDeliveryFee(address);
  const total = Math.max(0, subtotal - discount + (deliveryFee ?? 0));

  return {
    subtotal,
    discount,
    deliveryFee,
    deliveryFeeCalculated: isCalculated,
    total,
    isEstimatedTotal: !isCalculated,
    promoCode: appliedPromo ?? undefined,
  };
}
