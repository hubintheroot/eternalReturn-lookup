import { create } from 'zustand';

export const useSortOptionStore = create((set) => ({
  isRotation: false,
  state: 'release',
  setIsRotation: (isRotation) => set({ isRotation }),
  setState: (state) => set({ state }),
}));
