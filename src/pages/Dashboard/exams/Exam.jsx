import { useEffect, useState } from "react";


const Exam = () => {

    const [current, setCurrent] = useState(0)
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [correctQuestion, setCorrectQuestion] = useState([])
    const [incorrectQuestion, setIncorrectQuestion] = useState([])


    const loadExam = async () => {
        const res = await fetch('http://localhost:5173/exam.json')
        const json = await res.json()
        setQuestions(json)
        setCurrentQuestion(json[current])
    }

    useEffect(() => {
        loadExam()
    }, [])

    useEffect(() => {
        setCurrentQuestion(questions[current])
    }, [current])

    const checkQuestion = (e) => {

        const currentSelected = e.currentTarget.innerText
        if (currentSelected === currentQuestion.answers[currentQuestion.correct]) {
            setCorrectQuestion([...correctQuestion, currentQuestion])
        } else {
            setIncorrectQuestion([...incorrectQuestion, currentQuestion])
        }

        const newCurrent = current + 1

        if (newCurrent >= questions.length) {
            setCurrentQuestion([])
            return;
        }

        setCurrent(newCurrent)

    }

    return (
        <div className="flex items-center">
            <div className="max-w-xl m-auto bg-slate-800 p-2">
                <span>Corrects: {correctQuestion?.length} - Incorrect: {incorrectQuestion?.length}</span>
                <h2 className="text-3xl">{currentQuestion?.ask}</h2>
                {currentQuestion?.answers?.map((answer, index) => <button key={answer} onClick={checkQuestion} className={" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                    {answer}
                </button>)}
            </div>
        </div>
    );
}

export default Exam;
