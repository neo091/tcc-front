import { PlusIcon } from "@heroicons/react/24/solid"
import { getRoomInfoService } from "@services/Dashboard"
import { useAuthStore } from "@store/authStore"
import { useEffect, useState } from "react"

export const Course = ({ room, enroll }) => {

  const { token } = useAuthStore()
  const { nombre_aula, aula_descripcion, nivel, aula_id, usuario_id } = room

  const [name, setName] = useState("")
  const [pic, setPic] = useState("")
  const [students, setStudents] = useState("")

  const enrolHandle = () => {
    enroll({ aula_id })
  }

  const getRoomInfo = async () => {
    await getRoomInfoService({ token, userId: usuario_id, room: aula_id })
      .then(result => {
        setName(result.body.name)
        setPic(result.body.userpic)
        setStudents(result.body.students)
      }).catch(e => {
        console.log(e)
      })

  }

  useEffect(() => {
    getRoomInfo()
  }, [])

  return (
    <article className="group p-2 box-border hover:bg-slate-800 rounded-md aspect-square w-52 relative transition-all duration-300">
      <span className="absolute top-32 md:top-40 left-3 bg-black/20 py-1 px-3 rounded">{nivel}</span>
      <img src={`https://ui-avatars.com/api/?name=${nombre_aula}&background=0D8ABC&color=fff`} className="w-52" alt="" />

      <span className="truncate">{nombre_aula}</span>

      <div className="flex items-center gap-2">
        <img src={`http://localhost:4000/uploads/${pic}`} className="rounded-full w-10" alt="" />
        <div className="flex flex-col">
          <p className="font-medium">{name}</p>
          <span className="text-xs">{students} alumnos</span>
        </div>
      </div>

      <button onClick={enrolHandle} className="absolute top-3 right-3  h-10 bg-green-500 rounded px-2 hover:scale-110 shadow group-hover:opacity-100 transition-all duration-300 opacity-0 font-semibold">
        <span className="flex gap-1">Inscribirse <PlusIcon className="w-6" /></span>
      </button>

    </article>
  )
}
