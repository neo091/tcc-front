import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { getExamResume } from "@services/exam"
import { useAuthStore } from "@store/authStore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ExamResume = ({ currentExamId }) => {

  const { token } = useAuthStore()

  const [recommendations, setRecommendations] = useState("")
  const [recommendationsList, setRecommendationsList] = useState([])
  const [points, setPoints] = useState("")
  const [pointsTotal, setPointsTotal] = useState("")
  const [corrects, setCorrects] = useState([])
  const [incorrect, setIncorrect] = useState([])
  const navigate = useNavigate()

  const loadResume = async () => {

    await getExamResume({ id: currentExamId, token }).then(result => {

      const { recommendations, points, points_total, corrects, incorrect } = result.body

      const recs = JSON.parse(recommendations)

      setRecommendations(JSON.parse(recommendations))
      setRecommendationsList(recs.recList)
      setPoints(points)
      setPointsTotal(points_total)
      setCorrects(corrects && JSON.parse(corrects))
      setIncorrect(incorrect && JSON.parse(incorrect))

    })

  }

  useEffect(() => {
    loadResume()
  }, [])

  return (
    <div className="text-center bg-slate-800 p-4 rounded shadow-xl shadow-black/20 space-y-2 hover:shadow-none transition-all duration-300 max-h-[80vh] overflow-y-auto">
      <h1 className="font-semibold text-2xl">Resumen</h1>
      <p className="font-semibold">Puntos: {points} de {pointsTotal}</p>
      <p className="font-mono p-2 bg-slate-950 rounded">{recommendations.rec}</p>


      <div>
        <h2 className=" text-2xl font-semibold">Recomendaciones:</h2>
        <section>

          {recommendationsList?.map((recommendation) => (
            <article className=" my-4 ms-4 bg-slate-900 p-4 rounded-lg">
              <h3 className=" font-semibold">{recommendation?.estrategia}:</h3>
              <p>{recommendation?.descripción}</p>
            </article>
          ))}

        </section>
      </div>


      <section>
        <h2 className="text-green-600 flex gap-2 font-bold">Correctas</h2>
        {
          corrects?.map(question => {
            return (
              <article className="bg-slate-700 my-4 p-2 text-left rounded shadow-xl shadow-black/20 hover:shadow-none transition-all duration-300 relative">
                Q. {question.ask}
                <p className="text-green-600 flex gap-2"><CheckBadgeIcon className="w-6" /> {question.answers[question.correct]} </p>
                <span className="absolute right-1 bottom-1 bg-slate-500 text-center rounded p-1
                 flex justify-center items-center" title="puntos">P: {question.points}</span>
              </article>

            )
          })
        }
      </section>

      {
        incorrect?.length > 0 && (
          <section>
            <h2 className="text-red-600 flex gap-2 font-bold mt-8"> <XCircleIcon className="w-6" /> Incorrectas</h2>

            {
              incorrect.map(question => {
                return (
                  <article className="bg-slate-700 my-4 p-2 text-left rounded shadow-xl shadow-black/20 hover:shadow-none transition-all duration-300 relative">
                    Q. {question.ask}

                    <span className="absolute right-1 bottom-1 bg-slate-500 text-center rounded p-1
                 flex justify-center items-center" title="puntos">P: {question.points}</span>
                  </article>

                )
              })
            }

          </section>
        )
      }

      <button onClick={() => navigate(-1)} className="py-2 bg-violet-800 px-4 rounded">Volver</button>

    </div>
  )
}