import React, { useEffect, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';

export const loader = ({ params }) => {


    const { id } = params


    return { id: id }
}

const TaskNew = () => {

    const [inserIdState, setInserId] = useState(null)
    const { id } = useLoaderData()

    useEffect(() => {
        addNewTask()
    }, [])


    const addNewTask = async () => {
        await fetch(`http://localhost:4000/api/teacher/tasks/add/${id}`)
            .then(result => result.json())
            .then(data => {
                if (!data.error) {
                    const { insertId } = data.body

                    if (insertId) {
                        setInserId(insertId)
                    }
                    console.log(insertId)
                }
            })
    }


    return (
        <>
            {inserIdState && <Navigate to={`../${id}/TaskEdit/${inserIdState}`} replace={true} />}
        </>
    );
}

export default TaskNew;