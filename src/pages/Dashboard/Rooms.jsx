import React, { Children, useEffect, useState } from 'react';
import Title from '../../components/Title';
import { getUserData } from '../../auth';
import { Link, useLoaderData } from 'react-router-dom';


export const loader = async () => {
    const user = await getUserData()

    return { user }
}

const ExitEnrollButton = ({ onPress, children, ...props }) => {
    return (
        <button {...props} onClick={onPress} className='bg-red-600 hover:bg-red-700 shadow-[inset_0px_-6px_0px_0px_#00000050] block sm:inline-block xl:inline-block lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500'>
            {children}
        </button>
    )
}


const MyRoom = ({ room, handle }) => {
    const { nombre_aula, aula_descripcion, nivel, aula_id } = room

    return (
        <>
            <Link to={`/Dashboard/Rooms/${aula_id}`} className='p-2 box-border hover:bg-slate-800 rounded-md max-w-40'>
                <img src={`https://ui-avatars.com/api/?name=${nombre_aula}&background=0D8ABC&color=fff`} alt="" className='w-40' />
                <h3 className='text-slate-400 truncate'>{nombre_aula} </h3>
                <p className=' truncate'>{aula_descripcion}</p>
            </Link>

        </>
    )

}

const DashboardRooms = () => {

    const { user } = useLoaderData()

    const [myRooms, setMyRooms] = useState([])

    const getMyRooms = async () => {
        await fetch(`http://localhost:4000/api/dashboard/rooms/${user.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            .then(response => response.json())
            .then(data => setMyRooms(data.body.data));
    }

    useEffect(() => { getMyRooms() }, [])

    return (
        <div>
            <Title>
                Mis Aulas
            </Title>

            <section className='flex'>
                {myRooms.map(room => <MyRoom key={room.aula_id} room={room} />)}
            </section>
        </div>
    );
}

export default DashboardRooms;
