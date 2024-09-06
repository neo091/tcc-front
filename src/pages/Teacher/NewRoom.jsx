import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import Subtitle from "../../components/Subtitle";
import FormControl from '../../components/FormControl'
import Button from "../../components/Button";
import teacherService from "../../services/teacher"
import { useRoomsStore } from "../../store/roomsStore";

export const action = async ({ request, params }) => {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const newRoom = await teacherService.add(updates)


    return redirect(`/Teacher/Rooms/${newRoom.body.insertId}`)
}

const NewRoom = () => {

    const { setIsNew } = useRoomsStore()

    const isNewHandle = () => {
        setIsNew(true)
    }

    return (
        <>

            <div className="w-full sm:w-2/3 lg:w-2/4 mx-auto">

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


                    <textarea cols="30" rows="4" className="p-2 w-full text-black " name="desc" placeholder="Descripcion breve sobre esta aula"></textarea>
                    <button onClick={(e) => isNewHandle()} className="bg-sky-600 inline-block px-6 py-4 w-full my-2 hover:bg-sky-400">Crear</button>
                </Form>

            </div>
        </>
    )
}

export default NewRoom;