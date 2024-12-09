import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set, get) => ({
      task: {},
      tasksCompleted: [],
      completed: [],
      questions: [],
      currentQuestion: 0,
      replied: 0,
      correctQuestions: [],
      inCorrectQuestions: [],
      setCompleted:({id})=>{
        const completed = get().completed
        if (completed.includes(id)) return
        set({completed: [...completed].concat(id)})
      },
      resetCompleted:()=>{
        set({completed: []})
      },
      setQuestions: async (token) => {

        const { id } = get().task

        const response = await fetch(` http://localhost:4000/api/teacher/tasks/content/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })

        const json = await response.json()

        if (response.ok) {
          const value = json.body.value

          if (typeof JSON.parse(value) === "object") {
            //console.log(typeof data);
            get().resetQuestions()

            set({ questions: JSON.parse(value) })
          }
          //console.log(json);
        }

      },
      checkQuestion: ({index}) => {

        const { questions, currentQuestion, correctQuestions, inCorrectQuestions} = get()

        const isCorrect = questions[currentQuestion].correct === index

        if(isCorrect){
          set({correctQuestions: [...correctQuestions, questions[currentQuestion]]})
        }else{
          set({inCorrectQuestions: [...inCorrectQuestions, questions[currentQuestion]]})
        }

        get().goNext()

      },
      isCompleted: ({id})=>{
        

        console.log('tasks', id);
        return false
      },
      goNext: () => {
        const { currentQuestion, questions } = get()
        const nextTest = currentQuestion + 1

        if (nextTest < questions.length) {
          set({ currentQuestion: nextTest })
        }

        set({ replied: get().replied + 1 })
      },
      setTask: (task) => {
        set({ task: task })
      },
      resetQuestions: () => {
        set({ questions: [], currentQuestion: 0, replied: 0, correctQuestions: [], inCorrectQuestions: [] })
      },
      resetTask: () => { set({ task: {} }) }
    }),
    { 'name': 'task' }
  )
)
