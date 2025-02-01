import { useTaskStore } from "@store/useTaskStore";
import Countdown from "./CountDown";
import { useNavigate } from "react-router-dom";

const Tarea = ({ tarea }) => {
  const { setTaskId } = useTaskStore()
  const navigate = useNavigate()

  const selectTask = () => {

    const taskSaved = setTaskId(tarea.id)

    if (taskSaved.completed) {
      navigate(`./TaskView`)
    }
  }

  return (

    <article className={`bg-slate-800 flex p-6 relative flex-col gap-4 rounded-md border-[1px] border-slate-600`}>
      <p className="text-2xl font-semibold">{tarea.title}</p>
      <p className="text-gray-500"><Countdown targetDate={tarea.expired_at} /></p>
      <button onClick={selectTask} className="bg-blue-600 px-4 py-2 inline-block  w-full rounded-md shadow-md shadow-slate-950/50 hover:shadow-none transition-shadow duration-300 ease-in-out ">
        <p>Iniciar tarea</p>
      </button>
    </article>
  )
}

export default Tarea