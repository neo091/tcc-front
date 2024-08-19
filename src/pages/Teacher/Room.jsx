import { Link, useLoaderData } from "react-router-dom"
import teacher from "../../services/teacher"
import { useEffect, useState } from "react"
import 'sweetalert2/dist/sweetalert2.min.css'
import DeleteIcon from "../../icons/DeleteIcon"
import EditIcon from "../../icons/EditIcon"

export const loader = async ({ params }) => {
    return { roomId: params.id }
}

const Lesson = (props) => {


    const { lesson } = props
    const { title, id } = lesson

    return (
        <div className="bg-slate-600 rounded flex items-center gap-2 px-2">
            <h3 className="flex-1 hover:cursor-pointer p-2">{title}</h3>

            <Link to={`lessons/${id}/edit`} className="hover:text-sky-500" title="Edit"><EditIcon /></Link>

            <Link to={`lessons/${id}/delete`} className="hover:text-red-500" title="Edit"><DeleteIcon /></Link>

        </div>
    )
}

const Room = () => {

    const { roomId } = useLoaderData()

    const [room, setRoom] = useState([])
    const [lessons, setLessons] = useState([])


    const loadRoom = async () => {
        const room = await teacher.getWhitId(roomId)
        const lessons = await teacher.getLessons(roomId)

        if (room.error || lessons.error) {

            console.log(error)
            return
        }


        setRoom(room.body)
        setLessons(lessons.body.result)

        console.log(room.body)
    }

    useEffect(() => { loadRoom() }, [])

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

                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800 rounded mb-4">
                        <div className="py-4 px-4 border-b border-slate-700 flex">
                            <h2 className="flex-1">Lecciones</h2>
                            <Link to={`./NewLesson`}> + </Link>
                        </div>

                        <div className="p-4 flex flex-col gap-2">
                            {lessons.map((lesson) => <Lesson key={lesson.id} lesson={lesson} />)}
                        </div>

                    </div>

                    <div className="bg-slate-800 rounded mb-4">
                        <div className="py-4 px-4 border-b border-slate-700">
                            <h2>Tareas</h2>
                        </div>

                        <div className="p-4">
                            {room.aula_descripcion}
                        </div>

                    </div>

                    <div className="bg-slate-800 rounded mb-4">
                        <div className="py-4 px-4 border-b border-slate-700">
                            <h2>Examenes</h2>
                        </div>

                        <div className="p-4">
                            {room.aula_descripcion}
                        </div>

                    </div>
                </div>

            </div>


        </>
    );
}

export default Room;    