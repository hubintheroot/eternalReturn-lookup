import { create } from 'zustand';
import type { ImageLoadedStore } from '@/shared/types';

export const useImageLoadedStore = create<ImageLoadedStore>((set) => ({
  charListLoaded: true,
  detailLoaded: true,
  carouselHeight: 0,
  setCharListLoaded: (charListLoaded) => set({ charListLoaded }),
  setCharDetailLoaded: (detailLoaded) => set({ detailLoaded }),
  setCarouselHeight: (carouselHeight) => set({ carouselHeight }),
}));
