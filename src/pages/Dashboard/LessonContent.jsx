import { Content } from '@components/LessonContent';
import { getContents } from '@services/UserContentsService';
import { useAuthStore } from '@store/authStore';
import { useLessonStore } from '@store/lessonStore';
import { useEffect, useState } from 'react';

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


  return (
    <div>

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
    </div>
  );
}

export default LessonContent;
