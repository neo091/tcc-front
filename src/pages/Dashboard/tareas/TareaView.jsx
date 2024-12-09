import FinishTask from '@components/FinishTask';
import TaskContent from '@components/TaskContent';
import TaskLoader from '@components/TaskLoader';
import { getCompletedTasks } from '@services/Tareas.service';
import { useAuthStore } from '@store/authStore';
import { useTaskStore } from '@store/useTaskStore';
import { useEffect, useState } from 'react';

const TareaView = () => {
  const { task, setQuestions, questions, currentQuestion, checkQuestion, replied, setCompleted, completed, resetCompleted } = useTaskStore()
  const [exist, setExist] = useState(false)
  const [loader, setLoader] = useState(true)
  const [existResult, setExistResult] = useState([])
  const { token } = useAuthStore()

  useEffect(() => {
    getCompletedTasks({ task: task.id, token })
      .then(result => {

        if (result.body?.length > 0) {

          console.log(result.body)
          setExist(true)
          setExistResult(result.body)
          setCompleted({ id: task.id })
        } else {
          console.log('no existe cargar datos');
          setQuestions(token)
        }

        setLoader(false)
      })
  }, [])

  return (
    <section className='mt-8'>
      {replied} {questions.length}
      {
        loader ? <TaskLoader /> : replied === questions.length || exist ? (
          <FinishTask exist={exist} result={existResult} />
        ) : (
          <TaskContent
            currentQuestion={questions[currentQuestion]}
            checkQuestion={checkQuestion}
            replied={replied}
            totalQuestions={questions.length}
          />
        )
      }

    </section>
  );
}

export default TareaView;
