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

                <Enlace to={`./lessons/${leccion.id}/edit`}>Editar</Enlace>
                <Enlace to={`./lessons/${leccion.id}/delete`} type={"danger"}>Borrar</Enlace>
            </div>
        </>
    )
}


const Room = () => {


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


    return (
        <>
            {
                deleteRoom && <Navigate to={"delete"} />
            }

            <div className="w-full sm:w-2/3 lg:w-2/4  mx-auto">
                <div className="sm:flex xl:flex items-center gap-2">

                    <h1 className="text-5xl font-extrabold my-4">{nombre_aula}</h1>

                    <div>
                        <Enlace to={"./edit"}>Editar</Enlace>

                        <Enlace modal handle={toggleShow} type={"danger"}>Borrar</Enlace>
                    </div>

                </div>
                <p className="mt-3">{nivel}</p>
                <p className="whitespace-pre-wrap text-[20px] mt-3">{aula_descripcion}</p>


                <div className="sm:flex xl:flex  items-center gap-2">

                    <Enlace to={"./NewLesson"}>Crear Leccion</Enlace>
                    <Enlace to={"./NewTask"}>Crear Tarea</Enlace>

                </div>


                <div className="flex-row items-center">

                    {
                        lecciones.map(leccion => <LeccionContent key={leccion.id} leccion={leccion} />)
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