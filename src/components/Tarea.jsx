import { useTaskStore } from "@store/useTaskStore";
import Countdown from "./CountDown";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Tarea = ({ tarea }) => {
  const { setTask, completed, resetCompleted } = useTaskStore()
  const navigate = useNavigate()

  const isCompleted = completed.includes(tarea.id)

  const selectTask = () => {

    setTask(tarea)
    navigate(`./TaskView`)
  }

  useEffect(() => {
    //resetCompleted({ id: tarea.id })
  }, [])


  return (

    <article onClick={selectTask} className={`bg-slate-700 flex p-2 relative flex-col  rounded hover:cursor-pointer`}>
      <p className="text-2xl font-semibold">{tarea.title}</p>
      <Countdown targetDate={tarea.expired_at} />
      <p className="text-green-500">{isCompleted && 'completed!'}</p>
    </article>
  )
}

export default Tarea