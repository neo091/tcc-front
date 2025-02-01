import { checkIsCompletedTask, getFeedback, getTask } from "@services/Tareas.service";
import { useAuthStore } from "@store/authStore";
import { useTaskStore } from "@store/useTaskStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskResume from "@components/TaskResume";
import TaskContent from "@components/TaskContent";


const TareaView = () => {

  const { token } = useAuthStore()
  const { taskId } = useTaskStore()
  const navigate = useNavigate()

  const [task, setTask] = useState([])
  const [currentTask, setCurrentTask] = useState(0)
  const [replied, setReplied] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [resume, setResume] = useState(false)
  const [correct, setCorrect] = useState([])
  const [incorrect, setInCorrect] = useState([])
  const [feedback, setFeedback] = useState([])

  const checkQuestion = ({ index }) => {

    const current = task[currentTask]


    if (current.correct === index) {
      setCorrect(correct.concat(current))

    } else {
      setInCorrect(incorrect.concat(current))
    }


    const nextStep = currentTask + 1

    if (nextStep < task.length) {
      setCurrentTask(currentTask + 1)
    }

    if ((replied + 1) === task.length) {
      console.log("completed!");
      setCompleted(true)
    }

    setReplied(replied + 1)

  }

  const checkHandle = ({ index }) => {
    checkQuestion({ index })
  }


  const checkIsCompleted = async () => {
    await checkIsCompletedTask({ taskId, token })
      .then(async res => {

        if (res.body.length === 0) {
          await getTask({ taskId, token })
            .then(result => {

              setTask(JSON.parse(result.body.value))

            })
            .catch(e => {
              console.log(e.message);
            })
        } else {

          const { corrects, incorrects } = res.body

          await getFeedback({ taskId, token })
            .then(result => {
              setFeedback(JSON.parse(result.body.response))

              setCorrect(JSON.parse(corrects))
              setInCorrect(JSON.parse(incorrects))

              setCompleted(true)
              setResume(true)

            })
            .catch(e => {
              console.log(e.message);
            })


        }

      })
      .catch(e => {
        console.log(e.message);
      })
  }

  useEffect(() => {
    checkIsCompleted()
  }, [])

  return (
    <section className='mt-8 animate-fadeIn'>

      <div className="max-w-xl bg-slate-800 m-auto text-center items-center justify-center flex flex-col p-4 rounded ">

        {
          !completed && (
            <TaskContent
              task={task[currentTask]}
              replied={replied}
              checkHandle={checkHandle}
              total={task.length}
            />
          )
        }

        {completed && (
          <TaskResume
            correct={correct}
            incorrect={incorrect}
            taskId={taskId}
            token={token}
            resume={resume}
            feedback={feedback}
          />
        )}


      </div>

      <div className="w-full text-center my-6">
        <button onClick={() => navigate(-1)} className="p-2 bg-blue-500 rounded">Volver</button>
      </div>
    </section>
  );
}

export default TareaView;
