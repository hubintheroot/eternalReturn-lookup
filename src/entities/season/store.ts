import { create } from 'zustand';
import type { SeasonInfoStore } from '@/shared/types';

export const useSeasonInfoStore = create<SeasonInfoStore>((set) => ({
  data: null,
  setSeasonInfo: (data) => set({ data }),
}));
