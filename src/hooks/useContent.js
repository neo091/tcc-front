import { useEffect, useState } from "react"
import teacher, { uploadFile } from "../services/teacher"

export function useContents({ lessonId, roomId }) {

    const [contents, setContents] = useState([])

    const getLessonContents = async () => {
        const response = await teacher.getContents({ lessonId })

        const { result } = response.body

        setContents(result)
    }

    useEffect(() => {
        getLessonContents()
    }, [])


    const addContent = async (data) => {

        const result = await teacher.addContent({ lessonId, data })
        const newContents = [...contents, data]
        setContents(newContents)

    }


    const uploadImageContent = async ({ file }) => {
        const result = await uploadFile(file, roomId, lessonId)

        const { insertId } = result.data.body

        const imageResult = await fetch(`http://localhost:4000/api/files/${insertId}`)
        const resultJson = await imageResult.json()
        const { body } = resultJson

        addContent({ type: 3, value: `http://localhost:4000/uploads/${body[0].name}` })

    }

    const uploadAudioFile = async ({ audioFile }) => {

        const result = await teacher.uploadAudioFile(audioFile, roomId, lessonId)

        const { filename } = result.body.data.file

        addContent({ type: 4, value: `http://localhost:4000/uploads/${filename}` })
    }




    return { contents, addContent, uploadImageContent, uploadAudioFile }
}
