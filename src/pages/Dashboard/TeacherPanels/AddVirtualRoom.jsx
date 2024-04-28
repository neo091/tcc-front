import { useState } from "react";
import ButtonSky from "../../../components/ButtonSky";
import teacherService from "../../../services/teacher";
import Subtitle from "../../../components/Subtitle";
import Alert from "../../../components/Alerts";

const AddVirtualRoom = ({ user, handle, logoutHandle }) => {

    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState([])

    const [name, setName] = useState('')
    const [level, setLevel] = useState('Principiante')
    const [desc, setDesc] = useState('')

    const resetForm = () => {
        const createRoomForm = document.getElementById('create-room-form')

        setName('')
        setDesc('')

        createRoomForm.reset()
    }

    const sendNewVirtualRoom = (e) => {
        e.preventDefault()

        const newVirtualRoom = {
            name: name,
            level: level,
            desc: desc,
            user
        }

        if (!newVirtualRoom.name || newVirtualRoom.name === '') {
            setAlert({
                type: 'danger',
                message: 'name required!'
            })
            setShowAlert(true)
            return
        }

        if (!newVirtualRoom.desc || newVirtualRoom.desc === '') {

            setAlert({
                type: 'danger',
                message: 'description required!'
            })
            setShowAlert(true)
            return
        }

        teacherService.addNewVirtualRoom(newVirtualRoom).then(result => {
            console.log(result.body.insertId)
            resetForm()
        }).catch((e) => {

            if (e.response.data.body === 'jwt expired') {
                logoutHandle()
            }
        })

    }


    return (
        <>


            <div className="px-4">
                <Subtitle text='Agregar nueva Aula Virtual' />
                <p>Rellena todos los campos antes de enviar.</p>
            </div>
            {
                showAlert ? <Alert message={alert.message} type={alert.type} /> : ''
            }
            <form action="/" id="create-room-form" method="POST">
                <div className="my-2">
                    <input type="text" placeholder="ej: aula 1" className="text-black p-2 w-56" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="my-2 text-black">
                    <select onChange={(e) => setLevel(e.target.value)} className="p-2 w-56">
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Alto">Alto</option>
                    </select>
                </div>

                <div className="my-2 text-black">
                    <textarea cols="30" rows="4" className="p-2 w-56" onChange={(e) => setDesc(e.target.value)} placeholder="Descripcion breve sobre esta aula"></textarea>
                </div>

                <div className="w-56">
                    <ButtonSky text='Enviar' handle={sendNewVirtualRoom} />
                </div>
            </form>

            <div className="py-4">
                <a href="#" data-panel-selected="virtual-classroom" onClick={(e) => handle(e)}>Volver</a>
            </div>

        </>
    );
}

export default AddVirtualRoom;