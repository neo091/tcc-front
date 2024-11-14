import { useEffect, useState } from "react"
import { createRoom, deleteRoom, getRoom, getRooms } from "@services/teacher"
import { useRoomStore } from "@store/roomStore"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

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

        Swal.fire(
            {
                title: 'Borrar Aula?',
                text: 'si borras esta Aula ya no podrás recuperarla, estas seguro/a de borrar esto?',
                showCancelButton: true,
                confirmButtonText: "Borrar",
                confirmButtonColor: 'rgb(239 68 68)'
            }
        ).then(async (result) => {
            if (result.isConfirmed) {

                await deleteRoom(aula_id).then(result => console.log(result)).catch((err) => console.log(err))

                const newRooms = [...rooms].filter((room) => room.aula_id !== aula_id)
                setRooms(newRooms)

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se ha borrado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                })

            }
        })


    }

    const editRoomHandle = (room) => {
        setRoom(room)
        navigate("/Teacher/Rooms/Edit")
    }

    const viewRoomHandle = (room) => {
        setRoom(room)
        navigate(`/Teacher/Rooms/${room.aula_id}`)
    }

    useEffect(() => {
        loadRooms()
    }, [])

    return { rooms, createRoomHandle, deleteRoomHandle, editRoomHandle, viewRoomHandle }
}