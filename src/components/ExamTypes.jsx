import { Card, CardHeader, CardContent, CardTitle } from "@components/Card"
import { CheckIcon, ChevronLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Swal from "sweetalert2";

export const MultipleChoice = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle, editAnswerHandle, removeAnswerHandle }) => {

  const { id, ask, points } = item


  return (
    <>
      <h3 className='text-3xl font-semibold'>Selección Multiple</h3>
      <Card key={examIndex}>
        <CardHeader>

          <CardTitle>
            {ask} <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAskHandle(examIndex)}>
              <PencilIcon className='w-6 h-6' />
            </button>
          </CardTitle>
          <p className='flex gap-4 items-center'>
            Points:
            <button onClick={() => editPointsHandle(examIndex, "remove")} className='hover:bg-gray-700 transition-colors p-2 '><ChevronLeftIcon className='w-6 h-6' /></button>
            <span className='p-2'>{points}</span>
            <button onClick={() => editPointsHandle(examIndex, "add")} className='hover:bg-gray-700 transition-colors p-2'> <ChevronRightIcon className='w-6 h-6' /></button>
          </p>
        </CardHeader>
        <CardContent>
          <table>
            <tbody>
              {
                item.answers.map((answer, answerIndex) => {
                  return <tr key={`${answerIndex}-${answer}`}>
                    <td>

                      {
                        item.correct === answerIndex
                          ? <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, answerIndex)}><CheckIcon className='w-6 h-6 text-green-600' /></span>
                          : <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, answerIndex)}></span>
                      }

                    </td>
                    <td>
                      {answer}
                    </td>
                    <td>
                      <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAnswerHandle(answerIndex, examIndex)}>
                        <PencilIcon className='w-6 h-6' />
                      </button>
                    </td>
                    <td>
                      <button className='inline-block p-2 bg-red-600 rounded' onClick={() => removeAnswerHandle(examIndex, answerIndex)}>
                        <TrashIcon className='w-6 h-6' />
                      </button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>

        </CardContent>
      </Card>

    </>
  )
}

export const TrueFalseItem = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle }) => {

  const { id, ask, points } = item

  return (
    <>
      <h3 className='text-3xl font-semibold'>Falso Verdadero</h3>
      <Card key={examIndex}>
        <CardHeader>
          <CardTitle>
            {ask} <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAskHandle(examIndex)}>
              <PencilIcon className='w-6 h-6' />
            </button>
          </CardTitle>
          <p className='flex gap-4 items-center'>
            Points:
            <button onClick={() => editPointsHandle(examIndex, "remove")} className='hover:bg-gray-700 transition-colors p-2 '><ChevronLeftIcon className='w-6 h-6' /></button>
            <span className='p-2'>{points}</span>
            <button onClick={() => editPointsHandle(examIndex, "add")} className='hover:bg-gray-700 transition-colors p-2'> <ChevronRightIcon className='w-6 h-6' /></button>
          </p>
        </CardHeader>
        <CardContent>
          <section className='flex gap-2'>
            {
              item.answers.map((answer, index) => {

                return (


                  <article className='flex gap-2' key={answer + index}>
                    {
                      item.correct === index
                        ? <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, index)}><CheckIcon className='w-6 h-6 text-green-600' /></span>
                        : <span className='inline-block rounded w-6 h-6 bg-white cursor-pointer' onClick={() => editCorrectAnswerHandle(examIndex, index)}></span>
                    }
                    <button>{answer}</button>
                  </article>

                )
              })
            }
          </section>
        </CardContent>
      </Card >

    </>
  )
}

export const Typing = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle }) => {

  const { id, ask, points } = item

  const editCorrect = async () => {

    const { value: answer } = await Swal.fire({
      title: "Answer",
      input: "text",
      inputValue: item.correct,
      inputLabel: "Your Answer",
      inputPlaceholder: "Enter your Answer",

    });
    if (answer) {
      // Swal.fire(`: ${answer}`);
      editCorrectAnswerHandle(examIndex, answer)
    }


  }


  return (
    <>
      <h3 className='text-3xl font-semibold'>Completa la oración</h3>
      <Card key={examIndex}>
        <CardHeader>
          <CardTitle>
            {ask} <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAskHandle(examIndex)}>
              <PencilIcon className='w-6 h-6' />
            </button>
          </CardTitle>
          <p className='flex gap-4 items-center'>
            Points:
            <button onClick={() => editPointsHandle(examIndex, "remove")} className='hover:bg-gray-700 transition-colors p-2 '><ChevronLeftIcon className='w-6 h-6' /></button>
            <span className='p-2'>{points}</span>
            <button onClick={() => editPointsHandle(examIndex, "add")} className='hover:bg-gray-700 transition-colors p-2'> <ChevronRightIcon className='w-6 h-6' /></button>
          </p>
        </CardHeader>
        <CardContent>
          <section className='flex gap-2 items-center'>
            <span className='text-2xl'>{item.correct}</span>
            <button className='inline-block p-2 bg-sky-600 rounded' onClick={editCorrect}>
              <PencilIcon className='w-6 h-6' />
            </button>

          </section>
        </CardContent>
      </Card >
    </>
  )
}

export const Image = ({ item, examIndex, editAskHandle, editPointsHandle, editCorrectAnswerHandle }) => {

  const { id, ask, points } = item

  const editCorrect = async () => {

    const { value: answer } = await Swal.fire({
      title: "Answer",
      input: "text",
      inputValue: item.correct,
      inputLabel: "Your Answer",
      inputPlaceholder: "Enter your Answer",

    });
    if (answer) {
      // Swal.fire(`: ${answer}`);
      editCorrectAnswerHandle(examIndex, answer)
    }


  }


  return (
    <>
      <h3 className='text-3xl font-semibold'>Traduce la imagen</h3>
      <Card key={examIndex}>
        <CardHeader>
          <CardTitle>
            {ask} <button className='inline-block p-2 bg-sky-600 rounded' onClick={() => editAskHandle(examIndex)}>
              <PencilIcon className='w-6 h-6' />
            </button>
          </CardTitle>
          <p className='flex gap-4 items-center'>
            Points:
            <button onClick={() => editPointsHandle(examIndex, "remove")} className='hover:bg-gray-700 transition-colors p-2 '><ChevronLeftIcon className='w-6 h-6' /></button>
            <span className='p-2'>{points}</span>
            <button onClick={() => editPointsHandle(examIndex, "add")} className='hover:bg-gray-700 transition-colors p-2'> <ChevronRightIcon className='w-6 h-6' /></button>
          </p>
        </CardHeader>
        <CardContent>
          <section className=''>

            <img src={item?.src} alt="" />
            <div className='my-4 flex gap-4 items-center'>
              <span className='text-2xl '>{item.correct}</span>
              <button className='inline-block p-2 bg-sky-600 rounded' onClick={editCorrect}>
                <PencilIcon className='w-6 h-6' />
              </button>
            </div>

          </section>
        </CardContent>
      </Card >

    </>
  )
}