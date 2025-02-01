import { CheckBadgeIcon, SparklesIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { generateAndSaveFeedback, saveCompletedTask } from "@services/Tareas.service"
import { useEffect, useState } from "react"

const TaskResume = ({ taskId, token, correct, incorrect, resume, feedback }) => {

  const pointsCorrect = correct.reduce((total, current) => total + Number(current.points), 0)
  const pointsIncorrect = incorrect.reduce((total, current) => total + Number(current.points), 0)
  const total = pointsCorrect + pointsIncorrect

  const [resumeContent, setResumeContent] = useState("generando texto...")
  const [resumePercentage, setResumePercentage] = useState(0)
  const [improvements, setImprovements] = useState([])

  const save = async () => {

    await generateAndSaveFeedback({
      taskId,
      token,
      data: { correct, incorrect }
    })
      .then(async result => {

        console.log(result);
        const { content } = result.body

        const contentJson = JSON.parse(content)

        console.log(contentJson);

        setResumeContent(contentJson.obs)
        setResumePercentage(contentJson.percentage)
        setImprovements(contentJson.improvementsList)

        const dataSave = {
          points: pointsCorrect,
          points_total: total,
          corrects: JSON.stringify(correct),
          incorrects: JSON.stringify(incorrect)
        }

        await saveCompletedTask({ task: taskId, token, data: dataSave })
      })
      .catch(e => {
        console.log(e);
      })

  }

  useEffect(() => {

    if (!resume) {
      save()
      return;
    }

    setResumeContent(feedback.obs)
    setImprovements(feedback.improvementsList)

  }, [])

  return (
    <>
      <h1>Resumen!</h1>
      <p className="p-2 bg-slate-700 rounded shadow shadow-black">Puntos: {pointsCorrect} de {total}</p>

      {
        correct.length > 0 && (
          <section>
            <h2 className="text-green-600 flex gap-2 font-bold">Correctas</h2>
            {
              correct?.map(question => {
                return (
                  <article className="bg-slate-700 my-4 p-2 text-left rounded shadow-xl shadow-black/20 hover:shadow-none transition-all duration-300 relative">
                    Q. {question.ask}
                    <p className="text-green-600 flex gap-2"><CheckBadgeIcon className="w-6" /> {question.answers[question.correct]} </p>
                    <span className="absolute right-1 bottom-1 bg-slate-500 text-center rounded p-1
                 flex justify-center items-center" title="puntos">Puntos: {question.points}</span>
                  </article>

                )
              })
            }
          </section>
        )
      }


      {
        incorrect.length > 0 && (
          <section>
            <h2 className="text-red-600 flex gap-2 font-bold mt-8">  Incorrectas</h2>

            {
              incorrect.map(question => {
                return (
                  <article className="bg-slate-700 my-4 p-2 text-left rounded shadow-xl shadow-black/20 hover:shadow-none transition-all duration-300 relative">
                    Q. {question.ask}

                    <span className="absolute right-1 bottom-1 bg-slate-500 text-center rounded p-1 flex justify-center items-center" title="puntos">Puntos: {question.points}</span>
                  </article>

                )
              })
            }

          </section>
        )
      }


      <section className="flex flex-col justify-center gap-2">
        <SparklesIcon className="w-8 m-auto" />
        <div className="p-2 bg-slate-700 ">
          <p className="text-justify text-xl">{resumeContent}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Recomendaciones</h2>
          {improvements.map(text => {
            return (
              <p className="text-left text-xl p-2 bg-slate-900 rounded">{text}</p>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default TaskResume;
