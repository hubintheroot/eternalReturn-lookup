import { create } from 'zustand';
import type { CharacterStore } from '@/shared/types';

export const useCharacterStore = create<CharacterStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
