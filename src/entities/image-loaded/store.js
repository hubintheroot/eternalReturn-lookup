import { create } from 'zustand';

export const useImageLoadedStore = create((set) => ({
  charListLoaded: true,
  detailLoaded: true,
  carouselHeight: 0,
  setCharListLoaded: (charListLoaded) => set({ charListLoaded }),
  setCharDetailLoaded: (detailLoaded) => set({ detailLoaded }),
  setCarouselHeight: (carouselHeight) => set({ carouselHeight }),
}));
