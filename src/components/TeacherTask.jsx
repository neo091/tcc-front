import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import Countdown from "./CountDown"

export const TeacherTask = ({ task, deleteHandle, editHandle }) => {

  const { id, title, expired_at } = task



  return (
    <>
      <article className="block p-2 bg-slate-700 hover:bg-slate-900 rounded relative shadow-md transition-all duration-300" >

        <h2 className="text-xl font-medium">{title}</h2>
        <span className="text-gray-500 text-sm"><Countdown targetDate={expired_at} /></span>

        <div className=" pr-2 absolute right-0 top-0 bottom-0 flex items-center justify-center gap-2 ">


          <button onClick={() => editHandle({ id })} className="hover:text-sky-500 transition-all duration-300">
            <PencilSquareIcon className="w-6" />
          </button>

          <button onClick={() => deleteHandle({ id })} className="hover:text-red-500 transition-all duration-300">
            <TrashIcon className="w-6" />
          </button>
        </div>

      </article>
    </>
  )
}