import { useExamStore2 } from '@store/examStore2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from './CountDown';
import { useRoomStore } from '@store/roomStore';

const PendingExamOfList = ({ exam, roomId }) => {

  const { room } = useRoomStore()

  const [isCompleted, setIsCompleted] = useState(false)
  const [isExpired, setIsExpired] = useState(false)


  const { setExam, setRoomId, setCurrentExam, completedExams, resetExams } = useExamStore2()

  const examConfig = JSON.parse(exam.config);
  const examContent = JSON.parse(exam.exam);
  const expires_at = exam.expires_at

  const navigate = useNavigate()

  const selectExamHandle = () => {

    setExam(examContent)
    setRoomId(room.aula_id)
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
      setIsExpired(true)
    }
  }

  useEffect(() => {
    checkVisibility()
  }, [completedExams])


  return (
    <article className="p-2 bg-slate-800 rounded shadow-slate-950 shadow-md hover:shadow-none transition-shadow duration-300 ease-in-out">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="font-bold text-lg">{examConfig.title}</p>
          <p className='font-semibold text-slate-500'>Preguntas: {examContent.length} </p>

          {
            isCompleted
              ? <p className='text-green-600/80'>Completo!</p>
              : isExpired
                ? <p className='text-red-600/80'>ya expiro!</p>
                : <p className="text-sm text-slate-500"><Countdown targetDate={expires_at} /></p>
          }

        </div>
        <div>

          {
            !isExpired && !isCompleted && <button onClick={selectExamHandle} className="bg-blue-600 px-4 py-2 inline-block  w-full rounded-sm shadow-md shadow-slate-950 hover:shadow-none transition-shadow duration-300 ease-in-out ">
              <p>Iniciar examen</p>
            </button>
          }

          {
            !isExpired && isCompleted && <button onClick={selectExamHandle} className="bg-blue-600 px-4 py-2 inline-block  w-full rounded-sm shadow-md shadow-slate-950 hover:shadow-none transition-shadow duration-300 ease-in-out ">
              <p>Resumen</p>
            </button>
          }

          {
            isExpired && isCompleted && <button onClick={selectExamHandle} className="bg-blue-600 px-4 py-2 inline-block  w-full rounded-sm shadow-md shadow-slate-950 hover:shadow-none transition-shadow duration-300 ease-in-out ">
              <p>Resumen</p>
            </button>
          }

        </div>
      </div>


    </article>
  )
}

export default PendingExamOfList;
