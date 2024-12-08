import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set, _) => ({
      task: {},
      setTask: (task) => {
        set({ task: task })
      },
      resetTask: () => { set({ task: {} }) }
    }),
    { 'name': 'task' }
  )
)
