import { LessonsSectionOfList } from "@components/LessonsSectionOfList";
import PendingExamOfList from "@components/PendingExamOfList";
import RoomsSelected from "@components/RoomsSelected";
import { useAuthStore } from "@store/authStore";
import { useExamStore2 } from "@store/examStore2";
import { useRoomStore } from "@store/roomStore";
import { useSelectedStore } from "@store/useSelectedStore";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const loader = ({ params }) => {

  const { id } = params

  return { roomId: id };
}

export const ExamsSection = ({ pendingExams }) => {
  return (
    <>
      <h2 className="text-4xl font-semibold my-3">Exámenes Pendientes</h2>
      <section className="flex flex-col gap-3">
        {pendingExams?.map(exam => <PendingExamOfList key={exam.id} exam={exam} />)}
      </section>
    </>
  )
}

const RoomsView = () => {
  const { session } = useAuthStore()
  const { room } = useRoomStore()


  const [pendingExams, setPendingExams] = useState([])

  const { selected } = useSelectedStore()

  useEffect(() => {
    getRomPendingExams()
  }, [])



  const getRomPendingExams = async () => {
    await fetch(`http://localhost:4000/api/dashboard/rooms/${room.aula_id}/exams`, {
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
      <RoomsSelected />
      {selected === "lessons" && <LessonsSectionOfList />}
      {selected === "exams" && <ExamsSection pendingExams={pendingExams} />}

    </>

  )
}

export default RoomsView;