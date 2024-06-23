import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTestStore = create(persist((set, get) => ({
    englishLevel: [],
    questions: [],
    currentTest: 0,
    replied: 0,
    history: [],
    fetchQuestions: async (limit) => {
        const res = await fetch('http://localhost:5173/questions.json')
        const json = await res.json()

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

        set({ questions: questions })
    },
    addToHistory: (newHistory) => {

        const { history } = get()

        set({ history: [...history, newHistory] })
    },
    resetHistory: () => {
        set({ historial: [] })
    },
    selectTest: (testId, testIndex) => {
        const { questions } = get()
        const newQuestions = structuredClone(questions)
        const questionsIndex = newQuestions.findIndex(q => q.id === testId)
        const questionInfo = newQuestions[questionsIndex]
        const isCorrectUserAnswer = questionInfo.answer === testIndex

        newQuestions[questionsIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: testIndex
        }

        set({ questions: newQuestions })
        get().startToNext(500)

    },
    goNextTest: () => {
        const { currentTest, questions } = get()
        const nextTest = currentTest + 1

        if (nextTest < questions.length) {
            set({ currentTest: nextTest })
        }

        set({ replied: get().replied + 1 })
    },
    goPrevTest: () => {
        const { currentTest } = get()
        const prevTest = currentTest - 1

        if (prevTest >= 0) {
            set({ currentTest: prevTest })
        }
    },
    startToNext: (time) => {
        setTimeout(() => { get().goNextTest() }, time)
    },
    reset: () => {
        set({ questions: [], currentTest: 0, replied: 0 })
    },
    addNewQuestions: (questions) => {
        const sortQuestions = questions.sort(() => Math.random() - 0.5)
        set({ questions: [], currentTest: 0, replied: 0 })
        set({ questions: sortQuestions })
    }
}), {
    "name": "tests"
}))