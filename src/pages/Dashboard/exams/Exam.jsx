import { useEffect, useRef, useState } from "react";
import { getAnalice } from "@services/gptService";
import { useExamStore2 } from "@store/examStore2";
import { ExamResume } from "@components/ExamResume";

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

const Exam = () => {

  const { exam, currentExam, setCompletedExams, completedExams } = useExamStore2()


  const [current, setCurrent] = useState(0)
  const [questions, setQuestions] = useState(exam)
  const [currentQuestion, setCurrentQuestion] = useState(exam[current])
  const [correctQuestion, setCorrectQuestion] = useState([])
  const [incorrectQuestion, setIncorrectQuestion] = useState([])
  const [notaExamen, setNotaExamen] = useState([])
  const typingRef = useRef()
  const [isCompleted, setIsCompleted] = useState(false)

  const loadExam = async () => {

    const isCompletedExam = completedExams.find(item => item === currentExam)

    if (isCompletedExam) {
      setIsCompleted(true)
    }

  }

  useEffect(() => {
    loadExam()
  }, [])

  useEffect(() => {
    setCurrentQuestion(questions[current])
  }, [current])

  const finishExam = async () => {

    await getAnalice({
      correct: correctQuestion,
      incorrect: incorrectQuestion
    })
      .then((response) => {

        setNotaExamen(JSON.parse(response.body.res))
        setCompletedExams(currentExam)
        setIsCompleted(true)

        const data = {
          exam_id: currentExam,
          notaExamen: JSON.parse(response.body.res)
        }

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

    if (currentCorrect == currentText) {
      setCorrectQuestion([...correctQuestion, currentQuestion])
    }
    else {

      setIncorrectQuestion([...incorrectQuestion, currentQuestion])
    }
    typingRef.current.value = ""
    const newCurrent = current + 1

    if (newCurrent >= questions.length) {

      finishExam()
      setCurrentQuestion([])

      return;
    }

    setCurrent(newCurrent)

  }

  return (
    <div className="my-4 h-[80vh] justify-center items-center flex flex-col">
      {isCompleted
        ? <ExamResume currentExamId={currentExam} notaExamen={notaExamen} />
        : <ExamList currentQuestion={currentQuestion} checkQuestion={checkQuestion} checkTyping={checkTyping} />}
    </div>
  );
}

export default Exam;
