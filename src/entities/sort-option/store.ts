import { create } from 'zustand';
import type { SortOptionStore } from '@/shared/types';

export const useSortOptionStore = create<SortOptionStore>((set) => ({
  isRotation: false,
  state: 'release',
  searchQuery: '',
  setIsRotation: (isRotation) => set({ isRotation }),
  setState: (state) => set({ state }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
