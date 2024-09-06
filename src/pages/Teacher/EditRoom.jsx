
import { useEffect, useState } from 'react'
import teacerService from '../../services/teacher'
import Subtitle from '../../components/Subtitle'
import Alert from "../../components/Alerts";
import Button from '../../components/Button';
import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import Enlace from '../../components/Enlace';
import teacher from '../../services/teacher';
import { useRoomsStore } from '../../store/roomsStore';

TopBarProgress.config({
    barColors: {
        "0": "#8219DD",
        "0.5": "#8C16F3",
        "1.0": "#7214C4"
    },
    barThickness: 6,
    shadowBlur: 1
});


export const loader = async ({ params }) => {
    return { id: params.id }
}

export const action = async ({ request, params }) => {

    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const result = await teacher.edit(updates, params.id)

    return !result.error ? redirect(`/Teacher/Rooms/${params.id}`) : {}
}

const EditRoom = (props) => {

    const { id } = useLoaderData()
    const { setIsNew } = useRoomsStore()

    //constate para las alertas
    const [alert, setAlert] = useState([])
    const [showLoader, setShowloader] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    //::CONSTANTE:: donde guardaremos el aula virtual que responde el servidor
    const [room, setRoom] = useState({})

    useEffect(() => {

        //enviamos a nuestro servicio los siguientes datos: id de el aula y el token de usuario, para verificar si esta Online
        //y obtener los datos de dicha room
        teacerService.getWhitId(id).then(result => {
            //seteando la room a la CONSTANTE creada anteriormente
            setRoom(result.body)

            setShowloader(false)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    const nameHandle = (e) => {

    }

    const isNewHandle = () => {
        setIsNew(true)
    }

    return (
        <>
            <div className='w-full sm:w-2/3 lg:w-2/4  mx-auto'>

                {showLoader && <TopBarProgress />}
                {!showLoader && <div className="p-4 ">
                    <Subtitle text='Agregar nueva Aula Virtual' />
                    <p>Rellena todos los campos antes de enviar.</p>

                    {
                        showAlert ? <Alert message={alert.message} type={alert.type} /> : ''
                    }
                    <Form method="POST">
                        <div className="my-2">
                            <input name='name' type="text" onChange={(e) => nameHandle(e)} placeholder='Nombre Aula' defaultValue={room.nombre_aula} className="text-black p-2 w-full" />
                        </div>

                        <div className="my-2 text-black" >
                            <select className="p-2 w-full" name='level'>
                                <option value="Principiante">Principiante</option>
                                <option value="Intermedio">Intermedio</option>
                                <option value="Alto">Alto</option>
                            </select>
                        </div>

                        <div className="my-2 text-black ">
                            <textarea name='desc' cols="30" rows="4" className="p-2 w-full" placeholder="Descripcion breve sobre esta aula" defaultValue={room.aula_descripcion}></textarea>
                        </div>

                        <div className="w-full flex gap-3">
                            <button onClick={() => isNewHandle()} className="bg-sky-600 inline-block px-6 py-4 w-full my-2 hover:bg-sky-400">Editar</button>
                            <Link to={"/Teacher/Rooms"} className="bg-red-600 inline-block px-6 py-4 w-full my-2 hover:bg-red-400 text-center">Cancelar</Link>
                        </div>
                    </Form>
                </div>}


            </div>

        </>
    )
}

export default EditRoom