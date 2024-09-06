import React from 'react';
import { useLoaderData } from 'react-router-dom';

export const loader = ({ params }) => {
    return { id: params.id }
}

const AddExam = () => {


    const { id } = useLoaderData()


    return (
        <div>
            Agregar Exámenes
        </div>
    );
}

export default AddExam;
