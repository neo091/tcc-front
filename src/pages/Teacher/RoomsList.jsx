import { useEffect, useState } from "react";
import teacherService from "../../services/teacher";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2";
import { useRoomsStore } from "../../store/roomsStore";
import { Card, CardHeader, CardTitle } from "../../components/Card";
import { EyeDropperIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

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

        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Aulas</CardTitle>
                        <Link to={'new'} className="bg-sky-600 block rounded-sm font-semibold px-3 py-2">Agregar</Link>
                    </CardHeader>

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
                                                <EyeIcon className="w-6 h-6" />
                                            </Link>

                                            <Link to={`${item.id}/edit`} className="hover:text-sky-500">
                                                <PencilSquareIcon className="w-6 h-" />
                                            </Link>

                                            <a href={`${item.id}/delete`} onClick={(e) => deleteHandle(e, item.id)} className="hover:text-red-500">
                                                <TrashIcon className="w-6 h-" />
                                            </a>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>

                </Card>

            </div>
        </div>
    );
}

export default RoomsList;