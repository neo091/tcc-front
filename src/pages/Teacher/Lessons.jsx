import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLesson } from "../../services/teacher";
import { useEffect } from "react";


export const loader = ({ params }) => {
    const lessonId = params.lessonId
    const id = params.id
    console.log(lessonId)
    return { lessonId: lessonId, id }
}

export const DeleteLesson = () => {

    const navigate = useNavigate()
    const { lessonId, id } = useLoaderData()

    useEffect(() => ConfirmDelete(), [])


    const ConfirmDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {

                await deleteLesson(lessonId)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se ha borrado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    navigate(`../${id}`)
                })

            } else {
                navigate(`../${id}`)
            }
        });
    }



}