import { useState } from "react"
import { Form, useLoaderData } from "react-router-dom"
import Subtitle from "../../components/Subtitle"



export const loader = ({ params }) => {

    return { id: params.id }
}



const NewLesson = () => {

    const { id } = useLoaderData()

    return (
        <>

            <div className="w-full sm:w-2/3 lg:w-2/4  mx-auto">

            </div>
        </>

    );
}


export default NewLesson;