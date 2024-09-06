import { useEffect, useState } from "react";
import InglesImage from '../../assets/a1.jpg'
import Title from "../../components/Title";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { getUserData } from "../../auth";

export const loader = async () => {
    const user = await getUserData()

    return { user }
}

const EnrollButton = ({ onPress, children, ...props }) => {
    return (
        <button {...props} onClick={onPress} className='bg-violet-600 hover:bg-violet-700 shadow-[inset_0px_-6px_0px_0px_#00000050] block sm:inline-block xl:inline-block lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500'>
            {children}
        </button>
    )
}

const Room = ({ room, handle }) => {

    const { nombre_aula, aula_descripcion, nivel, aula_id } = room

    return (
        <>

            <div className='flex gap-2 items-center my-2'>

                <img src={InglesImage} alt="" className='w-80' />

                <div className='flex-1 space-y-2'>
                    <Title>{nombre_aula}</Title>
                    <p>{aula_descripcion}</p>
                    <EnrollButton onPress={handle} data-id={aula_id} >
                        Inscribirme
                    </EnrollButton>
                </div>
            </div>

        </>
    )
}

const Courses = () => {

    const { user } = useLoaderData()

    const [courses, setCourses] = useState([])

    const getCourses = async () => {
        await fetch("http://localhost:4000/api/dashboard/rooms")
            .then(response => response.json())
            .then(data => setCourses(data.body.rooms));
    }
    useEffect(() => { getCourses() }, [])

    const post = async (request) => {
        try {
            const response = await fetch(request);
            const result = await response.json();

            if (result.error) {
                Swal.fire(
                    {
                        title: "Ya estas inscripto",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    }
                )
            } else {
                Swal.fire(
                    {
                        title: "Inscripto",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }
                )
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const enrollHandle = (e) => {

        Swal.fire({
            title: 'Seguro?',
            text: 'Estas seguro de inscribirte a este curso?',
            confirmButtonText: "INCRIBIR AHORA!",
            confirmButtonColor: 'green',
            showCancelButton: true
        }).then(async (result) => {

            if (result.isConfirmed) {
                //console.log(result)
                const request1 = new Request("http://localhost:4000/api/dashboard/rooms/enroll", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ user: user.id, aula: e.target.dataset.id }),
                });
                post(request1)


            }

        })


    }


    return (
        <div>
            {courses.map(course => <Room key={course.aula_id} room={course} handle={enrollHandle} />)}
        </div>
    );
}

export default Courses;
