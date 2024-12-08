import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import Swal from "sweetalert2"

const MultipleChoice = ({ item, index, remove, editAsk }) => {
  const { ask, points, answers, correct } = item

  return (
    <>
      <article className="bg-slate-800 group/article">
        <header className="relative w-full mb-4 hover:bg-slate-700 group/header hover:cursor-pointer">
          <h2 className="p-4 text-2xl text-center font-semibold group-hover/header:underline" onClick={() => editAsk({ index })}>{ask}</h2>
          <button onClick={() => remove({ index })} className="group-hover/article:block hidden absolute rounded-full bg-red-600 p-1 -top-2 -right-2 w-8 h-8">
            <XMarkIcon />
          </button>
        </header>

        <div>

          {
            answers.map((answer, itemIndex) => {

              return (
                <div key={`${itemIndex}-${answer}`} className="border-b-[1px] border-slate-600  hover:bg-slate-900">
                  <p className={`m-auto  flex gap-4 text-xl  ${correct === itemIndex && 'font-bold text-green-600'}`}>
                    <button className="flex-1 p-2">{answer}</button>
                  </p>
                </div>
              )

            })
          }

        </div>
        <p className="p-2 bg-slate-900 font-semibold">Puntos: {points}</p>
      </article>
    </>
  )
}

const TrueFalse = ({ item, index, remove, editAsk }) => {
  const { ask, points, answers, correct } = item

  return (
    <>
      <article className="bg-slate-800 group/article">
        <header className="relative w-full mb-4 hover:bg-slate-700 group/header hover:cursor-pointer">
          <h2 className="p-4 text-2xl text-center font-semibold group-hover/header:underline" onClick={() => editAsk({ index })}>{ask}</h2>
          <button onClick={() => remove({ index })} className="group-hover/article:block hidden absolute rounded-full bg-red-600 p-1 -top-2 -right-2 w-8 h-8">
            <XMarkIcon />
          </button>
        </header>

        <div>

          {
            answers.map((answer, itemIndex) => {

              return (
                <div key={`${itemIndex}-${answer}`} className="border-b-[1px] border-slate-600  hover:bg-slate-900">
                  <p className={`m-auto  flex gap-4 text-xl  ${correct === itemIndex && 'font-bold text-green-600'}`}>
                    <button className="flex-1 p-2">{answer}</button>
                  </p>
                </div>
              )

            })
          }

        </div>
        <p className="p-2 bg-slate-900 font-semibold">Puntos: {points}</p>
      </article>
    </>
  )
}

const Typing = ({ item, index, remove, editAsk }) => {
  const { ask, points, answers, correct } = item

  return (
    <>
      <article className="bg-slate-800 group/article">
        <header className="relative w-full mb-4 hover:bg-slate-700 group/header hover:cursor-pointer">
          <h2 className="p-4 text-2xl text-center font-semibold group-hover/header:underline" onClick={() => editAsk({ index })}>{ask}</h2>
          <button onClick={() => remove({ index })} className="group-hover/article:block hidden absolute rounded-full bg-red-600 p-1 -top-2 -right-2 w-8 h-8">
            <XMarkIcon />
          </button>
        </header>

        <div className="border-b-[1px] border-slate-600  hover:bg-slate-900">
          <p className={`m-auto  flex gap-4 text-xl`}>
            <button className="flex-1 p-2">{correct}</button>
          </p>

        </div>
        <p className="p-2 bg-slate-900 font-semibold">Puntos: {points}</p>
      </article>
    </>
  )
}


const TasksOfList = ({ list, update }) => {

  const removeOfList = ({ index: itemIndex }) => {
    const newList = [...list].filter((_, index) => index !== itemIndex)
    update(newList)
  }

  const editAskHandle = async ({ index: itemIndex }) => {
    const askToEdit = [...list]

    const { value: askValue } = await Swal.fire({
      title: "Edit Ask",
      input: "textarea",
      inputValue: askToEdit[itemIndex].ask,
      inputPlaceholder: "Enter your ASK",

    });
    if (askValue) {

      askToEdit[itemIndex].ask = askValue
      update(askToEdit)
    }
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      {
        list.map((task, index) => {
          return (
            <>
              {
                task.type === "multiple_choice" && <MultipleChoice item={task} index={index} remove={removeOfList} editAsk={editAskHandle} />
              }

              {
                task.type === "true_false" && <TrueFalse item={task} index={index} remove={removeOfList} editAsk={editAskHandle} />
              }

              {
                task.type === "typing" && <Typing item={task} index={index} remove={removeOfList} editAsk={editAskHandle} />
              }
            </>
          )
        })
      }
    </section>
  )
}

export default TasksOfList;
