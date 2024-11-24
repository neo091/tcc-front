import { getLessons } from "@services/Lessons"
import { useAuthStore } from "@store/authStore"
import { useRoomStore } from "@store/roomStore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LessonItem } from "./LessonItem"

export const LessonsSectionOfList = () => {

  const { room_id } = useRoomStore()
  const { token } = useAuthStore()

  const [myLessons, setMyLessons] = useState([])

  const loadMyLessons = async () => {

    const result = await getLessons({ room: room_id, token })

    if (result.error) {
      return
    }

    const { lessons } = result.body
    setMyLessons(lessons)
  }

  useEffect(() => { loadMyLessons() }, [])


  return (
    <>
      <h2 className="text-4xl font-semibold my-3">Mis Lecciones</h2>
      <section className="flex flex-col gap-3">
        {myLessons?.map(lesson => <LessonItem key={lesson.id} lesson={lesson} />)}
      </section>
    </>
  )
}