import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";
import teacher from "../../services/teacher";
import Title from "../../components/Title";
import Enlace from "../../components/Enlace";
import { useState } from "react";
import Modal from "../../components/Modal";

export const loader = async ({ params }) => {

    const getRoom = await teacher.getWhitId(params.id)

    return getRoom

}


const Room = () => {


    const { body } = useLoaderData()

    const { nombre_aula, nivel, aula_descripcion, aula_id } = body


    const [showModal, setShowModal] = useState(false)
    const [deleteRoom, setDeleteRoom] = useState(false)

    const toggleShow = (e) => {
        setShowModal(!showModal)
    }

    const confirmHanlde = (e) => {
        setShowModal(!showModal)
        console.log('borrar')

        setDeleteRoom(true)
    }



    return (
        <>
            {
                showModal && <Modal handle={toggleShow} confirm={confirmHanlde} cancelHandle={toggleShow} />
            }
            {
                deleteRoom && <Navigate to={"delete"} />
            }

            <div className="w-full sm:w-2/3 lg:w-2/4  mx-auto">
                <div className="sm:flex xl:flex items-center gap-2">

                    <h1 className="text-5xl font-extrabold my-4">{nombre_aula}</h1>

                    <Enlace to={"./edit"}>Editar</Enlace>

                    <Enlace modal handle={toggleShow} type={"danger"}>Borrar</Enlace>

                </div>
                <p className="mt-3">{nivel}</p>
                <p className="whitespace-pre-wrap text-[20px] mt-3">{aula_descripcion}</p>


                <div className="sm:flex xl:flex  items-center gap-2">
                    <h1 className="text-4xl font-extrabold my-4">Lecciones</h1>

                    <Enlace to={"./NewLesson"}>Crear Leccion</Enlace>

                </div>


            </div>


        </>
    );
}

export default Room;