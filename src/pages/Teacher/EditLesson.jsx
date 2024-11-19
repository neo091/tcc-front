import { Form, redirect } from "react-router-dom"
import Swal from "sweetalert2"

import { useLessonStore } from "@store/lessonStore"
import { Card, CardContent, CardHeader, CardTitle } from "@components/Card"
import { useContents } from "@hooks/useContent"
import { CONTENT_TYPE } from "@utils/contentType"
import { AddContent } from "@components/AddContent"
import { Content } from "@components/LessonContent"
import { updateLesson } from "@services/teacher"
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid"
import { generateContent, getContents, saveContent } from "@services/ContentService"
import { useEffect, useState } from "react"
import { MultipleChoice, TrueFalseItem } from "@components/ExamTypes"

export const loader = async ({ params }) => {
  const lessonId = params.lessonId
  return { lessonId }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await updateLesson(params.lessonId, updates)

  return redirect(`/Teacher/Rooms/${params.id}`)
}

const EditLesson = () => {

  const { lesson } = useLessonStore()

  const [contents, setContents] = useState([])

  const returnBack = (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Estas seguro/a de volver?",
      text: "Si vuelves perderás todos los cambios!.",
      confirmButtonText: "Volver ya!",
      cancelButtonText: "Continuar editando",
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        history.back()
      }
    })

  }

  async function loadContents() {

    const { id } = lesson

    await getContents(id).then((result) => {
      const { body } = result

      const resultContentsLoaded = body.result.map(content => JSON.parse(content.value))

      setContents(resultContentsLoaded)

    })
  }

  useEffect(() => {
    loadContents()
  }, [])

  async function handleGenerateLesson() {
    const { value: formValues } = await Swal.fire({
      html: `
        <div class="p-4 flex flex-col gap-2 bg-gray-200">
                <input type="text" id="prompt" class="w-full h-11 p-2 rounded text-black" placeholder="here you prompt..." />

                <select class="w-full h-11 p-2 rounded bg-white text-black" id="types" >
                  <option value="multiple_choice">Selección Multiple</option>
                  <option value="true_false">Falso Verdadero</option>
                </select>
              </div>
      `,
      confirmButtonText: "Generar",
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("prompt").value,
          document.getElementById("types").value
        ];
      }
    });
    if (formValues) {

      const data = {
        prompt: formValues[0],
        type: formValues[1],
      }
      await generateContent(data).then(async (result) => {

        const content = result.body.questions[0]
        const data = {
          lesson_id: lesson.id,
          value: JSON.stringify(content)
        }

        await saveContent(data).then(result => {

          if (!result.error) {
            setContents(contents.concat(content))

            console.log(result)
          }
        })


      })
    }
  }

  const editAnswerHandle = async (index, contentIndex) => {
    const answerText = contents[contentIndex].answers[index]
    const { value: answer } = await Swal.fire({
      title: "Answer",
      input: "text",
      inputValue: answerText,
      inputLabel: "Your Answer",
      inputPlaceholder: "Enter your Answer",

    });
    if (answer) {
      Swal.fire(`Entered email: ${answer}`);
      const newContents = [...contents]
      newContents[contentIndex].answers[index] = answer
      setContents(newContents)
    }
  }

  const editAskHandle = async (index) => {
    const askText = contents[index].ask
    const { value: askValue } = await Swal.fire({
      title: "ASK",
      input: "text",
      inputValue: askText,
      inputLabel: "Your ASK",
      inputPlaceholder: "Enter your ASK",

    });
    if (askValue) {
      const newContents = [...contents]
      newContents[index].ask = askValue
      setContents(newContents)
    }
  }

  const removeAnswerHandle = (index, answerIndex) => {
    const newContent = [...contents]
    const newAnswers = newContent[index].answers.filter((_, index) => index !== answerIndex)
    newContent[index].answers = newAnswers
    setContents(newContent)
  }

  const editCorrectAnswerHandle = async (index, answerIndex) => {
    const newContents = [...contents]
    newContents[index].correct = answerIndex
    setContents(newContents)
  }

  const editPointsHandle = (index, type) => {

    let currentVal = contents[index].points

    if (type === "add") {
      currentVal++
    }

    if (type === "remove" && currentVal > 0) {
      currentVal--
    }

    const newContents = [...contents]
    newContents[index].points = currentVal
    setContents(newContents)
  }

  return (
    <>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4'>

        <div className="col-span-12 xl:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Editar</CardTitle>
            </CardHeader>
            <div className="p-4">
              <Form method="POST">

                <div className="my-2">
                  <input name='title' type="text" placeholder='Titulo de la lección' defaultValue={lesson.title} className="text-black p-2 w-full" />
                </div>

                <div className="my-2">
                  <textarea name='desc'
                    cols="30" rows="4"
                    className="p-2 w-full text-black" placeholder="Descripción breve sobre esta lección"
                    defaultValue={lesson.desc}
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">

                  <button className="flex-1 bg-sky-600 p-2">Guardar</button>
                  <button onClick={returnBack} className="flex-1 bg-red-600 p-2">Volver</button>

                </div>

              </Form>
            </div>
          </Card>
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeader>
              <CardTitle>
                Contenido de esta lección
              </CardTitle>

            </CardHeader>
            <div className=" p-2">
              <div className="flex gap-2 ">
                <button className="bg-sky-600 p-2 rounded flex gap-2 w-52 justify-center" onClick={handleGenerateLesson}>
                  <SparklesIcon className="w-6" />
                  Generar Contenido
                </button>

              </div>

              <div>
                {
                  contents.map((content, index) => (
                    <>
                      {
                        content.type === "multiple_choice" && <MultipleChoice item={content}
                          key={index + 9999}
                          examIndex={index}
                          editPointsHandle={editPointsHandle}
                          editCorrectAnswerHandle={editCorrectAnswerHandle}
                          removeAnswerHandle={removeAnswerHandle}
                          editAskHandle={editAskHandle}
                          editAnswerHandle={editAnswerHandle}
                        />
                      }

                      {
                        content.type === "true_false" && <TrueFalseItem item={content}
                          key={index + 999}
                          examIndex={index}
                          editPointsHandle={editPointsHandle}
                          editCorrectAnswerHandle={editCorrectAnswerHandle}
                          removeAnswerHandle={removeAnswerHandle}
                          editAskHandle={editAskHandle}
                          editAnswerHandle={editAnswerHandle}
                        />
                      }
                    </>
                  ))
                }
              </div>
            </div>
          </Card>
        </div >

      </div >

    </>
  )
}

export default EditLesson;