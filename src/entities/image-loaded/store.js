import { create } from 'zustand';

export const useImageLoadedStore = create((set) => ({
  charListLoaded: true,
  detailLoaded: true,
  setCharListLoaded: (charListLoaded) => set({ charListLoaded }),
  setCharDetailLoaded: (detailLoaded) => set({ detailLoaded }),
}));
