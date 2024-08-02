import React, { useEffect, useState } from 'react';
import { getUserData } from '../../auth';
import { useLoaderData } from 'react-router-dom';
import parseHTML from 'html-react-parser'
import { BeakerIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/16/solid';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';

export const loader = ({ params }) => {

    const id = params.id

    return { id: id }

}

const Lesson = ({ lesson }) => {

    return (
        <div className='flex justify-between items-center gap-2'>
            {lesson.type == 1 &&
                <>
                    <div>{parseHTML(lesson.value)}</div>
                    <div >
                        <span className=' bg-red-700 w-4 h-4 text-center rounded-full text-xs absolute ml-4 mt-[-5px]'>0</span>
                        <div className=' bg-blue-400 absolute p-2 max-h-[200px] hidden overflow-y-scroll'>
                            <p>Hola esto es un comentario</p>
                        </div>
                        <ChatBubbleLeftEllipsisIcon className="size-6 text-violet-600 hover:cursor-pointer" />
                    </div>
                </>}
            {lesson.type === 2 && <div><h2 className="font-bold text-2xl ">{lesson.value}</h2></div>}
            {lesson.type === 3 && <img src={lesson.value} />}


        </div>
    )

}


const Course = () => {

    const { id } = useLoaderData()

    const [lessons, setLessons] = useState([])

    const getMyCourseInfo = async () => {

        const user = await getUserData()
        await fetch(`http://localhost:4000/api/dashboard/courses/${id}`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(responses => responses.json())
            .then(data => setLessons(data.body.result))

    }

    useEffect(() => {
        getMyCourseInfo()
    }, [])

    return (
        <div className='flex flex-col space-y-4'>
            {
                lessons.map(lesson => <Lesson key={lesson.ID} lesson={lesson} />)
            }
        </div>
    );
}

export default Course;
