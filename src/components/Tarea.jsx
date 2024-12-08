import { useTaskStore } from "@store/useTaskStore";
import Countdown from "./CountDown";
import { useNavigate } from "react-router-dom";

const Tarea = ({ tarea }) => {
  const { setTask } = useTaskStore()
  const navigate = useNavigate()
  const selectTask = () => {
    setTask(tarea)
    navigate(`./TaskView`)
  }

  return (

    <article onClick={selectTask} className="flex p-2 relative flex-col bg-slate-700 rounded hover:cursor-pointer">
      <p className="text-2xl font-semibold">{tarea.title}</p>
      <Countdown targetDate={tarea.expired_at} />
    </article>
  )
}

export default Tarea