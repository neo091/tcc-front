import { LessonsSectionOfList } from "@components/LessonsSectionOfList";
import PendingExamOfList from "@components/PendingExamOfList";
import { useAuthStore } from "@store/authStore";
import { useExamStore2 } from "@store/examStore2";
import { useRoomStore } from "@store/roomStore";
import { useSelectedStore } from "@store/useSelectedStore";
import { useEffect, useState } from "react";
import Tareas from "@Dashboard/tareas/Tareas";
import Title from "@components/Title";
import Tabs from "@components/Tabs";

export const loader = ({ params }) => {

  const { id } = params

  return { roomId: id };
}

export const ExamsSection = ({ pendingExams }) => {
  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {pendingExams?.map(exam => <PendingExamOfList key={exam.id} exam={exam} />)}
        </div>
      </section>
    </>
  )
}

const tabList = [
  {
    id: "tab-1",
    selected: "lessons",
    title: "Lecciones"
  },
  {
    id: "tab-2",
    selected: "tasks",
    title: "Tareas"
  },
  {
    id: "tab-3",
    selected: "exams",
    title: "Exámenes"
  }
]

const RoomsView = () => {
  const { session } = useAuthStore()
  const { room } = useRoomStore()
  const { completedExams, setCompletedExams } = useExamStore2()

  const [pendingExams, setPendingExams] = useState([])

  const { selected } = useSelectedStore()

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

  const getMyExamsCompleted = async () => {
    const result = await fetch(`http://localhost:4000/api/dashboard/rooms/${room.aula_id}/myExams`, {
      headers: {
        "Authorization": `Bearer ${session.token}`,
        "Content-Type": "application/json",
      }
    })

    const json = await result.json()

    const myExams = json.body


    myExams.map((myExam) => {

      const isCompleted = completedExams.find(exam => exam !== myExam.exam_id)

      if (!isCompleted) {

        setCompletedExams(myExam.exam_id)
      }

    })
  }

  useEffect(() => {
    getRomPendingExams()
    getMyExamsCompleted()
  }, [])

  return (
    <>
      <Tabs tabList={tabList} />
      {selected === "lessons" && <LessonsSectionOfList />}
      {selected === "tasks" && <Tareas />}
      {selected === "exams" && <ExamsSection pendingExams={pendingExams} />}
    </>

  )
}

export default RoomsView;