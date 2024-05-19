import { Children, useEffect, useState } from "react";
import ButtonSky from "../../components/ButtonSky";
import TableV2 from "../../components/TableV2";
import Title from "../../components/Title";
import teacherService from "../../services/teacher";
import { Form, Link, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom";
import EnlaceDefault from "../../components/EnlaceDefault";
import Subtitle from "../../components/Subtitle";
import Alert from "../../components/Alerts";
import Button from "../../components/Button";
import Enlace from "../../components/Enlace";


const Th = ({ children }) => {
    return (
        <>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-ellipsis">{children}</th>
        </>
    )
}


const RoomsList = () => {

    const { user } = useRouteLoaderData("teacher")

    const [showTable, setShowTable] = useState(false)
    const [classRoom, setClassRoom] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => loadClassRooms(), [])

    const loadClassRooms = () => {
        const data = {
            id: user.id,
            token: user.token
        }

        teacherService.getAllRooms(data).then(result => {

            const dataMap = result.body.map(item => {
                return {
                    id: item.aula_id,
                    name: item.nombre_aula,
                    level: item.nivel,
                    desc: item.aula_descripcion,
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
            <div className=" flex gap-3 items-center p-2 my-2">
                <h1 className="text-2xl">Aula Virtual</h1>
                <Enlace to={"new"}>Agregar</Enlace>
            </div>


            <div className="p-4 bg-slate-800 rounded">

                <Subtitle text={"Lista de Aulas"} />

                <div className="flex items-center gap-3 border-none my-4">
                    <p>Total: {classRoom.length}</p>
                    <div>
                        <input className="p-2 bg-slate-700 rounded" type="text" placeholder="buscar" />
                    </div>
                </div>

                <div className="elative overflow-x-auto">

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Nivel
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Accion
                                </th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                classRoom.map((item) =>

                                    <tr key={item.id}>
                                        <Th>
                                            <Link to={`${item.id}`} className=" font-semibold underline" >{item.name}</Link>
                                        </Th>
                                        <Th>{item.level}</Th>
                                        <Th>
                                            <Link to={`${item.id}`} className="py-2 px-4 border-2 border-white rounded w-full ">Ver</Link>
                                        </Th>
                                    </tr>

                                )

                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default RoomsList;