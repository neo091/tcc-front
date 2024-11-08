import { useAuthStore } from "@store/authStore";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


export const loader = ({ params }) => {

    const { id } = params

    return { roomId: id };
}

const LessonList = ({ lesson }) => {

    const { title, desc } = lesson
    return (

        <Link to={`../lesson/${lesson.id}`} className="block p-2 bg-slate-800 rounded shadow-slate-950 shadow-md hover:shadow-none transition-shadow duration-300 ease-in-out">
            <h2 className=" text-3xl font-semibold">{title}</h2>
            <p>{desc}</p>
        </Link>

    )
}


const RoomsView = () => {
    const { session } = useAuthStore()
    const { roomId } = useLoaderData()

    const [lessons, setLessons] = useState([])

    const [pendingExams, setPendingExams] = useState([])

    useEffect(() => {
        getRomLessons()
        getRomPendingExams()
    }, [])

    const getRomLessons = async () => {
        await fetch(`http://localhost:4000/api/dashboard/rooms/${roomId}/lessons`)
            .then(result => result.json())
            .then(data => setLessons(data.body.result))
    }

    const getRomPendingExams = async () => {
        await fetch(`http://localhost:4000/api/dashboard/rooms/${roomId}/exams`, {
            headers: {
                "Authorization": `Bearer ${session.token}`,
                "Content-Type": "application/json",
            }
        })
            .then(result => result.json())
            .then(data => {
                setPendingExams(data.body.exams)
                console.log(data.body.exams)
            })

        // console.log(session.token)
    }


    return (
        <div className="space-y-5">
            <h2 className="text-4xl font-semibold">Lecciones</h2>
            <section className="flex flex-col gap-3">

                {
                    lessons.map(lesson => <LessonList key={lesson.id} lesson={lesson} />)
                }
            </section>

            <h2 className="text-4xl font-semibold">Exámenes Pendientes</h2>
            <section className="flex flex-col gap-3">

                {
                    pendingExams.map(exam => {

                        const examConfig = JSON.parse(exam.config);
                        const examContent = JSON.parse(exam.exam);

                        return (
                            <article key={exam.id} className="p-2 bg-slate-800 rounded shadow-slate-950 shadow-md hover:shadow-none transition-shadow duration-300 ease-in-out">
                                <div className="flex">
                                    <div className="flex-1">
                                        <h2 className="font-semibold text-xl">{examConfig.title} {exam.id}</h2>
                                        <p className="font-medium">Preguntas: 5 </p>
                                        <p className="font-medium">Duración: 15 min.</p>
                                    </div>
                                    <div>
                                        <Link to={"/Dashboard/Exam"} className="bg-blue-600 px-4 py-2 inline-block h-full w-full rounded-sm shadow-md shadow-slate-950 hover:shadow-none transition-shadow duration-300 ease-in-out ">
                                            <span className="flex items-center h-full">
                                                Iniciar examen
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                            </article>
                        )
                    })
                }


            </section>

        </div>
    )
}

export default RoomsView;