
import { useEffect, useState } from 'react'
import teacerService from '../../../services/teacher'
import Subtitle from '../../../components/Subtitle'
import ButtonSky from '../../../components/ButtonSky'
import Alert from "../../../components/Alerts";
import Button from '../../../components/Button';

const EditVirtualRoom = (props) => {

    //constate para las alertas
    const [alert, setAlert] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    //::CONSTANTE:: donde guardaremos el aula virtual que responde el servidor
    const [room, setRoom] = useState({})

    //solo es el id de el aula virtual
    const room_id = window.localStorage.getItem('virtual-room-edit')

    useEffect(() => {

        //enviamos a nuestro servicio los siguientes datos: id de el aula y el token de usuario, para verificar si esta Online
        //y obtener los datos de dicha room
        teacerService.getWhitId({
            id: room_id,
            token: props.user.token
        }).then(result => {
            //seteando la room a la CONSTANTE creada anteriormente
            setRoom(result.body)

            console.log(result.body)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    const nameHandle = (e) => {

    }

    return (
        <>
            <div className="p-4">
                <Subtitle text='Agregar nueva Aula Virtual' />
                <p>Rellena todos los campos antes de enviar.</p>

                {
                    showAlert ? <Alert message={alert.message} type={alert.type} /> : ''
                }
                <form action="/" id="create-room-form" method="POST">
                    <div className="my-2">
                        <input type="text" onChange={(e) => nameHandle(e)} placeholder='Nombre Aula' defaultValue={room.nombre_aula} className="text-black p-2 w-56" />
                    </div>

                    <div className="my-2 text-black">
                        <select className="p-2 w-56">
                            <option value="Principiante">Principiante</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </div>

                    <div className="my-2 text-black">
                        <textarea cols="30" rows="4" className="p-2 w-56" placeholder="Descripcion breve sobre esta aula" defaultValue={room.aula_descripcion}></textarea>
                    </div>

                    <div className="w-56">
                        <Button text="Editar" /> <Button text="Borrar" type='danger' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditVirtualRoom