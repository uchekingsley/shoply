/**
 * Shoply TypeScript Domain Models
 * Derived from Shoply PRD v1.0 specifications
 */

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  image?: string;
  description?: string;
}

export interface VariationOption {
  name: string; // e.g. "size" | "color" | "storage"
  label: string; // e.g. "Size" | "Color" | "Storage Capacity"
  values: string[]; // e.g. ["S", "M", "L", "XL"]
}

export interface ProductVariation {
  id: string; // Stable SKU or variant identifier
  sku: string;
  name: string; // e.g. "Midnight Black / 256GB" or "Red / XL"
  attributes: Record<string, string>; // e.g. { size: 'XL', color: 'Red' }
  price: number;
  originalPrice?: number;
  stock: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  images: string[];
  price: number; // in NGN
  originalPrice?: number;
  discountPercentage?: number;
  rating: number; // 1.0 - 5.0
  reviewCount: number;
  stockStatus: StockStatus;
  lowStockThreshold?: number;
  variationOptions?: VariationOption[];
  variations?: ProductVariation[];
  specifications?: Record<string, string>;
  deliveryInfo?: {
    estimatedDays: string;
    feeNote: string;
  };
  isFlashDeal?: boolean;
  isBestSeller?: boolean;
  isRecommended?: boolean;
  flashDealEndsAt?: string;
}

export interface CartItem {
  id: string; // Unique line key (e.g., `${productId}_${variationId || 'default'}`)
  productId: string;
  variationId?: string;
  product: Product;
  selectedVariation?: ProductVariation;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  deliveryFee?: number;
  deliveryFeeCalculated: boolean;
  total: number;
  isEstimatedTotal: boolean;
  promoCode?: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  isVerifiedPurchase: boolean;
}

export interface DeliveryAddress {
  id: string;
  fullName: string;
  phoneNumber: string; // +234 convention
  state: string; // Nigerian state (e.g. Lagos, Abuja, Rivers, Kano)
  cityOrLGA: string; // Local Government Area or City
  streetAddress: string;
  buildingDetails?: string; // House/flat/estate details
  landmark?: string; // Known nearby landmark
  isDefault?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  isGuest: boolean;
  addresses: DeliveryAddress[];
  defaultAddressId?: string;
}

export type PaymentMethod = 'card' | 'transfer' | 'cod';

export type OrderStatus = 'Processing' | 'Packed' | 'In Transit' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  variationName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  image?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  timelineStep: 1 | 2 | 3 | 4; // 1: Confirmed, 2: Packed, 3: Out for Delivery, 4: Delivered
  paymentMethod: PaymentMethod;
  paymentLabel: string;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
}
