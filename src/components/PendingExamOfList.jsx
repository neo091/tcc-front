import { useExamStore2 } from '@store/examStore2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from './CountDown';

const PendingExamOfList = ({ exam, roomId }) => {

  const [isCompleted, setIsCompleted] = useState(false)


  const examConfig = JSON.parse(exam.config);
  const examContent = JSON.parse(exam.exam);
  const expires_at = exam.expires_at
  const created_at = exam.created_at

  const { setExam, setRoomId, setCurrentExam, completedExams } = useExamStore2()
  const navigate = useNavigate()

  const selectExamHandle = () => {

    setExam(examContent)
    setRoomId(roomId)
    setCurrentExam(exam.id)
    navigate("/Dashboard/Exam")
  }



  const checkVisibility = () => {
    const isCompletedExam = completedExams.find(item => item === exam.id)

    if (isCompletedExam) {
      setIsCompleted(true)
    }

    const now = new Date();
    const target = new Date(expires_at);
    const difference = target - now;

    if (difference <= 0) {
      setIsCompleted(true)
      return
    }
  }

  useEffect(() => {
    checkVisibility()
  }, [])


  return (
    <article className="p-2 bg-slate-800 rounded shadow-slate-950 shadow-md hover:shadow-none transition-shadow duration-300 ease-in-out">
      <div className="flex">
        <div className="flex-1">
          <p className="font-bold">{examConfig.title}</p>
          <p >Preguntas: {examContent.length} </p>
          <p className="text-sm text-slate-500">
            <Countdown targetDate={expires_at} />
          </p>
        </div>
        <div>
          {!isCompleted ? <button onClick={selectExamHandle} className="bg-blue-600 px-4 py-2 inline-block h-full w-full rounded-sm shadow-md shadow-slate-950 hover:shadow-none transition-shadow duration-300 ease-in-out ">
            <span className="flex items-center h-full">
              Iniciar examen
            </span>
          </button>
            : <button onClick={selectExamHandle} className="bg-blue-600 px-4 py-2 inline-block h-full w-full rounded-sm shadow-md shadow-slate-950 hover:shadow-none transition-shadow duration-300 ease-in-out ">
              <span className="flex items-center h-full">
                Resumen
              </span>
            </button>
          }

        </div>
      </div>

    </article>
  )
}

export default PendingExamOfList;
