import { useEffect, useState } from "react"
import { createLesson, deleteLesson, getLessons, getLesson as getLessonWutId } from "../services/teacher"
import { useLessonStore } from "../store/lessonStore"

export function useLessons({ id, lessonId }) {
    const [lessons, setLessons] = useState([])
    const [lesson, setLesson] = useState([])

    const loadLessons = async () => {
        if (!id) return
        const response = await getLessons({ id })

        if (response.error) {

            console.log(error)
            return
        }
        setLessons(response.body.result)
    }

    const removeLesson = async ({ lessonId }) => {

        const newLessonsList = [...lessons].filter((lesson) => lesson.id !== lessonId)

        const response = await deleteLesson({ lesson: lessonId })

        setLessons(newLessonsList)

    }

    const getLesson = async () => {

        if (!lessonId) return

        const response = await getLessonWutId({ id: lessonId })
        console.log(response.body.result)
        setLesson(response.body.result)
    }

    const addLesson = async () => {



        const response = await createLesson(id)

        return response.body.result.insertId
    }


    useEffect(() => {
        loadLessons()
        getLesson()
    }, [])



    return { lessons, removeLesson, addLesson, lesson }
}