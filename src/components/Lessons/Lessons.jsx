import React from 'react';
import ListOfLessons from './ListOfLessons';
import { useLessons } from '../../hooks/useLessons';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useLessonStore } from '../../store/lessonStore';

const Lessons = ({ id }) => {

    const { lessons, removeLesson, addLesson } = useLessons({ id })
    const { resetLesson, setLastLessonCreatedId, lastLessonCreatedId } = useLessonStore()
    const navigate = useNavigate()

    const newLessonHandle = async () => {
        await resetLesson()
        const lessonId = await addLesson()
        setLastLessonCreatedId(lessonId)
        navigate(`lessons/${lessonId}/edit`)
    }

    return (
        <>

            <div className="bg-slate-800 rounded mb-4">
                <div className="py-4 px-4 border-b border-slate-700 flex">
                    <h2 className="flex-1">Lecciones</h2>
                    <button onClick={newLessonHandle} >
                        <PlusCircleIcon className="w-8 h-8" />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-2">
                    {
                        lessons.length > 0
                            ? lessons.map((lesson) => <ListOfLessons key={lesson.id} lesson={lesson} removeHandle={removeLesson} />)
                            : 'no lessons'
                    }
                </div>

            </div>



        </>
    )
}

export default Lessons;
