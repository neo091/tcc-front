import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/Card';
import { useRoomsStore } from '../../../store/roomsStore';
import Swal from 'sweetalert2';
import { ArrowLeftEndOnRectangleIcon, ArrowLeftIcon, CheckIcon, ChevronLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { generateExam } from '../../../services/gptService';
import { saveExam } from '../../../services/teacher';
import { useExam } from '../../../hooks/useExam';

export const loader = ({ params }) => {
    return { id: params.id, examID: params.idExam }
}

const ExamGeneratedList = (
    {
        saveHandle,
        examList,
        editAnswerHandle,
        editAskHandle,
        removeAnswerHandle,
        editCorrectAnswerHandle,
        editPointsHandle
    }
) => {

    return (
        examList && examList.length > 0
            ?
            <>
                {
                    examList.map((item, examIndex) => {

                        const { id, ask, points } = item
                        return (
                            <Card key={examIndex}>
                                <CardHeader>
                                    <CardTitle>
                                        {ask} <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAskHandle(examIndex)}>
                                            <PencilIcon className='w-6 h-6' />
                                        </button>
                                    </CardTitle>
                                    <p className='flex gap-4 items-center'>
                                        Points:
                                        <button onClick={() => editPointsHandle(examIndex, "remove")} className='hover:bg-gray-700 transition-colors p-2 '><ChevronLeftIcon className='w-6 h-6' /></button>
                                        <span className='p-2'>{points}</span>
                                        <button onClick={() => editPointsHandle(examIndex, "add")} className='hover:bg-gray-700 transition-colors p-2'> <ChevronRightIcon className='w-6 h-6' /></button>
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <table>
                                        <tbody>
                                            {
                                                item.answers.map((answer, answerIndex) => {
                                                    return <tr key={`${answerIndex}-${answer}`}>
                                                        <td>

                                                            {
                                                                item.correct === answerIndex
                                                                    ? <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, answerIndex)}><CheckIcon className='w-6 h-6 text-green-600' /></span>
                                                                    : <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, answerIndex)}></span>
                                                            }

                                                        </td>
                                                        <td>
                                                            {answer}
                                                        </td>
                                                        <td>
                                                            <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAnswerHandle(answerIndex, examIndex)}>
                                                                <PencilIcon className='w-6 h-6' />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className='inline-block p-2 bg-red-600 rounded' onClick={() => removeAnswerHandle(examIndex, answerIndex)}>
                                                                <TrashIcon className='w-6 h-6' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </CardContent>
                            </Card>
                        )
                    })
                }

                <Card>
                    <CardContent>
                        <button onClick={saveHandle} className='inline-block p-2 shadow-sm shadow-black bg-sky-600 w-full'>GUARDAR</button>
                    </CardContent>
                </Card>
            </> : ""

    )
}
const ExamList = ({ exam, editPointsHandle, editCorrectAnswerHandle, editAskHandle, editAnswerHandle, removeAnswerHandle }) => {
    return (
        exam && exam.length > 0
            ?
            <>
                {
                    exam.map((item, examIndex) => {

                        const { id, ask, points } = item
                        return (
                            <Card key={examIndex}>
                                <CardHeader>
                                    <CardTitle>
                                        {ask} <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAskHandle(examIndex)}>
                                            <PencilIcon className='w-6 h-6' />
                                        </button>
                                    </CardTitle>
                                    <p className='flex gap-4 items-center'>
                                        Points:
                                        <button onClick={() => editPointsHandle(examIndex, "remove")} className='hover:bg-gray-700 transition-colors p-2 '><ChevronLeftIcon className='w-6 h-6' /></button>
                                        <span className='p-2'>{points}</span>
                                        <button onClick={() => editPointsHandle(examIndex, "add")} className='hover:bg-gray-700 transition-colors p-2'> <ChevronRightIcon className='w-6 h-6' /></button>
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <table>
                                        <tbody>
                                            {
                                                item.answers.map((answer, answerIndex) => {
                                                    return <tr key={`${answerIndex}-${answer}`}>
                                                        <td>

                                                            {
                                                                item.correct === answerIndex
                                                                    ? <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, answerIndex)}><CheckIcon className='w-6 h-6 text-green-600' /></span>
                                                                    : <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, answerIndex)}></span>
                                                            }

                                                        </td>
                                                        <td>
                                                            {answer}
                                                        </td>
                                                        <td>
                                                            <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAnswerHandle(answerIndex, examIndex)} >
                                                                <PencilIcon className='w-6 h-6' />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className='inline-block p-2 bg-red-600 rounded' onClick={() => removeAnswerHandle(examIndex, answerIndex)} >
                                                                <TrashIcon className='w-6 h-6' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </CardContent>
                            </Card>
                        )
                    })
                }

                <Card>
                    <CardContent>
                        <button className='inline-block p-2 shadow-sm shadow-black bg-sky-600 w-full'>GUARDAR</button>
                    </CardContent>
                </Card>
            </> : ""
    )
}
const EditExam = () => {

    const { id, examID } = useLoaderData()

    const { exam, setExam, examConfig } = useExam({ id, examID })

    const editAnswerHandle = async (answerIndex, examIndex) => {
        const answerText = exam[examIndex].answers[answerIndex]
        const { value: answer } = await Swal.fire({
            title: "Answer",
            input: "text",
            inputValue: answerText,
            inputLabel: "Your Answer",
            inputPlaceholder: "Enter your Answer",

        });
        if (answer) {
            Swal.fire(`Entered email: ${answer}`);
            const newExam = [...exam]
            newExam[examIndex].answers[answerIndex] = answer
            setExam(newExam)
        }
    }

    const editAskHandle = async (examIndex) => {
        const askText = exam[examIndex].ask
        const { value: askValue } = await Swal.fire({
            title: "ASK",
            input: "text",
            inputValue: askText,
            inputLabel: "Your ASK",
            inputPlaceholder: "Enter your ASK",

        });
        if (askValue) {
            const newExam = [...exam]
            newExam[examIndex].ask = askValue
            setExam(newExam)
        }
    }

    const removeAnswerHandle = (examIndex, answerIndex) => {
        const newExam = [...exam]
        const newAnswers = newExam[examIndex].answers.filter((_, index) => index !== answerIndex)
        newExam[examIndex].answers = newAnswers
        setExam(newExam)
    }

    const editCorrectAnswerHandle = async (examIndex, answerIndex) => {
        const newExam = [...exam]
        newExam[examIndex].correct = answerIndex
        setExam(newExam)
    }

    const editPointsHandle = (examIndex, type) => {

        let currentVal = exam[examIndex].points

        if (type === "add") {
            currentVal++
        }

        if (type === "remove" && currentVal > 0) {
            currentVal--
        }

        const newExam = [...exam]
        newExam[examIndex].points = currentVal
        setExam(newExam)
    }

    return (
        <>
            {
                exam && <div>
                    <div className='grid grid-cols-1 md:grid-cols-2  gap-4    '>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Editar Examen
                                </CardTitle>
                                <div>
                                    {examConfig.level}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <form>
                                    <div className='flex flex-col gap-4 '>
                                        <div>
                                            <label htmlFor="">Titulo</label>
                                            <input name='title' type='text' className='w-full h-10 text-black p-2' placeholder='titulo' defaultValue={examConfig.title} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Preguntas</label>
                                            <select name='amount' className='w-full h-10 text-black'>
                                                {
                                                    [5, 6, 7, 8, 9, 10].map(item => <option key={item} value={item}>{item}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="">Tipo</label>
                                            <select name='type' className='w-full h-10 text-black'>
                                                {
                                                    ["Selección"].map(item => <option key={item} value={item}>{item}</option>)
                                                }
                                            </select>
                                        </div>

                                        <input type="hidden" name='level' />
                                        <button className='inline-block p-2 shadow-sm shadow-black bg-sky-600 w-full'>GENERAR</button>

                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <div className='bg-slate-800 flex flex-col'>
                            <CardHeader>
                                <CardTitle>Total de Puntos</CardTitle>
                            </CardHeader>
                            <div className=' h-full flex items-center justify-center'>
                                <p className='text-6xl m-4'>
                                    {exam.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <ExamList exam={exam}
                            editPointsHandle={editPointsHandle}
                            editCorrectAnswerHandle={editCorrectAnswerHandle}
                            editAskHandle={editAskHandle}
                            editAnswerHandle={editAnswerHandle}
                            removeAnswerHandle={removeAnswerHandle}
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default EditExam;
