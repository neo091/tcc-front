import React, { useEffect, useState } from 'react';
import { useTestStore } from '../../store/testStore';
import { Navigate, useLoaderData } from 'react-router-dom';
import { getResume, getRecomendations, getQuestions } from '../../services/gptService';


const Recomendation = ({ recomendation }) => {
    return (
        <article className=' bg-slate-950 p-2 block rounded my-4'>
            <p className=' font-semibold'>✔ {recomendation.estrategia}</p>
            <p className=' font-normal mt-2'>{recomendation.descripcion}</p>
        </article>
    )
}

const Finished = () => {

    const [resume, setResume] = useState([])
    const [recomendations, setRecomendations] = useState([])

    const reset = useTestStore(state => state.reset)
    const questions = useTestStore(state => state.questions)
    const addNewQuestions = useTestStore(state => state.addNewQuestions)

    const questionsObject = JSON.stringify(questions)

    const loadRecomendations = async () => {
        await getRecomendations(questionsObject).then(response => {
            setRecomendations(response.data.body.res.recomendacion)
        })
    }

    const loadResume = async () => {
        console.log('cargando resumen')
        await getResume(questionsObject).then(response => {
            setResume(response.data.body.res)
            loadRecomendations()
        })
    }

    const loadQuestions = () => {
        getQuestions().then(result => console.log(result))
    }

    const addNewQuestionsHandle = () => {

    }
    return (



        <div className="w-full lg:w-1/2 mx-auto bg-slate-800 p-4 rounded" >

            <p className='p-2 bg-slate-500 block w-[60px] mx-auto'>{resume.respuestasCorrectas} / {resume.totalRespuestas}</p>
            <p className=' my-4 p-2'>{resume.observaciones}</p>

            <div>
                {
                    recomendations.map(recomendation => <Recomendation recomendation={recomendation} />)
                }
            </div>

            {
                questions.length <= 0 && <Navigate to={"../Home"} />
            }
            <button className='w-full p-2 bg-violet-800 rounded' onClick={addNewQuestionsHandle}>Comenzar</button>
            <button className='w-full p-2 bg-violet-800 rounded my-5' onClick={reset}>Reset</button>
        </div>
    );
}

export default Finished;
