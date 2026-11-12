import { CustomerReview } from '@/types';

export const MOCK_REVIEWS: Record<string, CustomerReview[]> = {
  'prod-iphone-15': [
    {
      id: 'rev-1',
      productId: 'prod-iphone-15',
      userId: 'usr-1',
      userName: 'Emeka N.',
      rating: 5,
      comment:
        'Original brand new device received in Lagos within 24 hours. The natural titanium feel is very lightweight. Highly recommend Shoply!',
      createdAt: '2 days ago',
      isVerifiedPurchase: true,
    },
    {
      id: 'rev-2',
      productId: 'prod-iphone-15',
      userId: 'usr-2',
      userName: 'Fatima Z.',
      rating: 5,
      comment:
        'Battery life is exceptional, camera quality for content creation is top notch. Genuine Apple warranty confirmed.',
      createdAt: '1 week ago',
      isVerifiedPurchase: true,
    },
    {
      id: 'rev-3',
      productId: 'prod-iphone-15',
      userId: 'usr-3',
      userName: 'Tunde B.',
      rating: 4,
      comment: 'Super fast delivery to Ikeja. Phone is flawless.',
      createdAt: '2 weeks ago',
      isVerifiedPurchase: true,
    },
  ],
  'prod-hoodie-oversized': [
    {
      id: 'rev-4',
      productId: 'prod-hoodie-oversized',
      userId: 'usr-4',
      userName: 'Kelechi O.',
      rating: 5,
      comment:
        'The 400 GSM fleece is thick and warm. The deep navy color looks even better in person than photos.',
      createdAt: '3 days ago',
      isVerifiedPurchase: true,
    },
    {
      id: 'rev-5',
      productId: 'prod-hoodie-oversized',
      userId: 'usr-5',
      userName: 'Bukola A.',
      rating: 4,
      comment:
        'Fits true to size for an oversized look. Excellent ribbing on cuffs.',
      createdAt: '5 days ago',
      isVerifiedPurchase: true,
    },
  ],
  'prod-air-fryer-pro': [
    {
      id: 'rev-6',
      productId: 'prod-air-fryer-pro',
      userId: 'usr-6',
      userName: 'Ngozi D.',
      rating: 5,
      comment:
        'Crispy fried plantain and chicken with zero excess oil! Works smoothly on 220V power without tripping.',
      createdAt: '4 days ago',
      isVerifiedPurchase: true,
    },
  ],
};
