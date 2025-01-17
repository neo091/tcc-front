import TaskContent from "@components/TaskContent";
import { getCompletedTasks } from "@services/Tareas.service";
import { useAuthStore } from "@store/authStore";
import { useTaskStore } from "@store/useTaskStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FinishTask from "@components/FinishTask";
import TaskResume from "@components/TaskResume";


const TareaView = () => {

  const { token } = useAuthStore()
  const { task, isCompleted, setCompleted, resetCompleted, setQuestions, questions, currentQuestion } = useTaskStore()

  const [showTasks, setShowTasks] = useState(false)
  const [showExists, setShowExists] = useState(false)
  const [resume, setResume] = useState([])

  const navigate = useNavigate()

  const loadIsCompleted = async () => {
    await getCompletedTasks({ task: task.id, token })
      .then((result) => {
        if (result.body.length > 0) {
          if (!isCompleted().completed) {
            setCompleted({ id: task.id })
          }
          setResume(result.body[0])
          setShowExists(true)
        } else {
          if (isCompleted().completed) {
            resetCompleted({ id: task.id })
          }
          setQuestions({ token })
          setShowTasks(true)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    loadIsCompleted()

  }, [])

  return (
    <section className='mt-8 animate-fadeIn'>

      <div className="max-w-xl bg-slate-800 m-auto text-center items-center justify-center flex flex-col p-4 rounded ">


        {showTasks && <TaskContent currentQuestion={questions[currentQuestion]} />}

        {showExists && <TaskResume resume={resume} />}


      </div>

      <div className="w-full text-center my-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-blue-500 rounded">Volver</button>
      </div>
    </section>
  );
}

export default TareaView;
