import { redirect } from "react-router-dom"
import teacher from "../../services/teacher"

export const loader = async ({ params }) => {

    const delRoom = await teacher.deleteRoom(params.id).then(result => result).catch((e) => console.log(e))

    console.log(delRoom.body)
    return redirect("/Teacher/Rooms")

}

const RoomDelete = () => { return }

export default RoomDelete