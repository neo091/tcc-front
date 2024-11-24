import { Card, CardHeader, CardContent, CardTitle } from "./Card"

export const MultipleChoice = ({ item }) => {

  const { ask, points, answers } = item

  const checkAnserHandle = (e, index) => {


    if (index === item.correct) {
      e.target.classList.remove("bg-blue-700")
      e.target.classList.add("bg-green-700")
    } else {
      e.target.classList.remove("bg-blue-700")
      e.target.classList.add("bg-red-700")
    }

    e.target.disabled = true

  }


  return (
    <Card>
      <CardHeader>

        <h2 className="text-2xl">{ask}</h2>

      </CardHeader>
      <CardContent>

        {
          answers?.map((answer, index) => {
            return (
              <button className="w-full p-4 bg-blue-700 my-2 rounded-lg text-xl transition-all duration-300 " onClick={(e) => checkAnserHandle(e, index)}>{answer}</button>
            )
          })
        }

      </CardContent>
    </Card>
  )
}


export const TrueFalse = ({ item }) => {

  const { ask, points, answers } = item


  const checkAnserHandle = (e, index) => {


    if (index === item.correct) {
      e.target.classList.remove("bg-blue-700")
      e.target.classList.add("bg-green-700")
    } else {
      e.target.classList.remove("bg-blue-700")
      e.target.classList.add("bg-red-700")
    }

    e.target.disabled = true

  }


  return (
    <Card>
      <CardHeader>

        <h2 className="text-2xl">{ask}</h2>

      </CardHeader>
      <CardContent>

        {
          answers?.map((answer, index) => {
            return (
              <button className="w-full p-4 bg-blue-700 my-2 rounded-lg text-xl transition-all duration-300 " onClick={(e) => checkAnserHandle(e, index)}>{answer}</button>
            )
          })
        }

      </CardContent>
    </Card>
  )
}

