import { create } from 'zustand';

export const useUserInfoStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
