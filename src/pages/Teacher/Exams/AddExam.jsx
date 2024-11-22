import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Card';
import Swal from 'sweetalert2';
import { generateExam } from '@services/gptService';
import { saveExam } from '@services/teacher';
import { useRoomStore } from '@store/roomStore';
import { useNavigate } from 'react-router-dom';
import ExamGeneratedList from '@components/ExamGeneratedList';
import { getKeywordsService } from '@services/examKeywords';

export const loader = ({ params }) => {
  return { id: params.id }
}

const AddExam = () => {
  const [exam, setExam] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [saveData, setSaveData] = useState([])
  const [keywordsStr, setKeywords] = useState("")
  const { room } = useRoomStore()
  const navigate = useNavigate()

  const getKeywords = async () => {

    await getKeywordsService(room.aula_id)
      .then(result => {

        const { keywords } = result.body

        setKeywords(keywords)

      })
  }

  const getExamTypes = async () => {
    const result = await fetch('/examTypes.json')
    const json = await result.json()

    setExamTypes(json)
  }

  useEffect(() => {
    getExamTypes()
    getKeywords()
  }, [])

  const handleDeleteExam = ({ id }) => {
    const newExam = [...exam].filter((_, index) => index !== id)

    setExam(newExam)
  }

  const toggleElement = (element, message, enable) => {
    element.innerText = message
    element.enable = enable
  }

  const submitHandle = async (e) => {
    e.preventDefault();
    const buttonSubmit = e.target.querySelector("button")
    toggleElement(buttonSubmit, "GENERANDO...", false)

    const formData = new FormData(e.target);
    formData.append("keywords", keywordsStr);
    const updates = Object.fromEntries(formData);

    console.log(updates)


    if (updates.type === "audio") {

      console.log('es audio')
      return;
    }


    await generateExam(updates).then(result => {

      const { body } = result;

      const newQuestions = [...exam].concat(body.questions)
      setExam(newQuestions)
      toggleElement(buttonSubmit, "GENERAR", true)


    }).catch((err) => {

      Swal.fire({
        timer: 1000,
        title: err.response.data.body?.message,
        showConfirmButton: false
      })

      toggleElement(buttonSubmit, "GENERAR", true)
      // console.log(err.code)
    })

    setSaveData({
      "days": updates.days,
      "title": updates.title ?? "Examen sin titulo",
      "prompt": updates.prompt
    });
  }

  const editAnswerHandle = async (answerIndex, examIndex) => {
    const answerText = exam[examIndex].answers[answerIndex]
    const { value: answer } = await Swal.fire({
      title: "Answer",
      input: "text",
      inputValue: answerText,
      inputLabel: "Your Answer",
      inputPlaceholder: "Enter your Answer",

    });
    if (answer) {
      Swal.fire(`Entered email: ${answer}`);
      const newExam = [...exam]
      newExam[examIndex].answers[answerIndex] = answer
      setExam(newExam)
    }
  }

  const editAskHandle = async (examIndex) => {
    const askText = exam[examIndex].ask
    const { value: askValue } = await Swal.fire({
      title: "ASK",
      input: "text",
      inputValue: askText,
      inputLabel: "Your ASK",
      inputPlaceholder: "Enter your ASK",

    });
    if (askValue) {
      const newExam = [...exam]
      newExam[examIndex].ask = askValue
      setExam(newExam)
    }
  }

  const removeAnswerHandle = (examIndex, answerIndex) => {
    const newExam = [...exam]
    const newAnswers = newExam[examIndex].answers.filter((_, index) => index !== answerIndex)
    newExam[examIndex].answers = newAnswers
    setExam(newExam)
  }

  const editCorrectAnswerHandle = async (examIndex, answerIndex) => {
    const newExam = [...exam]
    newExam[examIndex].correct = answerIndex
    setExam(newExam)
  }

  const editPointsHandle = (examIndex, type) => {

    let currentVal = exam[examIndex].points

    if (type === "add") {
      currentVal++
    }

    if (type === "remove" && currentVal > 0) {
      currentVal--
    }

    const newExam = [...exam]
    newExam[examIndex].points = currentVal
    setExam(newExam)
  }

  const saveHandle = async () => {

    const data = {

      "exam": JSON.stringify(exam),
      "config": JSON.stringify(saveData),
      "roomID": room.aula_id
    }

    Swal.fire({
      title: "Guardar examen?",
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await saveExam(data).then(result => {
          console.log(result.data)

          if (result.data.error) {

            Swal.fire({
              text: `Ocurrió un error ${result.data.body.message}`
            })


            return
          }


          navigate(`/Teacher/Rooms/${room.aula_id}`)

        }).catch((err) => console.log(err))
      }
    })
  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>
              Generar Examen
            </CardTitle>
            <div>
              {room.nivel}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={submitHandle}>
              <div className='flex flex-col gap-4 '>
                <div>
                  <label htmlFor="">Titulo del examen</label>
                  <input name='title' type='text' className='w-full h-10 text-black p-2' placeholder='escribe titulo para el examen' />
                </div>
                <div>
                  <label htmlFor="">Prompt adicional</label>
                  <input name='prompt' type='text' className='w-full h-10 text-black p-2' placeholder='escribe sobre que quieres que genere...' />
                </div>
                <div>
                  <label htmlFor="">Cantidad de Preguntas a generar</label>
                  <select name='amount' className='w-full h-10 text-black'>
                    {
                      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => item === 0 ? <option key={item} value={0} disabled >Cantidad de Preguntas</option> : <option key={item} value={item}>{item}</option>)
                    }
                  </select>
                </div>

                <div>
                  <label htmlFor="">Tipo de Contenido</label>
                  <select name='type' className='w-full h-10 text-black'>
                    {
                      examTypes.map(item => item.value !== 0 ? <option key={item.value} value={item.value}>{item.name}</option> : <option key={item.value} value={0} disabled >{item.name}</option>)
                    }
                  </select>
                </div>

                <div>
                  <label htmlFor="">Días limites</label>
                  <select name='days' className='w-full h-10 text-black'>
                    {
                      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => item === 0 ? <option key={item} value={0} disabled >Cantidad de días</option> : <option key={item} value={item}>{item}</option>)
                    }
                  </select>
                </div>

                <input type="hidden" name='level' value={room.nivel} />
                <button className='inline-block p-2 shadow-sm shadow-black bg-sky-600 w-full'>GENERAR</button>

              </div>
            </form>
          </CardContent>
        </Card>

        <div className='bg-slate-800 flex flex-col'>
          <CardHeader>
            <CardTitle>Total de Puntos</CardTitle>
          </CardHeader>
          <div className=' h-full flex items-center justify-center'>
            <p className='text-6xl m-4'>
              {exam.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6 mt-4 max-w-[720px] m-auto'>
        <ExamGeneratedList
          editAnswerHandle={editAnswerHandle}
          editAskHandle={editAskHandle}
          removeAnswerHandle={removeAnswerHandle}
          editCorrectAnswerHandle={editCorrectAnswerHandle}
          editPointsHandle={editPointsHandle}
          saveHandle={saveHandle}
          examList={exam}
          handleDeleteExam={handleDeleteExam}

        />

      </div>
    </div>
  );
}

export default AddExam;
