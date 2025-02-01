import { useState } from "react"

const TaskContent = ({ task, replied, total, checkHandle }) => {

  const answers = task?.answers

  const [text, setText] = useState("")

  return (
    <>
      <div className='max-w-xl  bg-slate-800 p-2 rounded animate-fadeIn'>

        <p className="p-2 bg-slate-600 rounded-md mb-4 w-28 m-auto">{replied} / {total}</p>
        <h2 className="text-center text-3xl bg-slate-700 p-2 rounded-md">{task?.ask}</h2>
        <div className='border-b-[1px] border-gray-600 my-4'></div>
        {
          task?.type === "multiple_choice" && (
            <>
              {answers.map((answer, index) => (
                <button key={answer} onClick={(e) => checkHandle({ index })} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                  {answer}
                </button>
              ))}
            </>
          )
        }

        {
          task?.type == "true_false" && (
            <>
              {answers.map((answer, index) => <button key={answer} onClick={() => checkHandle({ index })} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                {answer}
              </button>)}
            </>
          )
        }

        {
          task?.type == "typing" && (
            <>
              <input type="text" placeholder="typing here!" className="w-full p-4 my-4 text-black rounded" defaultValue={text} onKeyUp={(e) => setText(e.target.value)} />
              <button onClick={() => {
                if (text) {
                  checkHandle({ index: text })
                }
              }} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
                Aceptar
              </button>
            </>
          )
        }

      </div>
    </>

  )
}

export default TaskContent