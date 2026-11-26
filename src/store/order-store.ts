import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, DeliveryAddress, Order, OrderItem, PaymentMethod } from '@/types';
import { zustandStorage } from '@/utils/storage';
import { MOCK_ADDRESSES } from '@/data/mock-addresses';

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: 'Paystack Card / USSD',
  transfer: 'Instant Bank Transfer',
  cod: 'Cash on Delivery',
};

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'SHP-90421',
    createdAt: '2026-11-24T10:30:00.000Z',
    status: 'In Transit',
    timelineStep: 3,
    paymentMethod: 'card',
    paymentLabel: PAYMENT_LABELS.card,
    deliveryAddress: MOCK_ADDRESSES[0],
    items: [
      {
        productId: 'prod-2',
        productName: 'Sony WH-1000XM5 Wireless Headphones',
        variationName: 'Midnight Black',
        quantity: 1,
        unitPrice: 420000,
        subtotal: 420000,
      },
    ],
    subtotal: 420000,
    discount: 0,
    deliveryFee: 2500,
    total: 422500,
  },
  {
    id: 'SHP-88109',
    createdAt: '2026-11-10T14:15:00.000Z',
    status: 'Delivered',
    timelineStep: 4,
    paymentMethod: 'transfer',
    paymentLabel: PAYMENT_LABELS.transfer,
    deliveryAddress: MOCK_ADDRESSES[0],
    items: [
      {
        productId: 'prod-3',
        productName: 'Lagos Streetwear Oversized Tee',
        variationName: 'Size L / Off-White',
        quantity: 1,
        unitPrice: 28500,
        subtotal: 28500,
      },
    ],
    subtotal: 28500,
    discount: 0,
    deliveryFee: 2500,
    total: 31000,
  },
];

export interface PlaceOrderInput {
  items: CartItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
}

interface OrderState {
  orders: Order[];
  placeOrder: (input: PlaceOrderInput) => Order;
  getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_MOCK_ORDERS,

      placeOrder: (input) => {
        const orderItems: OrderItem[] = input.items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          variationName: item.selectedVariation?.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
          image: item.product.images?.[0],
        }));

        const randomNum = Math.floor(10000 + Math.random() * 89999);
        const newOrder: Order = {
          id: `SHP-${randomNum}`,
          createdAt: new Date().toISOString(),
          status: 'Processing',
          timelineStep: 1,
          paymentMethod: input.paymentMethod,
          paymentLabel: PAYMENT_LABELS[input.paymentMethod],
          deliveryAddress: input.deliveryAddress,
          items: orderItems,
          subtotal: input.subtotal,
          discount: input.discount,
          deliveryFee: input.deliveryFee,
          total: input.total,
          promoCode: input.promoCode,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      getOrderById: (id) => {
        return get().orders.find((o) => o.id === id);
      },
    }),
    {
      name: 'shoply_order_store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

