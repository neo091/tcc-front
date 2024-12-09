import { saveCompletedTask } from "@services/Tareas.service"
import { useAuthStore } from "@store/authStore"
import { useTaskStore } from "@store/useTaskStore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FinishTask = ({ exist, result }) => {
  const { task, questions, correctQuestions, inCorrectQuestions, setCompleted, resetQuestions } = useTaskStore()

  const totalPoints = questions.reduce((total, current) => total + current.points, 0)
  const correctQuestionsPoints = correctQuestions.reduce((total, current) => total + current.points, 0)

  const navigate = useNavigate()
  const { token } = useAuthStore()

  const [finishData, setFinishData] = useState({ totalPoints, correctQuestionsPoints })

  const saveTaskUserHandle = async () => {

    const data = {
      points: correctQuestionsPoints,
      points_total: totalPoints,
      corrects: JSON.stringify(correctQuestions),
      incorrects: JSON.stringify(inCorrectQuestions)
    }

    await saveCompletedTask({ task: task.id, token, data })
      .then(res => {
        setCompleted({ id: task.id })

      }).catch(error => {
        if (error.response.status === 409) {
          console.error('ya existe!')
        }

      })

  }

  useEffect(() => {
    resetQuestions()
    if (!exist) {
      saveTaskUserHandle()
    }
  }, [])

  return (
    <>
      <div className="max-w-xl bg-slate-800 m-auto text-center items-center justify-center flex flex-col p-4 rounded animate-fadeIn">
        {
          exist ? (
            <>
              <h1>Ya completado!</h1>
              <p className="p-2 bg-slate-700 shadow shadow-gray-900 rounded my-4">Puntos: {result[0]?.points} de {result[0]?.points_total}</p>
            </>
          ) : (
            <>
              <h1>Finalizado!</h1>
              {finishData.correctQuestionsPoints} de {finishData.totalPoints}
            </>
          )
        }

        <div className='flex gap-2'>
          <button onClick={() => navigate(-1)} className='shadow  shadow-gray-950 p-2 bg-sky-600 rounded hover:shadow-xl'>Volver</button>

        </div>

      </div>
    </>
  )
}

export default FinishTask