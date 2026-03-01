import { create } from 'zustand';

export const useSortOptionStore = create((set) => ({
  isRotation: false,
  state: 'release',
  searchQuery: '',
  setIsRotation: (isRotation) => set({ isRotation }),
  setState: (state) => set({ state }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
