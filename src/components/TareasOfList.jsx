import Countdown from "./CountDown";

export const Tarea = ({ tarea }) => {
  
  const selectTask = () => {
    console.log(tarea.id);
  }

  return (

    <article onClick={selectTask} className="flex p-2 relative flex-col bg-slate-700 rounded hover:cursor-pointer">
      <p className="text-2xl font-semibold">{tarea.title}</p>
      <Countdown targetDate={tarea.expired_at} />
    </article>
  )
}

export const TareaOfList = ({ tareas }) => tareas.map(tarea => <Tarea key={tarea.id} tarea={tarea} />)