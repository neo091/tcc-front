import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Card';
import Swal from 'sweetalert2';
import { CheckIcon, ChevronLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { generateExam } from '@services/gptService';
import { saveExam } from '@services/teacher';
import { useRoomStore } from '@store/roomStore';

export const loader = ({ params }) => {
    return { id: params.id }
}

const MultipleChoice = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle, editAnswerHandle, removeAnswerHandle }) => {

    const { id, ask, points } = item


    return (
        <>
            <h3 className='text-3xl font-semibold'>Selección Multiple</h3>
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

        </>
    )
}
const TrueFalseItem = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle }) => {

    const { id, ask, points } = item

    return (
        <>
            <h3 className='text-3xl font-semibold'>Falso Verdadero</h3>
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
                    <section className='flex gap-2'>
                        {
                            item.answers.map((answer, index) => {

                                return (
                                    <>

                                        <article className='flex gap-2'>
                                            {
                                                item.correct === index
                                                    ? <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, index)}><CheckIcon className='w-6 h-6 text-green-600' /></span>
                                                    : <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, index)}></span>
                                            }
                                            <button>{answer}</button>
                                        </article>
                                    </>
                                )
                            })
                        }
                    </section>
                </CardContent>
            </Card >

        </>
    )
}
const Typing = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle }) => {

    const { id, ask, points } = item

    const editCorrect = async () => {

        const { value: answer } = await Swal.fire({
            title: "Answer",
            input: "text",
            inputValue: item.correct,
            inputLabel: "Your Answer",
            inputPlaceholder: "Enter your Answer",

        });
        if (answer) {
            // Swal.fire(`: ${answer}`);
            editCorrectAnswerHandle(examIndex, answer)
        }


    }


    return (
        <>
            <h3 className='text-3xl font-semibold'>Completa la oración</h3>
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
                    <section className='flex gap-2 items-center'>
                        <span className='text-2xl'>{item.correct}</span>
                        <button className='inline-block p-2 bg-sky-600 rounded' onClick={editCorrect}>
                            <PencilIcon className='w-6 h-6' />
                        </button>

                    </section>
                </CardContent>
            </Card >
        </>
    )
}
const Image = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle }) => {

    const { id, ask, points } = item

    const editCorrect = async () => {

        const { value: answer } = await Swal.fire({
            title: "Answer",
            input: "text",
            inputValue: item.correct,
            inputLabel: "Your Answer",
            inputPlaceholder: "Enter your Answer",

        });
        if (answer) {
            // Swal.fire(`: ${answer}`);
            editCorrectAnswerHandle(examIndex, answer)
        }


    }


    return (
        <>
            <h3 className='text-3xl font-semibold'>Traduce la imagen</h3>
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
                    <section className=''>

                        <img src={item?.src} alt="" />
                        <div className='my-4 flex gap-4 items-center'>
                            <span className='text-2xl '>{item.correct}</span>
                            <button className='inline-block p-2 bg-sky-600 rounded' onClick={editCorrect}>
                                <PencilIcon className='w-6 h-6' />
                            </button>
                        </div>

                    </section>
                </CardContent>
            </Card >

        </>
    )
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

                        const { type, ask } = item

                        return (
                            <div key={ask}>
                                {
                                    type === "multiple_choice" && <MultipleChoice item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} editAnswerHandle={editAnswerHandle} removeAnswerHandle={removeAnswerHandle} />
                                }

                                {
                                    type === "true_false" && <TrueFalseItem item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                                }

                                {
                                    type === "typing" && <Typing item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                                }

                                {
                                    type === "typingImage" && <Image item={item} examIndex={examIndex} editAskHandle={editAskHandle} editPointsHandle={editPointsHandle} editCorrectAnswerHandle={editCorrectAnswerHandle} />
                                }
                            </div>

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

const TIPOS = [
    {
        "name": "Selecciona el Tipo",
        "value": 0
    },
    {
        "name": "Selección Multiple",
        "value": "multiple_choice"
    },
    {
        "name": "Falso Verdadero",
        "value": "true_false"
    },
    {
        "name": "Texto",
        "value": "typing"
    },
    {
        "name": "Audio",
        "value": "audio"
    }
]

const AddExam = () => {
    const [exam, setExam] = useState([]);
    const [saveData, setSaveData] = useState([])
    const { room } = useRoomStore()

    const toggleElement = (element, message, enable) => {
        element.innerText = message
        element.enable = enable
    }

    const submitHandle = async (e) => {
        e.preventDefault();
        const buttonSubmit = e.target.querySelector("button")
        toggleElement(buttonSubmit, "GENERANDO...", false)

        const formData = new FormData(e.target);
        const updates = Object.fromEntries(formData);


        if (updates.type === "audio") {

            console.log('es audio')
            return;
        }


        await generateExam(updates).then(result => {

            const { body } = result;

            const newQuestions = [...exam].concat(body.questions)
            setExam(newQuestions)
            toggleElement(buttonSubmit, "GENERAR", true)


        }).catch((err) => {

            Swal.fire({
                timer: 1000,
                title: err.response.data.body?.message,
                showConfirmButton: false
            })

            toggleElement(buttonSubmit, "GENERAR", true)
            // console.log(err.code)
        })

        setSaveData({
            "title": "Examen sin titulo",
            "prompt": updates.title
        });
    }

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

    const saveHandle = async () => {

        const data = {
            "exam": JSON.stringify(exam),
            "config": JSON.stringify(saveData),
            "roomID": room.aula_id
        }

        await saveExam(data).then(result => console.log(result)).catch((err) => console.log(err))
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Generar Examen
                        </CardTitle>
                        <div>
                            {room.nivel}
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submitHandle}>
                            <div className='flex flex-col gap-4 '>
                                <div>
                                    <input name='title' type='text' className='w-full h-10 text-black p-2' placeholder='escribe sobre que quieres que genere...' />
                                </div>
                                <div>
                                    <select name='amount' className='w-full h-10 text-black'>
                                        {
                                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => item === 0 ? <option key={item} value={0} disabled >Cantidad de Preguntas</option> : <option key={item} value={item}>{item}</option>)
                                        }
                                    </select>
                                </div>

                                <div>
                                    <select name='type' className='w-full h-10 text-black'>
                                        {
                                            TIPOS.map(item => item.value !== 0 ? <option key={item.value} value={item.value}>{item.name}</option> : <option key={item.value} value={0} disabled >{item.name}</option>)
                                        }
                                    </select>
                                </div>

                                <input type="hidden" name='level' value={room.nivel} />
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
            <div className='flex flex-col gap-6 mt-4 max-w-[720px] m-auto'>
                <ExamGeneratedList
                    editAnswerHandle={editAnswerHandle}
                    editAskHandle={editAskHandle}
                    removeAnswerHandle={removeAnswerHandle}
                    editCorrectAnswerHandle={editCorrectAnswerHandle}
                    editPointsHandle={editPointsHandle}
                    saveHandle={saveHandle}
                    examList={exam} />

            </div>
        </div>
    );
}

export default AddExam;
