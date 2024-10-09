import { Link, useLoaderData } from "react-router-dom"
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useRooms } from "../../hooks/useRooms"
import Lessons from "../../components/Lessons/Lessons"

export const loader = async ({ params }) => {
    return { id: params.id }
}

const Room = () => {

    const { id } = useLoaderData()

    const { room, exams } = useRooms({ id })

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="bg-slate-800 rounded">
                    <div className="py-4 px-4 border-b border-slate-700">
                        <h2 className="font-medium text-2xl capitalize">{room.nombre_aula}</h2>
                        <span className="text-slate-400 ">{room.nivel}</span>
                    </div>

                    <div className="p-4">
                        {room.aula_descripcion}
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                    <Lessons id={id} />

                    <div className="bg-slate-800 rounded mb-4">
                        <div className="flex py-4 px-4 border-b border-slate-700">
                            <h2 className="flex-1">Tareas</h2>
                            <Link to={`./NewTask`}>
                                <PlusCircleIcon className="w-8 h-8" />
                            </Link>
                        </div>

                        <div className="p-4">
                            {room.aula_descripcion}
                        </div>

                    </div>

                    <div className="bg-slate-800 rounded mb-4">
                        <div className="flex py-4 px-4 border-b border-slate-700">
                            <h2 className="flex-1">Exámenes</h2>
                            <Link to={`./Exams/Add`}>
                                <PlusCircleIcon className="w-8 h-8" />
                            </Link>
                        </div>

                        <div className="p-4 flex flex-col gap-2">
                            {
                                exams.map(exam => {

                                    const examConfig = JSON.parse(exam.config)

                                    return (


                                        <div key={`exam-${exam.id}`} className="bg-slate-700 rounded flex items-center gap-2 px-2">
                                            <h3 className="flex-1 hover:cursor-pointer p-2">
                                                {examConfig.title === "" ? `Exam Nº: ${exam.id}` : examConfig.title}
                                            </h3>

                                            <button className="text-sky-500" title="Edit">
                                                <PencilSquareIcon className='w-6 h-6' />
                                            </button>

                                            <button className="text-red-500" title="Delete">
                                                <TrashIcon className='w-6 h-6' />
                                            </button>

                                        </div >
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
}

export default Room;    