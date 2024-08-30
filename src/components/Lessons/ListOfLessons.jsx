import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { useLessonStore } from '../../store/lessonStore';

const ListOfLessons = ({ lesson, removeHandle }) => {
    const { title, id } = lesson

    const navigate = useNavigate()
    const { setLesson } = useLessonStore()

    const remove = () => {
        Swal.fire(
            {
                title: 'Quieres borrar esta lección?',
                text: 'si borras esta lección ya no podrás recuperarla, estas seguro/a de borrar esto?',
                showCancelButton: true,
                confirmButtonText: "Borrar",
                confirmButtonColor: 'rgb(239 68 68)'
            }
        ).then(result => {
            console.log(result)
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se ha borrado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                })
                removeHandle({ lessonId: id })
            }
        })

    }

    const edit = async () => {

        console.log(lesson)
        await setLesson(lesson)

        navigate(`lessons/${id}/edit`)
    }

    return (
        <div className="bg-slate-700 rounded flex items-center gap-2 px-2">
            <h3 className="flex-1 hover:cursor-pointer p-2">{title}</h3>

            <button onClick={edit} className="text-sky-500" title="Edit">
                <PencilSquareIcon className='w-6 h-6' />
            </button>

            <button onClick={remove} className="text-red-500" title="Delete">
                <TrashIcon className='w-6 h-6' />
            </button>

        </div >
    )
}

export default ListOfLessons;
