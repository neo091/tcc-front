import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const DeleteLesson = () => {

    const navigate = useNavigate()

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
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            }).then((result) => { navigate(-1) })
        } else {
            navigate(-1)
        }
    });

}