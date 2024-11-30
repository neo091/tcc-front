import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import { createNewTask, obtenerTareas } from "@services/Tareas.service"
import { useAuthStore } from "@store/authStore"
import { useRoomStore } from "@store/roomStore"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export const TeacherTask = ({ task }) => {

  return (
    <>
      <article className="block p-2 bg-slate-700 hover:bg-slate-900 rounded relative shadow-md transition-all duration-300" >

        <h2 className="text-xl font-medium">{task.title}</h2>

        <div className=" pr-2 absolute right-0 top-0 bottom-0 flex items-center justify-center gap-2 ">


          <button className="hover:text-sky-500 transition-all duration-300">
            <PencilSquareIcon className="w-6" />
          </button>

          <button className="hover:text-red-500 transition-all duration-300">
            <TrashIcon className="w-6" />
          </button>
        </div>

      </article>
    </>
  )
}

export const TeacherTasksSection = () => {
  const { room } = useRoomStore()
  const { token } = useAuthStore()
  const [tasks, setTasks] = useState([])


  const loadTasks = async () => {
    const getTasks = await obtenerTareas({ roomId: room.aula_id, token: token })
    setTasks(getTasks?.body)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const createTask = async ({ title, desc }) => {

    const createTaskResponse = await createNewTask({ roomId: room.aula_id, token, data: { title, desc } })

    console.log(createTaskResponse)

  }

  const addTaskHandle = async () => {

    const { value: formValues } = await Swal.fire({
      title: "Agregar Tarea",
      html: `<div><input placeholder="Titulo (requerido)" type="text" style="width:100%;padding:4px; background:#334155;" id="swal-input1" /></div>
      <div><textarea rows="6" style="margin-top:10px;width:100%;padding:4px; background:#334155;" placeholder="Descripción (opcional)" id="swal-input2"></textarea></div>
      `,
      focusConfirm: false,
      background: "#020617",
      color: "white",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })

    if (formValues) {

      if (formValues[0] === "") {

        Swal.fire('falta titulo', 'rellena el campo de titulo para continuar', 'error')
        return
      }
      createTask({ title: formValues[0], desc: formValues[1] })
    }

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
          tasks.map(task => <TeacherTask key={task.id} task={task} />)
        }

        {
          tasks.length <= 0 && <p className="text-center">Crear Tarea</p>
        }
      </div>

    </div>
  )
}