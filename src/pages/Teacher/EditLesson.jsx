import { Form, redirect, useLoaderData } from "react-router-dom"
import teacher, { getLesson, updateLesson } from "../../services/teacher"
import Button from "../../components/Button"


export const loader = async ({ params }) => {

    const result = await getLesson(params.lessonId)

    console.log(result.body.respuesta)
    return { body: result.body.respuesta }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const updated = updateLesson(params.lessonId, updates)

    console.log(updates)
    console.log(updated)

    return redirect(`/Teacher/Rooms/${params.id}`)
}


const EditLesson = () => {

    const { body } = useLoaderData()


    const convertToDateTimeLocalString = (fecha_limite) => {
        const date = new Date(fecha_limite)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }



    return (
        <>
            <div className='w-full sm:w-2/3 lg:w-2/4  mx-auto'>
                <Form method="POST">
                    <div className="my-2">
                        <input name='tipo_leccion' type="text" placeholder='tipo lección' defaultValue={body.tipo_leccion} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2">
                        <input name='fecha_limite' type="datetime-local" defaultValue={convertToDateTimeLocalString(body.fecha_limite)} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2">
                        <textarea name='descripcion' cols="30" rows="4" className="p-2 w-full text-black" placeholder="Descripcion breve sobre esta aula" defaultValue={body.descripcion}></textarea>
                    </div>


                    <div className="w-full flex gap-3">
                        <Button text="Guardar" />
                    </div>


                </Form>
            </div>

        </>
    )
}

export default EditLesson;