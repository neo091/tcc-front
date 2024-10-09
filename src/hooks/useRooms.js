import { useEffect, useState } from "react"
import teacher from "../services/teacher"

export function useRooms({ id }) {
    const [room, setRoom] = useState([])

    const loadRoom = async () => {
        const room = await teacher.getWhitId(id)

        if (room.error) {

            console.log(error)
            return
        }
        setRoom(room.body)
    }

    useEffect(() => {
        loadRoom()
    }, [])

    return { room }
}