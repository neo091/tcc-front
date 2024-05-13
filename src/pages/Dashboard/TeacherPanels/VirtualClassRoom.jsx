import { useEffect, useState } from "react";
import ButtonSky from "../../../components/ButtonSky";
import TableV2 from "../../../components/TableV2";
import Title from "../../../components/Title";
import teacherService from "../../../services/teacher";

const VirtualClassRoom = () => {

    const [showTable, setShowTable] = useState(false)
    const [classRoom, setClassRoom] = useState([])
    const [user, setUser] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem("loggedTCC")
        if (loggedUserJson) {
            const userLogged = JSON.parse(loggedUserJson)
            setUser(userLogged)
            setIsAdmin(userLogged.type === 3 ? true : false)
        } else {
            location.href = './login'
        }
    }, [])



    const thRooms = [
        {
            text: 'Aula'
        },
        {
            text: 'Nivel'
        },
        {
            text: 'Descripcion'
        },
        {
            text: 'Alumnos'
        }

    ]

    useEffect(() => loadClassRooms, [])

    const loadClassRooms = () => {
        const data = {
            id: user.id,
            token: user.token
        }

        teacherService.getAllRooms(data).then(result => {

            const dataMap = result.body.map(item => {
                return {
                    ID: item.aula_id,
                    tr_content: [
                        {
                            handle: viewHandle,
                            text: item.nombre_aula
                        },
                        {
                            text: item.nivel
                        },
                        {
                            text: item.aula_descripcion
                        },
                        {
                            text: 0
                        },

                    ]
                }
            })

            setClassRoom(dataMap)
            setShowTable(true)


        }).catch((e) => console.log(e))

    }


    const addNewVirtualRoomHandle = (e) => {
        e.preventDefault()
        e.target.dataset.panelSelected = 'add-virtual-classroom'
        handleChangePanel(e)
    }

    const viewHandle = (e) => {
        e.preventDefault()
        e.target.dataset.panelSelected = 'edit-virtual-classroom'
        window.localStorage.setItem('virtual-room-edit', e.target.dataset.id)
        handleChangePanel(e)
    }



    return (
        <>
            <div className="flex gap-2">

            </div>
            <div>
                <div className="my-4 flex gap-2">

                    <div>
                        <Title text='Aulas Virtuales' />
                        <p>Aqui puedes crear y modificar tus aulas virtuales</p>
                    </div>

                    <div className="justify-end">
                        <ButtonSky text='Agregar nueva' handle={addNewVirtualRoomHandle} />
                    </div>
                </div>
                <div id="load-more">

                    {
                        showTable ? <TableV2 tbody={classRoom} thead={thRooms} maxPerPage={3} title='Lista de Aulas' /> : ''
                    }
                </div>

            </div>
        </>
    );
}

export default VirtualClassRoom;