import { saveCompletedTask } from "@services/Tareas.service";
import { useAuthStore } from "@store/authStore";
import { useTaskStore } from "@store/useTaskStore";
import { useState } from "react"
import FinishTask from "./FinishTask";

const TaskContent = () => {
  const { task, questions, currentQuestion, replied, checkQuestion, setCompleted, correctQuestions, inCorrectQuestions } = useTaskStore()
  const { token } = useAuthStore()
  const [text, setText] = useState('')
  const [taskFinished, setTaskFinished] = useState(false)

  const checkHandle = ({ index }) => {

    if ((replied + 1) === questions.length) {
      console.log('Completed', 'rep:', replied + 1, 'total', questions.length)

      // preparar los datos para enviar al servidor
      const data = {
        points: correctQuestions.reduce((total, current) => total + Number(current.points), 0),
        points_total: questions.reduce((total, current) => total + Number(current.points), 0),
        corrects: JSON.stringify(correctQuestions),
        incorrects: JSON.stringify(inCorrectQuestions)
      }
      setCompleted({ id: task.id })



      saveCompletedTask({ task: task.id, token, data })

      setTaskFinished(true)
      return
    }
    checkQuestion({ index })
  }

  return (
    <>
      {
        !taskFinished ? <div className='max-w-xl m-auto bg-slate-800 p-4 relative rounded animate-fadeIn'>
          <div className='absolute -top-4 w-full left-0 right-0  text-center'>
            <span className='bg-slate-600 py-1 px-3 rounded'>{replied} / {questions.length}</span>
          </div>
          <h2 className="text-center text-3xl bg-slate-700 p-2 rounded-md">{questions[currentQuestion]?.ask}</h2>
          <div className='border-b-[1px] border-gray-600 my-4'></div>

          {
            questions[currentQuestion]?.type === "multiple_choice" && (
              <>
                {questions[currentQuestion]?.answers?.map((answer, index) => <button key={answer} onClick={(e) => checkHandle({ index })} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                  {answer}
                </button>)}
              </>
            )
          }

          {
            questions[currentQuestion]?.type == "true_false" && (
              <>
                {questions[currentQuestion]?.answers?.map((answer, index) => <button key={answer} onClick={() => checkHandle({ index })} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                  {answer}
                </button>)}
              </>
            )
          }

          {
            questions[currentQuestion]?.type == "typing" && (
              <>
                <input type="text" placeholder="typing here!" className="w-full p-4 my-4 text-black rounded" defaultValue={text} onKeyUp={(e) => setText(e.target.value)} />
                <button onClick={() => {
                  if (text) {
                    checkHandle({ index: text })
                  }
                }} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                  Aceptar
                </button>
              </>
            )
          }
        </div> : <FinishTask />
      }

    </>

  )
}

export default TaskContent