import { useEffect, useState } from "react"
import { createLesson, deleteLesson, getLessons, getLesson as getLessonWutId } from "../services/teacher"
import { useLessonStore } from "../store/lessonStore"

export function useLessons({ id }) {
    const [lessons, setLessons] = useState([])

    const loadLessons = async () => {
        const response = await getLessons({ id })

        console.log('obteniendo lecciones')

        if (response.error) {

            console.log(error)
            return
        }
        setLessons(response.body.result)
    }

    if (id !== undefined) useEffect(() => { loadLessons() }, [])

    const removeLesson = async ({ lessonId }) => {

        const newLessonsList = [...lessons].filter((lesson) => lesson.id !== lessonId)

        const response = await deleteLesson({ lesson: lessonId })

        setLessons(newLessonsList)

    }

    const getLesson = async ({ lessonId }) => {
        const response = await getLessonWutId({ id: lessonId })
        console.log(response)
    }

    const addLesson = async () => {
        const response = await createLesson(id)

        return response.body.result.insertId

    }

    return { lessons, removeLesson, addLesson, getLesson }
}