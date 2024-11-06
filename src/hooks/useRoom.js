import { updateRoom } from "@services/teacher"
import { useRoomStore } from "@store/roomStore"


export const useRoom = () => {

    const { room, setRoom } = useRoomStore()


    const updateRoomHandle = async (newRoom) => {

        const update = await updateRoom(newRoom).then(result => result).catch((err) => console.log(err))
        setRoom(newRoom)

        return update
    }


    return { room, updateRoomHandle }
}