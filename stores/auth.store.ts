import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeysEnum } from './models/StorageKeys.enum';
import { LoginUserResponse } from '@/api/auth/index.types';

interface AuthState {
  user: LoginUserResponse['data']['user'] | null;
  isAuthenticated: boolean;
  token?: string;
  login: (data: LoginUserResponse['data']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: undefined,

      login: (data: LoginUserResponse['data']) => {
        set({ user: data.user, isAuthenticated: true, token: data.token });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, token: undefined });
      },
    }),
    {
      name: StorageKeysEnum.AUTH_STORAGE,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);