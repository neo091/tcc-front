import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@components/Card";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRooms } from "@hooks/useRooms";

const RoomsList = () => {

    const { rooms, createRoomHandle, deleteRoomHandle, editRoomHandle, viewRoomHandle } = useRooms()

    return (

        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Aulas</CardTitle>
                        <button className="bg-sky-600 block rounded-sm font-semibold px-3 py-2" onClick={createRoomHandle}>Crear Sala Virtual</button>
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

                        <div className="p-2">
                            {
                                rooms.map(item =>
                                    <div key={item.aula_id} className="grid grid-cols-3">

                                        <div className="px-3 py-4 font-bold">{item.nombre_aula}</div>
                                        <div className="px-3 py-4">{item.nivel}</div>
                                        <div className="px-3 py-4 flex gap-4 items-center">
                                            <button onClick={() => viewRoomHandle(item)} className="hover:text-sky-500">
                                                <EyeIcon className="w-6 h-6" />
                                            </button>

                                            <button onClick={() => editRoomHandle(item)} className="hover:text-sky-500">
                                                <PencilSquareIcon className="w-6 h-" />
                                            </button>

                                            <button onClick={() => deleteRoomHandle(item.aula_id)} className="hover:text-red-500">
                                                <TrashIcon className="w-6 h-6" />
                                            </button>
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