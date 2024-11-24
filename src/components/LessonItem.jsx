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

    <button onClick={selectLessonHandle} className="block p-2 bg-slate-800 rounded shadow-slate-950 shadow-md hover:shadow-none transition-shadow duration-300 ease-in-out">
      <h2 className=" text-3xl font-semibold">{title}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem natus modi aut odit facere commodi adipisci error, explicabo corrupti maxime officia asperiores, minus, porro accusamus recusandae vitae doloribus debitis accusantium.</p>
    </button>

  )
}