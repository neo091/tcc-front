import { useEffect, useState } from "react"
import { createRoom, deleteRoom, getRoom, getRooms } from "@services/teacher"
import { useRoomStore } from "@store/roomStore"
import { useNavigate } from "react-router-dom"

export function useRooms() {
    const [rooms, setRooms] = useState([])
    const { setRoom } = useRoomStore()
    const navigate = useNavigate()

    const loadRooms = async () => {

        await getRooms().then((response) => {
            setRooms(response.body)
        })
    }

    const createRoomHandle = async () => {
        await createRoom().then(response => {

            const { insertId } = response.body

            getRoom(insertId)
                .then(result => {

                    const newRoom = result.body
                    setRoom(newRoom)

                    const newRooms = [...rooms].concat(newRoom)
                    setRooms(newRooms)

                    navigate("/Teacher/Rooms/Edit")
                })
                .catch((err) => console.error(err))
        })
    }

    const deleteRoomHandle = (aula_id) => {

        deleteRoom(aula_id).then(result => console.log(result)).catch((err) => console.log(err))

        const newRooms = [...rooms].filter((room) => room.aula_id !== aula_id)
        setRooms(newRooms)
    }

    const editRoomHandle = (room) => {
        setRoom(room)
        navigate("/Teacher/Rooms/Edit")
    }

    useEffect(() => {
        loadRooms()
    }, [])

    return { rooms, createRoomHandle, deleteRoomHandle, editRoomHandle }
}