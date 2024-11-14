import { useEffect, useState } from "react";
import Title from "../../components/Title";
import Swal from "sweetalert2";
import { Link, useLoaderData } from "react-router-dom";
import { getUserData } from "../../auth";
import { PlusIcon } from "@heroicons/react/24/solid";

export const loader = async () => {
    const user = await getUserData()

    return { user }
}

const Room = ({ room, handle }) => {

    const { nombre_aula, aula_descripcion, nivel, aula_id } = room

    return (

        <>

            <div className="group p-2 box-border hover:bg-slate-800 rounded-md aspect-square w-40 relative">

                <img src={`https://ui-avatars.com/api/?name=${nombre_aula}&background=0D8ABC&color=fff`} className="w-40" alt="" />
                <span className="truncate">{nombre_aula}</span>

                <button onClick={() => handle(aula_id)} className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full p-2 hover:scale-110 shadow hidden group-hover:block ">
                    <PlusIcon />
                </button>

            </div>

        </>
        // <div className='flex-col'>
        //     <img src={InglesImage} alt="" className='w-40 h-40' />
        //     <div className='flex-1 space-y-2'>
        //         <Title>{nombre_aula}</Title>
        //         <p>{aula_descripcion}</p>
        //         <EnrollButton onPress={handle} data-id={aula_id} >
        //             Inscribirme
        //         </EnrollButton>
        //     </div>
        // </div>
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
                        title: "Ya estas inscrito",
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

    const enrollHandle = (id) => {

        Swal.fire({
            title: 'Seguro?',
            text: 'Estas seguro de inscribirte a este curso?',
            confirmButtonText: "INSCRIBIR AHORA!",
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
                    body: JSON.stringify({ user: user.id, aula: id }),
                });
                post(request1)

                // console.log(id);


            }

        })


    }


    return (
        <>
            <Title>Aulas Virtuales</Title>
            <div className="flex mt-4">
                {courses.map(course => <Room key={course.aula_id} room={course} handle={enrollHandle} />)}
            </div>
        </>
    );
}

export default Courses;
