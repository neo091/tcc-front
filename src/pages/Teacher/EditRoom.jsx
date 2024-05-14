
import { useEffect, useState } from 'react'
import teacerService from '../../services/teacher'
import Subtitle from '../../components/Subtitle'
import ButtonSky from '../../components/ButtonSky'
import Alert from "../../components/Alerts";
import Button from '../../components/Button';
import { useLoaderData } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';


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

const EditRoom = (props) => {

    const { id } = useLoaderData()

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

    return (
        <>
            {showLoader && <TopBarProgress />}
            {!showLoader && <div className="p-4 ">
                <Subtitle text='Agregar nueva Aula Virtual' />
                <p>Rellena todos los campos antes de enviar.</p>

                {
                    showAlert ? <Alert message={alert.message} type={alert.type} /> : ''
                }
                <form action="/" id="create-room-form" method="POST">
                    <div className="my-2">
                        <input type="text" onChange={(e) => nameHandle(e)} placeholder='Nombre Aula' defaultValue={room.nombre_aula} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2 text-black">
                        <select className="p-2 w-full">
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </div>

                    <div className="my-2 text-black ">
                        <textarea cols="30" rows="4" className="p-2 w-full" placeholder="Descripcion breve sobre esta aula" defaultValue={room.aula_descripcion}></textarea>
                    </div>

                    <div className="w-full">
                        <Button text="Editar" /> <Button text="Borrar" type='danger' />
                    </div>
                </form>
            </div>}
        </>
    )
}

export default EditRoom