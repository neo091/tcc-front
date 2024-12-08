import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useTasks } from "@hooks/useTasks"
import { TeacherTask } from "./TeacherTask"
import { useNavigate } from "react-router-dom"
import { useTaskStore } from "@store/useTaskStore"

export const TeacherTasksSection = () => {
  const { tasks, addTaskHandle, deleteTaskHandle } = useTasks()
  const { setTask } = useTaskStore()

  const navigate = useNavigate()

  const editHandle = ({ id }) => {

    const taskToEdit = [...tasks].find(task => task.id === id)

    setTask(taskToEdit);

    navigate(`./TaskEdit`)
  }

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
          tasks.map(task => <TeacherTask key={task.id} editHandle={editHandle} deleteHandle={deleteTaskHandle} task={task} />)
        }

        {
          tasks.length <= 0 && <p className="text-center">Crear Tarea</p>
        }
      </div>

    </div>
  )
}