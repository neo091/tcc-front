import { useState } from "react"

const TaskContent = ({ currentQuestion, checkQuestion, replied, totalQuestions }) => {

  const [text, setText] = useState('')

  return (
    <div className='max-w-xl m-auto bg-slate-800 p-4 relative rounded animate-fadeIn'>
      <div className='absolute -top-4 w-full left-0 right-0  text-center'>
        <span className='bg-slate-600 py-1 px-3 rounded'>{replied} / {totalQuestions}</span>
      </div>
      <h2 className="text-center text-3xl bg-slate-700 p-2 rounded-md">{currentQuestion?.ask}</h2>
      <div className='border-b-[1px] border-gray-600 my-4'></div>

      {
        currentQuestion?.type === "multiple_choice" && (
          <>
            {currentQuestion?.answers?.map((answer, index) => <button key={answer} onClick={(e) => checkQuestion({ index })} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
              {answer}
            </button>)}
          </>
        )
      }

      {
        currentQuestion?.type == "true_false" && (
          <>
            {currentQuestion?.answers?.map((answer, index) => <button key={answer} onClick={() => checkQuestion({ index })} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
              {answer}
            </button>)}
          </>
        )
      }

      {
        currentQuestion?.type == "typing" && (
          <>
            <input type="text" placeholder="typing here!" className="w-full p-4 my-4 text-black rounded" defaultValue={text} onKeyUp={(e) => setText(e.target.value)} />
            <button onClick={() => {
              if (text) {
                checkQuestion({ index: text })
              }
            }} className={" bg-blue-600 hover:bg-blue-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500"}>
              Aceptar
            </button>
          </>
        )
      }
    </div>

  )
}

export default TaskContent