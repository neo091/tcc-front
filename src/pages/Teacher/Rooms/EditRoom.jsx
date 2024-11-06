import Subtitle from "@components/Subtitle";
import { useRoom } from "@hooks/useRoom";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const EditRoom = () => {

    const { room, updateRoomHandle } = useRoom()
    const form = useRef()
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)
        const updates = Object.fromEntries(formData)
        const newRoom = { ...room }

        newRoom.nombre_aula = updates.nombre_aula
        newRoom.nivel = updates.nivel
        newRoom.aula_descripcion = updates.aula_descripcion

        await updateRoomHandle(newRoom).then(result => {
            if (!result.error) {
                navigate(`/Teacher/Rooms/${newRoom.aula_id}`)
            }
        })
    }


    return (
        <div className='w-full sm:w-2/3 lg:w-2/4  mx-auto'>

            <div className="p-4 ">
                <Subtitle text='Agregar nueva Aula Virtual' />
                {/* <p>Id: {room.aula_id}</p> */}
                <p>Rellena todos los campos antes de enviar.</p>

                <form method="POST" ref={form} onSubmit={submit}>
                    <div className="my-2">
                        <input name='nombre_aula' type="text" placeholder='Nombre Aula' defaultValue={room.nombre_aula} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2 text-black" >
                        <select className="p-2 w-full" name='nivel'>
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </div>

                    <div className="my-2 text-black ">
                        <textarea name='aula_descripcion' cols="30" rows="4" className="p-2 w-full" placeholder="Descripción breve sobre esta aula" defaultValue={room.aula_descripcion}></textarea>
                    </div>

                    <div className="w-full flex gap-3">
                        <button className="bg-sky-600 inline-block px-6 py-4 w-full my-2 hover:bg-sky-400">Editar</button>
                        <Link to={"/Teacher/Rooms"} className="bg-red-600 inline-block px-6 py-4 w-full my-2 hover:bg-red-400 text-center">Cancelar</Link>
                    </div>
                </form>
            </div>


        </div>

    );
}

export default EditRoom;
