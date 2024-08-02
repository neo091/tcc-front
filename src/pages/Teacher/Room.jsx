import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";
import teacher from "../../services/teacher";
import Enlace from "../../components/Enlace";
import { useState } from "react";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const loader = async ({ params }) => {

    const room = await teacher.getWhitId(params.id)
    const lessons = await teacher.getLessons(params.id)

    return { room: room.body, lessons: lessons.body }

}


const LeccionContent = ({ leccion }) => {

    let { title, desc } = leccion


    if (desc === null) {
        desc = `Sin descripción`
    }

    return (
        <>
            <div className="p-2 bg-gray-800 rounded my-4">

                <h3 className=" text-xl font-semibold">{title}</h3>
                <p>{desc}</p>

                <div className="flex">
                    <Enlace to={`./lessons/${leccion.id}/edit`}>Editar</Enlace>
                    <Enlace to={`./lessons/${leccion.id}/delete`} type={"danger"}>Borrar</Enlace>
                </div>
            </div>
        </>
    )
}

const Task = ({ task }) => {
    return (
        <>
            <div className="p-2 bg-gray-800 rounded my-4">

                <h3 className=" text-xl font-semibold">TAREA {task.id}</h3>

                <div className="flex">
                    <Enlace to={`./edit`}>Editar</Enlace>
                    <Enlace to={`./delete`} type={"danger"}>Borrar</Enlace>
                </div>
            </div>
        </>
    )
}


const Room = () => {

    const [tabSelected, setTabSelected] = useState(1)

    const { room, lessons } = useLoaderData()

    const { nombre_aula, nivel, aula_descripcion, aula_id } = room

    const [deleteRoom, setDeleteRoom] = useState(false)

    const [lecciones, setLecciones] = useState(lessons.result)

    const toggleShow = (e) => {
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
                }).then((result) => setDeleteRoom(true))
            }
        });
    }


    const [tareas, setTareas] = useState(
        [
            {
                id: 1,
                tarea_content: [
                    {
                        id: 1,
                        type: 1,
                        value: "Hola mundo"
                    },
                    {
                        id: 2,
                        type: 1,
                        value: "Hola mundo 2"
                    }
                ]
            },
            {
                id: 2,
                tarea_content: [
                    {
                        id: 1,
                        type: 1,
                        value: "Hola mundo"
                    },
                    {
                        id: 2,
                        type: 1,
                        value: "Hola mundo 2"
                    }
                ]
            }
        ]
    )


    const selectTableHandle = (e, tab) => {
        e.preventDefault()
        setTabSelected(tab)

    }


    return (
        <>
            {
                deleteRoom && <Navigate to={"delete"} />
            }

            <div className="w-full sm:w-2/3 lg:w-2/4  mx-auto">
                <h1 className="text-4xl font-extrabold my-4">{nombre_aula}</h1>

                <div className="flex gap-2">
                    <Enlace to={"./edit"}>Editar</Enlace>

                    <Enlace type={"danger"}>Borrar</Enlace>
                </div>
                <p className="mt-3">{nivel}</p>
                <p className="whitespace-pre-wrap text-[20px] mt-3">{aula_descripcion}</p>


                <div className="sm:flex xl:flex  items-center gap-2">

                    <Enlace to={"./NewLesson"}>Crear Leccion</Enlace>
                    <Enlace to={"./NewTask"}>Crear Tarea</Enlace>
                    <Enlace to={"./NewTask"}>Generar Exámen</Enlace>

                </div>


                <div className="flex justify-between">

                    <a href="#" onClick={(e) => selectTableHandle(e, 1)} className="w-full bg-yellow-600 hover:bg-yellow-700  block sm:inline-block xl:inline-block lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                        Lecciones
                    </a>

                    <a href="#" onClick={(e) => selectTableHandle(e, 2)} className="w-full bg-purple-600 hover:bg-purple-700  block sm:inline-block xl:inline-block lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                        Tareas
                    </a>

                    <a href="#" onClick={(e) => selectTableHandle(e, 2)} className="w-full bg-red-600 hover:bg-red-700  block sm:inline-block xl:inline-block lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                        Examenes
                    </a>

                </div>


                <div className="flex-row items-center">

                    {
                        tabSelected === 1 && lecciones.map(leccion => <LeccionContent key={leccion.id} leccion={leccion} />)
                    }

                    {

                        tabSelected === 2 && tareas.map(tarea => <Task key={tarea.id} task={tarea} />)
                    }

                </div>


            </div>


        </>
    );
}

export default Room;


/*
const getMonthInSpanish = (month) => {

        const mes = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Setiembre",
            "Octubre",
            "Nobiembre",
            "Diciembre",
        ]

        return mes[month]
    }


    const fechaLimite = (fecha) => {
        const today = new Date()
        const date = new Date(fecha)

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const hoy = day === today.getDate().toString().padStart(2, "0")
            ? "Hoy"
            : `${day} ${getMonthInSpanish(date.getMonth())}`

        return `Fecha Límite: ${hoy} antes de ${hours}:${minutes}`;
    }
*/