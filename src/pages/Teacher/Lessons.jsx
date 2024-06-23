import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLesson } from "../../services/teacher";


export const loader = ({ params }) => {
    const lessonId = params.lessonId
    console.log(lessonId)
    return { lessonId: lessonId }
}

export const DeleteLesson = () => {

    const navigate = useNavigate()
    const { lessonId } = useLoaderData()

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {


        if (result.isConfirmed) {

            deleteLesson(lessonId).then(result => {

                console.log(result)

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se ha borrado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    navigate(-1)
                })
            })

        } else {
            navigate(-1)
        }
    });

}