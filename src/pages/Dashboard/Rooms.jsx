import React, { Children, useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';
import { GridContent } from '../../components/GridContent';
import { useRoomStore } from '@store/roomStore';
import { useAuthStore } from '@store/authStore';
import { getMyCourses } from '@services/Dashboard';

export const MyRoom = ({ room }) => {
  const { setRoom } = useRoomStore()
  const navigate = useNavigate()

  const { nombre_aula, aula_descripcion, nivel, aula_id } = room

  const goRoomHandle = () => {
    setRoom(room)
    navigate(`/Dashboard/Rooms/${aula_id}`)
  }
  return (
    <>
      <button onClick={goRoomHandle} className='group p-2 box-border hover:bg-slate-800 rounded-md max-w-40 transition-all duration-300'>
        <img src={`https://ui-avatars.com/api/?name=${nombre_aula}&background=0D8ABC&color=fff`} alt="" className='w-40' />
        <h3 className='text-slate-400 truncate group-hover:text-slate-50 transition-all duration-300 '>{nombre_aula} </h3>
        {/*<p className=' truncate'>{aula_descripcion}</p>*/}
      </button>

    </>
  )

}

export const MyRoomsOfList = () => {

  const { token } = useAuthStore()

  const [myCourses, setMyCourses] = useState([])

  const loadMyCourses = async () => {

    const coursesResult = await getMyCourses({ token })

    if (coursesResult.error) {
      return
    }

    const { courses } = coursesResult.body

    setMyCourses(courses)

  }

  useEffect(() => { loadMyCourses() }, [])

  return (
    <section>
      <Title>Mis Aulas</Title>

      <GridContent>
        {
          myCourses.map((course) => <MyRoom key={course.id} room={course} />)
        }
      </GridContent>


    </section>
  )

}

const DashboardRooms = () => {



  return (
    <>
      <MyRoomsOfList />
    </>
  );
}

export default DashboardRooms;
