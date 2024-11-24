import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedStore = create(
  persist((set, get) => ({
    selected: 'lessons',
    setSelected: (selection) => set({ selected: selection }),
  }), { 'name': 'selected' })
)
