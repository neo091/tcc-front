import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useTasks } from "@hooks/useTasks"
import { TeacherTask } from "./TeacherTask"

export const TeacherTasksSection = () => {
  const { tasks, addTaskHandle, deleteTaskHandle } = useTasks()

  return (
    <div className="bg-slate-800 rounded mb-4">
      <div className="flex py-4 px-4 border-b border-slate-700">
        <h2 className="flex-1">Tareas</h2>
        <button onClick={addTaskHandle}>
          <PlusCircleIcon className="w-8 h-8" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">

        {
          tasks.map(task => <TeacherTask key={task.id} deleteHandle={deleteTaskHandle} task={task} />)
        }

        {
          tasks.length <= 0 && <p className="text-center">Crear Tarea</p>
        }
      </div>

    </div>
  )
}