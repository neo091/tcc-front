import { Content } from '@components/LessonContent';
import { getContents } from '@services/UserContentsService';
import { useAuthStore } from '@store/authStore';
import { useLessonStore } from '@store/lessonStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LessonContent = () => {

  const { lesson } = useLessonStore()
  const { token } = useAuthStore()

  const [contents, setContents] = useState([])

  const loadContents = async () => {

    const contentsResult = await getContents({ lesson: lesson.id, token })

    if (contentsResult.error) {
      return
    }

    const { contents } = contentsResult.body
    setContents(contents)

  }

  useEffect(() => { loadContents() }, [])

  const navigate = useNavigate()


  return (
    <div className='text-center'>

      <h1 className='text-2xl font-semibold mb-4 mt-4'> {lesson.title} </h1>
      <div>
        {
          contents.map((content) => {
            return (
              <Content
                key={content.ID}
                value={content.value}
              />
            )
          })
        }
      </div>
      <button onClick={() => navigate(-1)} className='px-4 py-2 rounded bg-blue-700'>Volver</button>
    </div>
  );
}

export default LessonContent;
