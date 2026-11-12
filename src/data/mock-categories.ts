import { Category } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-phones',
    name: 'Phones & Accessories',
    slug: 'phones-accessories',
    iconName: 'phone-portrait-outline',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80',
    description: 'Smartphones, earbuds, power banks, and chargers',
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    iconName: 'shirt-outline',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&q=80',
    description: 'Clothing, shoes, watches, and traditional wear',
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    iconName: 'tv-outline',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&q=80',
    description: 'Smart TVs, audio systems, laptops, and generators',
  },
  {
    id: 'cat-home',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    iconName: 'home-outline',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80',
    description: 'Blenders, air fryers, cookware, and beddings',
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    iconName: 'sparkles-outline',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80',
    description: 'Skincare, haircare, perfumes, and grooming kits',
  },
  {
    id: 'cat-groceries',
    name: 'Groceries',
    slug: 'groceries',
    iconName: 'cart-outline',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80',
    description: 'Pantry staples, rice, beverages, and household consumables',
  },
];

export const MOCK_BANNERS = [
  {
    id: 'banner-1',
    title: 'Super Tech Deals',
    subtitle: 'Up to 30% off smartphones & accessories',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    targetCategory: 'cat-phones',
    tag: 'LIMITED OFFER',
  },
  {
    id: 'banner-2',
    title: 'Naija Fashion Week',
    subtitle: 'Step out in style with contemporary fits',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    targetCategory: 'cat-fashion',
    tag: 'NEW ARRIVALS',
  },
  {
    id: 'banner-3',
    title: 'Kitchen Essentials',
    subtitle: 'High power blenders & smart air fryers',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    targetCategory: 'cat-home',
    tag: 'BEST SELLERS',
  },
];

export const MOCK_CATEGORIES = INITIAL_CATEGORIES;
