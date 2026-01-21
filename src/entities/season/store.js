import { create } from 'zustand';

export const useSeasonInfoStore = create((set) => ({
  data: null,
  setSeasonInfo: (data) => set({ data }),
}));
