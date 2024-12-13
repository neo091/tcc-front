import parseHTML from 'html-react-parser'
import AudioButton from "./AudioButton"
import Swal from 'sweetalert2'
import { MultipleChoice, TrueFalse } from './ContentTypes'

export const Content = ({ value }) => {

  const content = JSON.parse(value)

  return (
    <article className='my-4'>
      {content.type === "multiple_choice" && <MultipleChoice item={content} />}
      {content.type === "true_false" && <TrueFalse item={content} />}
    </article>
  )
}