import { Content } from '@components/LessonContent';
import { getContents } from '@services/UserContentsService';
import { useAuthStore } from '@store/authStore';
import { useLessonStore } from '@store/lessonStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LessonContent = () => {

  const { lesson } = useLessonStore()
  const { token } = useAuthStore()

  const [contents, setContents] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const loadContents = async () => {

    const contentsResult = await getContents({ lesson: lesson.id, token })

    if (contentsResult.error) {
      return
    }

    const { contents } = contentsResult.body
    setContents(contents)
    setCurrentQuestion(JSON.parse(contents[currentIndex].value))
  }

  useEffect(() => { loadContents() }, [])

  const navigate = useNavigate()

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setIsAnswerSubmitted(true)
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + currentQuestion.points)
    }
  }

  const handleNext = () => {
    if (currentIndex < contents.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentQuestion(JSON.parse(contents[currentIndex + 1].value))
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
    } else {
      setQuizCompleted(true)
    }
  }


  const progress = ((currentIndex + 1) / contents.length) * 100


  if (quizCompleted) {
    return (
      <div className='p-4 bg-slate-800 rounded-md max-w-[500px] m-auto border-[1px] border-slate-700'>
        quiz completed
        <button onClick={() => navigate(-1)} className='px-4 py-2 rounded bg-blue-700'>Volver</button>
      </div>
    )
  }


  return (
    <div className='mt-6 flex flex-col gap-4 justify-center'>
      {contents.length > 0 ? (
        <div className='p-4 bg-slate-800 rounded-md max-w-[500px] m-auto border-[1px] border-slate-700'>
          <h2 className='font-semibold text-3xl'>{lesson.title}</h2>
          <progress className='w-full ' max="100" value={progress}>{progress}%</progress>
          <p className='font-semibold text-2xl'>{currentQuestion.ask}</p>
          <div className='grid grid-cols-1 gap-4 mt-4 mb-4'>
            {currentQuestion.answers.map((answer, index) => (
              <div className='flex gap-2 items-center'>
                <input className='w-6 h-6' type="radio" name="answer" id={answer} value={answer} disabled={isAnswerSubmitted} onChange={(value) => setSelectedAnswer((index))} />
                <label className='text-xl' for={answer}>{answer}</label>
              </div>
            ))}

          </div>

          {isAnswerSubmitted && (
            <div className={`mt-4 p-2 rounded ${selectedAnswer === currentQuestion.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {selectedAnswer === currentQuestion.correct ? 'Correct!' : `Incorrect. The correct answer is: ${currentQuestion.answers[currentQuestion.correct]}`}
            </div>
          )}

          <div className='flex items-center'>
            <p className='flex-1'>Question {currentIndex + 1} of {contents.length}</p>

            {!isAnswerSubmitted ? (
              <button onClick={handleSubmit} className="bg-blue-600 px-4 py-2  rounded-md shadow-md shadow-slate-950/50 hover:shadow-none transition-shadow duration-300 ease-in-out ">
                <p>Check Answer</p>
              </button>
            ) : (
              <button onClick={handleNext} className="bg-blue-600 px-4 py-2  rounded-md shadow-md shadow-slate-950/50 hover:shadow-none transition-shadow duration-300 ease-in-out  " >
                <p>{currentIndex === contents.length - 1 ? 'Finish Quiz' : 'Next Question'}</p>
              </button>
            )}





          </div>

        </div>
      ) : 'loading'}
      <button onClick={() => navigate(-1)} className="bg-blue-600 px-4 py-2  rounded-md shadow-md shadow-slate-950/50 hover:shadow-none transition-shadow duration-300 ease-in-out " >Volver</button>
    </div>
  );
}

export default LessonContent;
