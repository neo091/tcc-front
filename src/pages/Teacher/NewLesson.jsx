import { Form, redirect, useLoaderData } from "react-router-dom"

import { createLesson } from "../../services/teacher"



export const loader = async ({ params }) => {

    const result = await createLesson(params.id)

    return redirect(`/Teacher/Rooms/${params.id}/lessons/${result.body.result.insertId}/edit`)
}

const NewLesson = () => { return }


export default NewLesson;