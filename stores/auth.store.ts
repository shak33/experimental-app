import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeysEnum } from './models/StorageKeys.enum';

interface User {
  email: string;
  token: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, useMock?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, useMock?: boolean) => {
        if (useMock) {
          const mockUser: User = {
            email: 'john.doe@gmail.com',
            token: `mock_token_${Date.now()}`,
            username: 'john.doe33',
          };
        
          set({ user: mockUser, isAuthenticated: true });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: StorageKeysEnum.AUTH_STORAGE,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);