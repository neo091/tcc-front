import { useEffect, useState } from "react";
import { useTestStore } from "../../store/testStore";
import { Navigate, useNavigate } from "react-router-dom";
import { getQuestions, getResume, getRecomendations } from "../../services/gptService";

const BackgroundTest = (info, index) => {

    const { userSelectedAnswer, answer } = info

    // si el usuario no a seleccionado nada
    if (userSelectedAnswer == null) return ' bg-violet-600 hover:bg-violet-700 '
    // si el usuario ya selecciono una pregunta pero es incorrecta
    if (index !== answer && index !== userSelectedAnswer) return '  bg-gray-600 '
    // la seleccion correcta
    if (index === answer) return ' bg-green-600 '
    // si la seleccion es incorrecta
    if (index === userSelectedAnswer) return ' bg-red-600 '
    // si no es ninguna de las anteriores
    return 'bg-violet-600 hover:bg-violet-700'

}

const Finished = () => {

    const [resume, setResume] = useState(null)
    const [recomendations, setRecomendations] = useState(null)
    const addToHistory = useTestStore(state => state.addToHistory)

    const loadQuestions = () => {
        getQuestions().then(result => console.log(result))
    }
    const questions = useTestStore(state => state.questions)

    const questionsObject = JSON.stringify(questions)

    const loadRecomendations = async (rec) => {
        if (recomendations != null) {
            return
        } else {
            await getRecomendations(JSON.stringify(rec)).then(response => {
                setRecomendations(response.body.res.recomendacion)
                addToHistory(rec)

                console.log(rec)
            })
        }
    }


    const loadResume = async () => {

        if (resume != null) {
            return
        } else {
            await getResume(questionsObject).then(response => {
                setResume(response.data.body.res)
                loadRecomendations(response.data.body.res)
            })
        }
    }

    loadResume()

    const replied = useTestStore(state => state.replied)

    const correctsAnserts = questions.filter((question) => question.isCorrectUserAnswer)
    return (
        <div className="flex flex-1 flex-col gap-4">

            <p className=" text-center">Correctas ✅: {resume?.respuestasCorrectas} Incorrectas ❌: {resume?.respuestasIncorrectas}</p>

            <p className="flex flex-1 flex-col justify-center items-center px-6 py-2 bg-slate-700 rounded-lg">
                <span className=" text-5xl font-semibold">{resume?.porcentajeAciertos}</span>
                <span>Puntuación</span>
            </p>


            <div>
                <h2 className="text-2xl font-semibold">Resumen:</h2>
                {resume != null && <p className="ms-4">{resume?.observaciones}</p>}
            </div>

            <div>
                <h2 className=" text-2xl font-semibold">Recomendaciones:</h2>
                <section>

                    {recomendations?.map((recomendacion) => (
                        <article className=" my-4 ms-4 bg-slate-900 p-4 rounded-lg">
                            <h3 className=" font-semibold">{recomendacion?.estrategia}:</h3>
                            <p>{recomendacion?.descripcion}</p>
                        </article>
                    ))}

                </section>
            </div>
        </div>
    )
}

const ShowQuestions = ({ questions }) => {
    const currentTest = useTestStore(state => state.currentTest)
    const selectTest = useTestStore(state => state.selectTest)

    const questionInfo = questions[currentTest]
    const optionsInfo = questionInfo.options

    const handleClick = (index) => {
        selectTest(questionInfo.id, index)
    }

    return (
        <>

            <div className="p-4 bg-slate-900 rounded-lg flex flex-col items-center content-center relative">
                <div className="absolute bg-slate-700 pt-1 px-4 rounded top-0 -translate-y-3">{currentTest + 1} / {questions.length}</div>
                <div className=" opacity-60" >{questionInfo.title}</div>
                <div className=" font-semibold text-2xl">{questionInfo.question}</div>

            </div>

            <div>
                {
                    optionsInfo.map((option, index) => (
                        <button key={index} onClick={() => handleClick(index)} disabled={questionInfo.userSelectedAnswer != null}
                            className={BackgroundTest(questionInfo, index) + " rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                            {option}
                        </button>
                    ))
                }


            </div>
            <div>

            </div>
        </>
    )
}

const InglishTest = () => {
    const navigate = useNavigate()
    const questions = useTestStore(state => state.questions)
    const reset = useTestStore(state => state.reset)
    const replied = useTestStore(state => state.replied)

    const ResetQuestions = () => {
        reset()
        navigate("/Dashboard")
    }

    return (

        <>
            <div className="max-w-full md:max-w-4xl lg:max-w-2xl mx-auto bg-slate-800 p-4 rounded" >

                {
                    questions.length > 0 && replied < questions.length && < ShowQuestions questions={questions} />
                }

                {
                    replied === questions.length && replied != 0 && <Finished />
                }



            </div>
            <button className=" font-bold uppercase bg-violet-700 w-40 mx-auto p-2 block my-5 rounded-lg" onClick={ResetQuestions}>Reiniciar</button>
        </>
    )
}

export default InglishTest