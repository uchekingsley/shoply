import { Platform } from 'react-native';

/**
 * Universal safe persistent storage wrapper
 * Primary engine: react-native-mmkv (synchronous, ultra fast native key-value storage)
 * Fallback: localStorage on Web, in-memory Map in tests or unlinked environments
 */

let mmkvInstance: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MMKV } = require('react-native-mmkv');
  if (MMKV) {
    mmkvInstance = new MMKV({ id: 'shoply-storage' });
  }
} catch (e) {
  // MMKV might be unavailable in pure Expo Go if prebuild is required or in SSR/web
}

const memoryStore = new Map<string, string>();

export const AppStorage = {
  getItem(key: string): string | null {
    try {
      if (mmkvInstance) {
        return mmkvInstance.getString(key) ?? null;
      }
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return memoryStore.get(key) ?? null;
    } catch (err) {
      console.warn(`[AppStorage] Failed to read key "${key}":`, err);
      return memoryStore.get(key) ?? null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (mmkvInstance) {
        mmkvInstance.set(key, value);
        return;
      }
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
      memoryStore.set(key, value);
    } catch (err) {
      console.warn(`[AppStorage] Failed to write key "${key}":`, err);
      memoryStore.set(key, value);
    }
  },

  removeItem(key: string): void {
    try {
      if (mmkvInstance) {
        mmkvInstance.delete(key);
        return;
      }
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
      memoryStore.delete(key);
    } catch (err) {
      console.warn(`[AppStorage] Failed to remove key "${key}":`, err);
      memoryStore.delete(key);
    }
  },

  clearAll(): void {
    try {
      if (mmkvInstance) {
        mmkvInstance.clearAll();
        return;
      }
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
        return;
      }
      memoryStore.clear();
    } catch (err) {
      console.warn('[AppStorage] Failed to clear storage:', err);
      memoryStore.clear();
    }
  },
};

/**
 * Zustand MMKV State Storage Adapter
 */
export const zustandStorage = {
  getItem: (name: string): string | null => {
    return AppStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    AppStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    AppStorage.removeItem(name);
  },
};
