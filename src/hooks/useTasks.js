import { useEffect, useState } from "react"
import { useRoomStore } from "@store/roomStore"
import { useAuthStore } from "@store/authStore"
import { createNewTask, deleteTask, obtenerTareas } from "@services/Tareas.service"
import Swal from "sweetalert2"

export function useTasks() {
  const { room } = useRoomStore()
  const { token } = useAuthStore()

  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const loadTasks = async () => {
    const getTasks = await obtenerTareas({ roomId: room.aula_id, token: token })
    setTasks(getTasks?.body)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const createTask = async ({ title, desc, expired }) => {
    const expired_at = expired.replace("T", " ") + ':00'
    await createNewTask({ roomId: room.aula_id, token, data: { title, desc, expired_at } })
      .then(result => {
        if (!result.error) loadTasks()
      })
  }

  const addTaskHandle = async ({ title, desc }) => {

    const { value: formValues } = await Swal.fire({
      title: "Agregar Tarea",
      html: `<div><input placeholder="Titulo (requerido)" type="text" style="width:100%;padding:4px; background:#334155;" id="swal-input1" value="${title ? title : ''}" /></div>

      <div><textarea rows="6" style="margin-top:10px;width:100%;padding:4px; background:#334155;" placeholder="Descripción (opcional)" id="swal-input2">${desc ? desc : ''}</textarea></div>

      <div><input style="margin-top:10px;width:100%;padding:4px; background:#334155;" type="datetime-local" id="swal-input3" name="swal-input3" min="${new Date().toISOString().substring(0, 16)}" ></div>

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
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value
        ]
      }
    })

    if (formValues) {

      if (formValues[0] === "") {

        Swal.fire('falta titulo', 'rellena el campo de titulo para continuar', 'error')
        return
      }

      if (formValues[2] === "") {
        await Swal.fire('falta fecha', 'indica fecha de expiración para esta tarea', 'error')
        addTaskHandle({ title: formValues[0], desc: formValues[1] })
        return
      }

      //console.log({ title: formValues[0], desc: formValues[1], expired_at: formValues[2] });
      createTask({ title: formValues[0], desc: formValues[1], expired: formValues[2] })
    }

  }

  const deleteTaskHandle = async ({ id }) => {

    await Swal.fire({
      text: "Quieres borrarlo?",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      showCancelButton: true
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteTask({ id, token })
          .then(result => {
            if (!result.error) {
              loadTasks()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })

  }

  return { tasks, addTaskHandle, deleteTaskHandle }
}