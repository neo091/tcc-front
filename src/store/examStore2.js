import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExamStore2 = create(persist((set, get) => ({
    exam: [],
    roomId: 0,
    currentExam: 0,
    completedExams: [],
    setExam: (exam) => {
        set({ exam: exam })
    },
    setCurrentExam: (id) => {
        set({ currentExam: id })
    },
    setRoomId: (roomId) => {
        set({ roomId: roomId })
    },
    setCompletedExams: (id) => {
        set({ completedExams: get().completedExams.concat(id) })
    },
}), {
    "name": "exam v2"
}))