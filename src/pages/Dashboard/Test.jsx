import { useEffect, useState } from "react";
import Enlace from "../../components/Enlace";


const Question = ({ currentQuestion, tests, nextHandle }) => {
    return (
        <>
            <div className="p-4 bg-slate-900 rounded-lg flex flex-col items-center content-center relative">
                <div className="absolute bg-slate-700 pt-1 px-4 rounded top-0 -translate-y-3">{currentQuestion + 1} / {tests.length}</div>
                <div className=" opacity-60" >{tests[currentQuestion]?.title}</div>
                <div className=" font-semibold text-2xl">{tests[currentQuestion]?.question}</div>

            </div>

            <div>
                {
                    tests[currentQuestion]?.options.map(option => (
                        <button key={option} onClick={(e) => nextHandle(e)}
                            className=" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                            {option}
                        </button>
                    ))
                }
            </div>
        </>
    )
}


const PointsMessage = ({ points }) => {

    let message = ""


    if (points <= 3) {
        message = <p className=" text-red-600">Poor</p>
    } else if (points <= 4) {
        message = <p className=" text-yellow-600">Good!</p>
    } else {
        message = <p className=" text-green-600">Very Good!</p>
    }

    return message
}


const Finished = ({ resetHandle, tests, answered }) => {


    const correctas = tests.filter((test, index) => test.answer === answered[index]).length

    return (
        <div className="flex flex-1 flex-col justify-center items-center  gap-2">
            <div>{correctas} / {tests.length}</div>
            <PointsMessage points={correctas} />

            <button onClick={resetHandle}
                className=" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                Reset
            </button>
        </div>
    )
}

const InglishTest = () => {

    //json de las preguntas con sus respeectivas respuestas
    const testJSON = [
        {
            "title": "What is the correct form of the verb in the following sentence:",
            "question": "She _____ to the store every day.?",
            "options": [
                "a) go",
                "b) goes",
                "c) going",
                "d) gone"
            ],
            "answer": "b) goes"
        },
        {
            "title": "Choose the correct option:",
            "question": "I have been working here _____ 2015.",
            "options": [
                "a) for",
                "b) since",
                "c) from",
                "d) until"
            ],
            "answer": "b) since"
        },
        {
            "title": "Choose the correct option:",
            "question": "Which of the following sentences is grammatically correct?",
            "options": [
                "a) She don't like pizza.",
                "b) She doesn't likes pizza.",
                "c) She doesn't like pizza.",
                "d) She not likes pizza."
            ],
            "answer": "c) She doesn't like pizza."
        },
        {
            "title": "Fill in the blank:",
            "question": "If I _____ rich, I would travel the world.",
            "options": [
                "a) am",
                "b) was",
                "c) were",
                "d) be"
            ],
            "answer": "c) were"
        },
        {
            "title": "Choose the correct word to complete the sentence:",
            "question": "He is the _____ person I have ever met.",
            "options": [
                "a) kinder",
                "b) kindest",
                "c) more kind",
                "d) most kind"
            ],
            "answer": "b) kindest"
        }
    ]

    const [tests, setTests] = useState([])
    const [currentQuestion, setCurrenQuestion] = useState(0)
    const [answered, setAnswered] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [incorrectAnswers, setIncorrectAnswers] = useState(0)
    const [finished, setFinished] = useState(false)


    useEffect(() => {
        setTests(testJSON)
    }, [])

    const nextHandle = (e) => {

        const current = currentQuestion + 1

        if (current > tests.length) {
            return
        }

        const newAnswered = [...answered, e.target.innerText]

        if (newAnswered.length === tests.length) {
            setFinished(true)
        }


        setAnswered(newAnswered)
        setCurrenQuestion(current)


    }

    const resetHandle = () => {
        setCurrenQuestion(0)
        setAnswered([])
        setFinished(false)
    }

    return (

        <>
            <div className="w-full lg:w-1/3 mx-auto bg-slate-800 p-4 rounded">
                {
                    finished ? <Finished tests={tests} answered={answered} resetHandle={resetHandle} /> : <Question currentQuestion={currentQuestion} tests={tests} nextHandle={nextHandle} />
                }
            </div >
        </>
    );
}

export default InglishTest;