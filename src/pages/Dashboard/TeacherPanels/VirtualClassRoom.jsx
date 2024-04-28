import { useEffect, useState } from "react";
import ButtonSky from "../../../components/ButtonSky";
import Subtitle from "../../../components/Subtitle";
import Table from "../../../components/Table";
import TableV2 from "../../../components/TableV2";
import Title from "../../../components/Title";
import teacherService from "../../../services/teacher";

import DeleteSVG from '../../../assets/svg/delete.svg'


const VirtualClassRoom = ({ handleChangePanel, user }) => {

    const [showTable, setShowTable] = useState(false)

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
        },
        {
            text: ''
        },
        {
            text: ''
        },

    ]

    const [classRoom, setClassRoom] = useState([])

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
                        {
                            text:
                                <>
                                    <a href="#"
                                        className="text-red-600 w-[32px] h-[32px]"
                                        data-id={item.aula_id}
                                        onClick={(e) => deleteRoom(e)}>
                                        Delete
                                    </a>
                                </>
                        }
                        ,
                        {
                            text: <> <a href="#">Editar</a></>
                        }
                    ]
                }
            })

            setClassRoom(dataMap)
            setShowTable(true)


        }).catch((e) => console.log(e))

    }

    useEffect(() => loadClassRooms, [])

    const addNewVirtualRoomHandle = (e) => {
        e.preventDefault()
        e.target.dataset.panelSelected = 'add-virtual-classroom'
        handleChangePanel(e)
    }

    const deleteRoom = (e) => {
        e.preventDefault()

        console.log('delete', e.target.dataset.id)
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

                    <div className=" justify-end">
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