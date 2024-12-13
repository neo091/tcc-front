import { useRef } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "./Card"

export const MultipleChoice = ({ item }) => {

  const { ask, points, answers } = item
  const ref = useRef()

  const checkAnserHandle = (e, index) => {

    const botones = ref.current.querySelectorAll('button')

    for (let i = 0; i < botones.length; i++) {
      if (i == item.correct) {
        botones[i].classList.remove("bg-blue-700")
        botones[i].classList.add("bg-green-700")
        continue
      }
      botones[i].classList.remove("bg-blue-700")
      botones[i].classList.add("bg-red-700")
    }

    e.target.disabled = true

  }


  return (
    <Card>
      <CardHeader>

        <h2 className="text-2xl">{ask}</h2>

      </CardHeader>
      <CardContent>

        <div ref={ref}>
          {
            answers?.map((answer, index) => {
              return (
                <button className="w-full p-4 bg-blue-700 my-2 rounded-lg text-xl transition-all duration-300 " onClick={(e) => checkAnserHandle(e, index)}>{answer}</button>
              )
            })
          }
        </div>

      </CardContent>
    </Card>
  )
}


export const TrueFalse = ({ item }) => {

  const { ask, points, answers } = item
  const ref = useRef()

  const checkAnserHandle = (e) => {


    const botones = ref.current.querySelectorAll('button')

    for (let i = 0; i < botones.length; i++) {
      if (i == item.correct) {
        botones[i].classList.remove("bg-blue-700")
        botones[i].classList.add("bg-green-700")
        continue
      }
      botones[i].classList.remove("bg-blue-700")
      botones[i].classList.add("bg-red-700")
    }

    e.target.disabled = true

  }


  return (
    <Card>
      <CardHeader>

        <h2 className="text-2xl">{ask}</h2>

      </CardHeader>
      <CardContent>
        <div ref={ref}>
          {
            answers?.map((answer) => {
              return (
                <button className="w-full p-4 bg-blue-700 my-2 rounded-lg text-xl transition-all duration-300 " onClick={(e) => checkAnserHandle(e)}>{answer}</button>
              )
            })
          }
        </div>

      </CardContent>
    </Card>
  )
}

