import { Navigate, redirect, useLoaderData } from "react-router-dom"
import teacher from "../../../services/teacher"
import { useEffect, useState } from "react"

export const loader = ({ params }) => {
    return { id: params.id }
}

const DeleteVirtualRoom = () => {
    const { id } = useLoaderData()

    const [message, setMessage] = useState('')

    useEffect(() => {
        teacher.deleteRoom(id).then(result => {

            if (!result.error) {
                setMessage(result.body.message)
            }
        }).catch((e) => console.log(e))
    }, [])


    return (
        <>
            {message !== "" ? <Navigate to={"../AulaVirtual"} /> : "error"}
        </>
    )

}

export default DeleteVirtualRoom