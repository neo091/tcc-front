import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLessonStore = create(
  persist(
    (set, get) => ({
      lesson: {},
      setLesson: (data) => {
        set({ lesson: data })
      },
      resetLesson: () => { set({ lesson: {} }) },
      lastLessonCreatedId: '0',
      setLastLessonCreatedId: (lessonId) => {
        set({ lastLessonCreatedId: lessonId })
      }
    }),
    { 'name': 'lesson' }
  )
)
