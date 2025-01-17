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
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {myLessons?.map(lesson => <LessonItem key={lesson.id} lesson={lesson} />)}
        </div>
      </section>
    </>
  )
}