import { PlusIcon } from "@heroicons/react/24/solid"

export const Course = ({ room, enroll }) => {


  const { nombre_aula, aula_descripcion, nivel, aula_id } = room

  const enrolHandle = () => {
    enroll({ aula_id })
  }

  return (
    <article className="group p-2 box-border hover:bg-slate-800 rounded-md aspect-square w-40 relative transition-all duration-300">

      <img src={`https://ui-avatars.com/api/?name=${nombre_aula}&background=0D8ABC&color=fff`} className="w-40" alt="" />

      <span className="truncate">{nombre_aula}</span>

      <button onClick={enrolHandle} className="absolute bottom-1 right-1 w-10 h-10 bg-green-500 rounded-full p-2 hover:scale-110 shadow group-hover:opacity-100 transition-all duration-300 opacity-0">
        <PlusIcon />
      </button>

    </article>
  )
}
