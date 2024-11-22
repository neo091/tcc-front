import PendingExamOfList from "@components/PendingExamOfList";
import { useAuthStore } from "@store/authStore";
import { useExamStore2 } from "@store/examStore2";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const loader = ({ params }) => {

  const { id } = params

  return { roomId: id };
}

const LessonList = ({ lesson }) => {

  const { title, desc } = lesson
  return (

    <Link to={`../lesson/${lesson.id}`} className="block p-2 bg-slate-800 rounded shadow-slate-950 shadow-md hover:shadow-none transition-shadow duration-300 ease-in-out">
      <h2 className=" text-3xl font-semibold">{title}</h2>
      <p>{desc}</p>
    </Link>

  )
}

const RoomsView = () => {
  const { session } = useAuthStore()
  const { roomId } = useLoaderData()

  const [lessons, setLessons] = useState([])

  const [pendingExams, setPendingExams] = useState([])

  useEffect(() => {
    getRomLessons()
    getRomPendingExams()
  }, [])

  const getRomLessons = async () => {
    await fetch(`http://localhost:4000/api/dashboard/rooms/${roomId}/lessons`)
      .then(result => result.json())
      .then(data => setLessons(data.body.result))
  }

  const getRomPendingExams = async () => {
    await fetch(`http://localhost:4000/api/dashboard/rooms/${roomId}/exams`, {
      headers: {
        "Authorization": `Bearer ${session.token}`,
        "Content-Type": "application/json",
      }
    })
      .then(result => result.json())
      .then(data => {
        setPendingExams(data.body.exams)
      })
  }

  return (
    <>
      <h2 className="text-4xl font-semibold my-3">Lecciones</h2>
      <section className="flex flex-col gap-3">
        {lessons.map(lesson => <LessonList key={lesson.id} lesson={lesson} />)}
      </section>

      <h2 className="text-4xl font-semibold my-3">Exámenes Pendientes</h2>
      <section className="flex flex-col gap-3">
        {pendingExams.map(exam => <PendingExamOfList key={exam.id} exam={exam} roomId={roomId} />)}
      </section>
    </>

  )
}

export default RoomsView;