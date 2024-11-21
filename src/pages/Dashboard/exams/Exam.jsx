import { useEffect, useRef, useState } from "react";
import { getAnalice } from "@services/gptService";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useExamStore2 } from "@store/examStore2";


const ExamList = ({ currentQuestion, checkQuestion, checkTyping }) => {
  return (

    <>

      {
        currentQuestion?.type == "multiple_choice" && <div className="flex items-center">
          <div className="max-w-xl m-auto bg-slate-800 p-2">
            <h2 className="text-3xl">{currentQuestion?.ask}</h2>
            {currentQuestion?.answers?.map((answer, index) => <button key={answer} onClick={checkQuestion} className={" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
              {answer}
            </button>)}
          </div>
        </div>
      }

      {
        currentQuestion?.type == "true_false" && <div className="flex items-center">
          <div className="max-w-xl m-auto bg-slate-800 p-2">
            <h2 className="text-3xl">{currentQuestion?.ask}</h2>
            {currentQuestion?.answers?.map((answer, index) => <button key={answer} onClick={checkQuestion} className={" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
              {answer}
            </button>)}
          </div>
        </div>
      }

      {
        currentQuestion?.type == "typing" && <div className="flex items-center">
          <div className="max-w-xl m-auto bg-slate-800 p-2">
            <h2 className="text-3xl">{currentQuestion?.ask}</h2>
            <input type="text" placeholder="typing here!" ref={typingRef} className="w-full p-4 my-4 text-black" />
            <button onClick={checkTyping} className={" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
              Aceptar
            </button>
          </div>
        </div>
      }

      {
        currentQuestion?.type == "typingImage" && <div className="flex items-center ">
          <div className="max-w-xl m-auto bg-slate-800 p-2 flex flex-col gap-4 ">
            <h2 className="text-3xl">{currentQuestion?.ask}</h2>
            <img src={currentQuestion?.src} alt="" className="rounded shadow" />
            <input type="text" placeholder="typing here!" ref={typingRef} className="w-full p-4 text-black" />
            <button onClick={checkTyping} className={" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center font-semibold text-white p-4 transition-all duration-500"}>
              Aceptar
            </button>
          </div>
        </div>
      }
    </>

  )
}

const Corrects = ({ questions }) => {

  console.log(questions)
  return
}
const Exam = () => {

  const { exam, roomId, currentExam, setCompletedExams, completedExams } = useExamStore2()

  const navigate = useNavigate()

  const [current, setCurrent] = useState(0)
  const [questions, setQuestions] = useState(exam)
  const [currentQuestion, setCurrentQuestion] = useState(exam[current])
  const [correctQuestion, setCorrectQuestion] = useState([])
  const [incorrectQuestion, setIncorrectQuestion] = useState([])
  const [finalizado, setFinalizado] = useState(false)
  const [notaExamen, setNotaExamen] = useState([])
  const typingRef = useRef()
  const [isCompleted, setIsCompleted] = useState(false)

  const loadExam = async () => {
    // const res = await fetch('http://localhost:5173/exam.json')
    // const json = await res.json()
    // setQuestions(json)
    // setCurrentQuestion(json[current])

    // setQuestions(exam)
    // setCurrentQuestion(exam[current])
    const isCompletedExam = completedExams.find(item => item === currentExam)

    if (isCompletedExam) {
      setIsCompleted(true)
    }

    // console.log(isCompletedExam)

  }

  useEffect(() => {
    loadExam()
  }, [])

  useEffect(() => {
    setCurrentQuestion(questions[current])
  }, [current])

  const finishExam = async () => {

    getAnalice({
      correct: correctQuestion,
      incorrect: incorrectQuestion
    })
      .then((response) => {
        setFinalizado(true)
        setNotaExamen(JSON.parse(response.body.res))
        setCompletedExams(currentExam)
        // console.log(JSON.parse(response.body.res))
      })
      .catch((e) => console.error(e.message))
  }

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
      finishExam()

      return;
    }

    setCurrent(newCurrent)

  }

  const checkTyping = (e) => {

    const typingText = typingRef.current.value
    const currentText = typingText.toLowerCase()
    const currentCorrect = currentQuestion?.correct.toLowerCase()

    if (currentCorrect == currentText)
      setCorrectQuestion([...correctQuestion, currentQuestion])
    else
      setIncorrectQuestion([...incorrectQuestion, currentQuestion])

    typingRef.current.value = ""
    const newCurrent = current + 1

    if (newCurrent >= questions.length) {
      setCurrentQuestion([])

      finishExam()

      return;
    }

    setCurrent(newCurrent)

  }



  return (
    <>
      {isCompleted
        ? <Corrects questions={correctQuestion} />
        : <ExamList currentQuestion={currentQuestion} checkQuestion={checkQuestion} checkTyping={checkTyping} />}

      {
        finalizado && <>

          <div className="text-center flex flex-col gap-3 items-center justify-center bg-slate-800 rounded max-w-[600px] m-auto py-8">

            {notaExamen.percentage > 70 ? <CheckBadgeIcon className="w-24 text-green-500" /> : <XCircleIcon className="w-24 text-red-600" />}
            <h2 className="text-2xl font-semibold">Has terminado el examen</h2>
            <p>Su puntuación: {correctQuestion.reduce((acc, item) => acc + item.points, 0)}/{exam.reduce((acc, item) => acc + item.points, 0)} ({notaExamen.percentage}%)</p>
            <p>{notaExamen.recommendations}</p>

          </div>

          <Link to={`/Dashboard/Rooms/${roomId}`} className=" bg-violet-600 px-4 py-2 rounded w-[200px] m-auto block text-center mt-8">Volver</Link>

        </>
      }
    </>
  );
}

export default Exam;
