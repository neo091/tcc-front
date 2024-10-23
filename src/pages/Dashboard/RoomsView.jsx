import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


export const loader = ({ params }) => {

    const { id } = params

    return { roomId: id };
}

const LessonList = ({ lesson }) => {

    const { title, desc } = lesson
    return (

        <Link to={`../lesson/${lesson.id}`} className="block p-2 bg-slate-800 rounded shadow-black shadow-sm">
            <h2 className=" text-3xl font-semibold">{title}</h2>
            <p>{desc}</p>
        </Link>

    )
}


const RoomsView = () => {

    const { roomId } = useLoaderData()

    const [lessons, setLessons] = useState([])

    useEffect(() => {
        getRomLessons()
    }, [])

    const getRomLessons = async () => {
        await fetch(`http://localhost:4000/api/dashboard/rooms/${roomId}/lessons`)
            .then(result => result.json())
            .then(data => setLessons(data.body.result))
    }

    return (
        <div className="space-y-5">
            <h2 className="text-4xl font-semibold">Lecciones</h2>

            {
                lessons.map(lesson => <LessonList key={lesson.id} lesson={lesson} />)
            }

        </div>
    )
}

export default RoomsView;