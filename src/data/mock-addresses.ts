import { DeliveryAddress } from '@/types';

export const MOCK_ADDRESSES: DeliveryAddress[] = [
  {
    id: 'addr-1',
    fullName: 'Chinedu Okafor',
    phoneNumber: '+234 803 123 4567',
    state: 'Lagos',
    cityOrLGA: 'Ikeja',
    streetAddress: '14 Allen Avenue',
    buildingDetails: 'Suite 3B, Silver Plaza',
    landmark: 'Opposite Oshopey Plaza',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Chinedu Okafor',
    phoneNumber: '+234 803 123 4567',
    state: 'Lagos',
    cityOrLGA: 'Lekki Phase 1',
    streetAddress: 'Plot 8, Admiralty Way',
    buildingDetails: 'Green Villa',
    landmark: 'Near Ebeano Supermarket',
    isDefault: false,
  },
  {
    id: 'addr-3',
    fullName: 'Amina Bello',
    phoneNumber: '+234 812 987 6543',
    state: 'FCT - Abuja',
    cityOrLGA: 'Maitama',
    streetAddress: '22 Gana Street',
    landmark: 'Close to Transcorp Hilton',
    isDefault: false,
  },
];
