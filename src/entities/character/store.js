import { create } from 'zustand';

export const useCharacterStore = create((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
