import { create } from 'zustand';
import type { UserInfoStore } from '@/shared/types';

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
