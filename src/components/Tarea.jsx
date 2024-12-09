import { useTaskStore } from "@store/useTaskStore";
import Countdown from "./CountDown";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Tarea = ({ tarea }) => {
  const { setTask, completed, resetCompleted, resetQuestions } = useTaskStore()
  const navigate = useNavigate()

  const isCompleted = completed.includes(tarea.id)
  const selectTask = () => {

    setTask(tarea)
    navigate(`./TaskView`)
  }

  useEffect(() => {
    //console.log(completed);
    //resetCompleted()
    //resetQuestions()
  }, [])


  return (

    <article onClick={selectTask} className={`${completed.includes(tarea.id) ? 'bg-slate-800' : 'bg-slate-700'} flex p-2 relative flex-col  rounded hover:cursor-pointer`}>
      <p className="text-2xl font-semibold">{tarea.title}</p>
      <Countdown targetDate={tarea.expired_at} />

    </article>
  )
}

export default Tarea