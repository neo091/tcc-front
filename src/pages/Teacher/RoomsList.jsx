import { useEffect, useState } from "react";
import teacherService from "../../services/teacher";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2";
import { useRoomsStore } from "../../store/roomsStore";

const Th = ({ children }) => {
    return (
        <>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-ellipsis">{children}</th>
        </>
    )
}

const RoomsList = () => {

    const { session } = useAuthStore()
    const { rooms, setRooms, isNew } = useRoomsStore()

    useEffect(() => loadClassRooms(), [])

    const loadClassRooms = () => {

        if (!isNew) {
            return
        }
        console.log('load rooms')


        const data = {
            id: session.id,
            token: session.token
        }

        teacherService.getAllRooms(data).then(result => {

            const dataMap = result.body.map(item => {
                return {
                    id: item.aula_id,
                    name: item.nombre_aula,
                    level: item.nivel,
                    desc: item.aula_descripcion,
                }
            })

            setRooms(dataMap)
            setIsNew(false)

        }).catch((e) => console.log(e))

    }

    const deleteHandle = (e, id) => {
        e.preventDefault()

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

                await teacherService.deleteRoom(id).then(() => {

                    const newRoms = rooms.filter((item) => item.id !== id)
                    setRooms(newRoms)

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                })

            }
        });
    }



    return (
        <>



            <div className="bg-slate-800 rounded my-4 px-4">
                <div className="py-4 border-b border-slate-700 flex">
                    <h2 className="text-2xl font-bold flex-1">Lista de Aulas</h2>
                    <Link to={'new'} className="bg-sky-600 block rounded-sm font-semibold px-3 py-2">Agregar</Link>
                </div>

                <div className="flex items-center gap-3 border-none my-2 mx-4">
                    <p>Total: {rooms.length}</p>
                </div>

                <div className="flex flex-col">
                    <div className="grid grid-cols-3 bg-slate-700">
                        <div className="px-4 py-3">
                            <h5 className="uppercase text-sm font-semibold">Nombre</h5>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="uppercase text-sm font-semibold">Nivel</h5>
                        </div>
                        <div className="px-4 py-3">
                            <h5 className="uppercase text-sm font-semibold">Acción</h5>
                        </div>

                    </div>

                    <div>
                        {
                            rooms.map(item =>
                                <div key={item.id} className="grid grid-cols-3">

                                    <div className="px-3 py-4 font-bold">{item.name}</div>
                                    <div className="px-3 py-4">{item.level}</div>
                                    <div className="px-3 py-4 flex gap-4 items-center">
                                        <Link to={`${item.id}`} className="hover:text-sky-500">
                                            <svg
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                height="1.5em"
                                                width="1.5em"
                                            >
                                                <path d="M.2 10a11 11 0 0119.6 0A11 11 0 01.2 10zm9.8 4a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </Link>

                                        <Link to={`${item.id}/edit`} className="hover:text-sky-500">

                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                                height="1.5em"
                                                width="1.5em"
                                            >
                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </Link>

                                        <a href={`${item.id}/delete`} onClick={(e) => deleteHandle(e, item.id)} className="hover:text-red-500">
                                            <svg
                                                viewBox="0 0 1024 1024"
                                                fill="currentColor"
                                                height="1.5em"
                                                width="1.5em"
                                            >
                                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>

        </>
    );
}

export default RoomsList;