import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import Subtitle from "../../components/Subtitle";
import FormControl from '../../components/FormControl'
import Button from "../../components/Button";
import teacherService from "../../services/teacher"

export const action = async ({ request, params }) => {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const newRoom = await teacherService.add(updates)

    return redirect(`/Teacher/Rooms/${newRoom.body.insertId}`)
}

const NewRoom = () => {
    return (
        <>

            <div className="p-4 w-[100%] sm:w-[80%] xl:w-[30%] mx-auto">

                <Subtitle text='Agregar nueva Aula Virtual' />
                <p>Rellena todos los campos antes de enviar.</p>

                <Form method="POST" >
                    <input type="text" name="name" placeholder="ej: aula 1" className="text-black p-2 w-full" />
                    <div className="my-4 text-black">
                        <select className="p-2 w-full text-dark" name="level" >
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </div>


                    <textarea cols="30" rows="4" className="p-2 w-full " name="desc" placeholder="Descripcion breve sobre esta aula"></textarea>

                    <button className={"bg-violet-900 hover:bg-violet-700 rounded shadow-[inset_0px_-6px_0px_0px_#00000050] text-white py-2 px-5  w-full "}>
                        Agregar
                    </button>
                </Form>

            </div>
        </>
    )
}

export default NewRoom;