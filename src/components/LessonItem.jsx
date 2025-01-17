import { useLessonStore } from "@store/lessonStore"
import { useNavigate } from "react-router-dom"

export const LessonItem = ({ lesson }) => {

  const { title, desc, id } = lesson

  const { setLesson } = useLessonStore()

  const navigate = useNavigate()

  const selectLessonHandle = () => {
    setLesson(lesson)
    navigate('/Dashboard/Rooms/Lesson')
  }


  return (

    <article className="p-6 flex flex-col gap-3  bg-slate-800 border-[1px] border-slate-700 rounded shadow-slate-950 shadow-md transition-shadow duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p>{desc ? desc : 'no description yet'}</p>
      <button onClick={selectLessonHandle} className="bg-blue-600 px-4 py-2 inline-block  w-full rounded-md shadow-md shadow-slate-950/50 hover:shadow-none transition-shadow duration-300 ease-in-out ">
        <p>Iniciar lección</p>
      </button>
    </article>

  )
}