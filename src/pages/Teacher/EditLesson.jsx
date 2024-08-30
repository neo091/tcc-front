import { Form, redirect } from "react-router-dom"
import Swal from "sweetalert2"

import { useLessonStore } from "../../store/lessonStore"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card"
import { useContents } from "../../hooks/useContent"
import { CONTENT_TYPE } from "../../utils/contentType"
import { AddContent } from "../../components/AddContent"
import { Content } from "../../components/LessonContent"
import { updateLesson } from "../../services/teacher"

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

    const {
        contents,
        addContent,
        uploadImageContent,
        uploadAudioFile
    } = useContents({ lessonId: lesson.id, roomId: lesson.room })

    const convertToDateTimeLocalString = (fecha_limite) => {
        const date = new Date(fecha_limite)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

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
                        <div className="bg-slate-600 p-2">
                            <h3 className="text-xl font-semibold mb-2 text-center">Agrega nuevo contenido</h3>
                            <div className="flex justify-center gap-2 ">
                                <AddContent
                                    contentType={CONTENT_TYPE.text}
                                    addContent={addContent}>
                                    Texto
                                </AddContent>

                                <AddContent contentType={CONTENT_TYPE.title} addContent={addContent}> Titulo </AddContent>
                                <AddContent contentType={CONTENT_TYPE.image} addContent={uploadImageContent}> Imagen </AddContent>
                                <AddContent contentType={CONTENT_TYPE.audio} addContent={uploadAudioFile}> Audio </AddContent>

                            </div>
                        </div>

                        <CardContent>
                            {
                                contents.map((content) => <Content key={content.ID} type={content.type} value={content.value} id={content.ID} />)
                            }
                        </CardContent>
                    </Card>
                </div>

            </div>

        </>
    )
}

export default EditLesson;