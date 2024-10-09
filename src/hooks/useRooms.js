import { useEffect, useState } from "react"
import teacher, { getExams } from "../services/teacher"

export function useRooms({ id }) {
    const [room, setRoom] = useState([])
    const [exams, setExams] = useState([])

    const loadRoom = async () => {
        const room = await teacher.getWhitId(id)

        if (room.error) {

            console.log(error)
            return
        }
        setRoom(room.body)
    }

    const getExamsList = async () => {
        const exams = await getExams(id)
        const { body } = exams.data
        setExams(body.exams)
    }

    useEffect(() => {
        loadRoom()
        getExamsList()
    }, [])

    return { room, exams }
}