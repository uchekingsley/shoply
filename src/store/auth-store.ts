import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, DeliveryAddress } from '@/types';
import { zustandStorage } from '@/utils/storage';
import { MOCK_ADDRESSES } from '@/data/mock-addresses';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  addresses: DeliveryAddress[];
  defaultAddressId: string | null;

  // Actions
  loginWithEmail: (email: string, fullName?: string) => Promise<{ success: boolean; message: string }>;
  loginWithPhone: (phone: string, fullName?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => DeliveryAddress;
  updateAddress: (id: string, address: Partial<DeliveryAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      addresses: MOCK_ADDRESSES,
      defaultAddressId: MOCK_ADDRESSES[0]?.id ?? null,

      loginWithEmail: async (email: string, fullName = 'Valued Customer') => {
        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes('@')) {
          return { success: false, message: 'Please enter a valid email address.' };
        }

        const newUser: User = {
          id: `usr_${Date.now()}`,
          fullName,
          email: cleanEmail,
          isGuest: false,
          addresses: get().addresses,
          defaultAddressId: get().defaultAddressId ?? undefined,
        };

        set({
          user: newUser,
          isAuthenticated: true,
        });

        return { success: true, message: `Welcome back, ${fullName}!` };
      },

      loginWithPhone: async (phone: string, fullName = 'Valued Customer') => {
        const cleanPhone = phone.trim();
        if (cleanPhone.length < 10) {
          return { success: false, message: 'Please enter a valid Nigerian phone number.' };
        }

        const newUser: User = {
          id: `usr_${Date.now()}`,
          fullName,
          email: `${cleanPhone.replace(/\s+/g, '')}@shoply.ng`,
          phoneNumber: cleanPhone,
          isGuest: false,
          addresses: get().addresses,
          defaultAddressId: get().defaultAddressId ?? undefined,
        };

        set({
          user: newUser,
          isAuthenticated: true,
        });

        return { success: true, message: `Welcome back, ${fullName}!` };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      addAddress: (addressData) => {
        const newAddress: DeliveryAddress = {
          ...addressData,
          id: `addr-${Date.now()}`,
        };

        const currentAddresses = get().addresses;
        let updatedList: DeliveryAddress[];

        if (newAddress.isDefault || currentAddresses.length === 0) {
          updatedList = currentAddresses.map((a) => ({ ...a, isDefault: false }));
          updatedList.unshift({ ...newAddress, isDefault: true });
          set({
            addresses: updatedList,
            defaultAddressId: newAddress.id,
          });
        } else {
          updatedList = [...currentAddresses, newAddress];
          set({ addresses: updatedList });
        }

        return newAddress;
      },

      updateAddress: (id, partial) => {
        const { addresses } = get();
        const updated = addresses.map((addr) => {
          if (addr.id !== id) {
            return partial.isDefault ? { ...addr, isDefault: false } : addr;
          }
          return { ...addr, ...partial };
        });

        set({ addresses: updated });

        if (partial.isDefault) {
          set({ defaultAddressId: id });
        }
      },

      deleteAddress: (id) => {
        const { addresses, defaultAddressId } = get();
        const remaining = addresses.filter((a) => a.id !== id);
        let newDefaultId = defaultAddressId;

        if (defaultAddressId === id) {
          newDefaultId = remaining[0]?.id ?? null;
          if (remaining[0]) {
            remaining[0].isDefault = true;
          }
        }

        set({
          addresses: remaining,
          defaultAddressId: newDefaultId,
        });
      },

      setDefaultAddress: (id) => {
        const { addresses } = get();
        const updated = addresses.map((a) => ({
          ...a,
          isDefault: a.id === id,
        }));

        set({
          addresses: updated,
          defaultAddressId: id,
        });
      },
    }),
    {
      name: 'shoply_auth_store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
