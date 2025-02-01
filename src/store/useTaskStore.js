import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set, get) => ({
      task: {},
      taskId: null,
      setTaskId: (taskId) => {
        set({ taskId: taskId })

        if (get().taskId === taskId) {
          return { completed: true, taskId }
        } else {
          return { completed: false, taskId }
        }


      },
      completed: [],
      questions: [],
      currentQuestion: 0,
      replied: 0,
      correctQuestions: [],
      inCorrectQuestions: [],
      setCompleted: ({ id }) => {
        const completed = get().completed
        if (completed.includes(id)) return
        set({ completed: [...completed].concat(id) })
      },
      resetCompleted: ({ id }) => {
        const newList = get().completed.filter(element => element === id)

        set({ completed: newList })
      },
      setQuestions: async ({ token }) => {

        const { id } = get().task

        const response = await fetch(`http://localhost:4000/api/teacher/tasks/content/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })

        const json = await response.json()

        if (response.ok) {

          if (!json.error) {
            if (json.body != "") {
              const value = json.body.value
              if (typeof JSON.parse(value) === "object") {
                get().resetQuestions()
                set({ questions: JSON.parse(value) })
              }
            }
          }
        }

      },
      checkQuestion: ({ index }) => {

        const { questions, currentQuestion, correctQuestions, inCorrectQuestions } = get()

        const isCorrect = questions[currentQuestion].correct === index

        if (isCorrect) {
          set({ correctQuestions: [...correctQuestions, questions[currentQuestion]] })
        } else {
          set({ inCorrectQuestions: [...inCorrectQuestions, questions[currentQuestion]] })
        }

        get().goNext()
      },
      isCompleted: () => {
        const { task, completed } = get()
        let completedTask = completed.includes(task.id)
        return { completed: completedTask }
      },
      goNext: () => {
        const { currentQuestion, questions } = get()
        const nextTest = currentQuestion + 1

        if (nextTest < questions.length) {
          set({ currentQuestion: nextTest })
        }

        set({ replied: get().replied + 1 })
      },

      resetQuestions: () => {
        set({ questions: [], currentQuestion: 0, replied: 0, correctQuestions: [], inCorrectQuestions: [] })
      },
      resetTask: () => { set({ task: {} }) }
    }),
    { 'name': 'task' }
  )
)
