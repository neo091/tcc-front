import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import parseHTML from 'html-react-parser'
import AudioButton from "../../components/AudioButton"


export const loader = ({ params }) => {
    return { id: params.id }
}


const Lesson = ({ lesson }) => {

    const { type, value } = lesson

    return (
        <div className='flex justify-between items-center gap-2'>
            {type == 1 && parseHTML(value)}
            {type === 2 && <div><h2 className="font-bold text-2xl ">{value}</h2></div>}
            {type === 3 && <img src={value} />}
            {type === 4 && <AudioButton url={value} />}
        </div>
    )

}


const LessonView = () => {


    const { id } = useLoaderData()

    const [lessons, setLessons] = useState([])

    const getLessonsContent = async () => {
        await fetch(`http://localhost:4000/api/dashboard/rooms/lessons/${id}`)
            .then(result => result.json())
            .then(data => setLessons(data.body.result))
    }

    useEffect(() => {
        getLessonsContent()
    }, [])



    return (
        <div className="max-w-[720px] mx-auto flex flex-col space-y-4">
            {
                lessons.map(lesson => <Lesson lesson={lesson} key={lesson.ID} />)
            }
        </div>
    )
}

export default LessonView