import { useState } from "react"
import { Form, useLoaderData } from "react-router-dom"
import Subtitle from "../../components/Subtitle"



export const loader = ({ params }) => {

    console.log(params.id)

    return { id: params.id }
}


const NewLesson = () => {

    const { id } = useLoaderData()

    const [showIaGen, setIaGen] = useState(false)

    return (
        <>
            <button className="p-2 bg-violet-900 rounded" onClick={() => setIaGen(!showIaGen)} >{showIaGen ? 'Generar Manual' : 'Generar con IA'}</button>

            {
                showIaGen && <>
                    <div className=" w-1/3 mx-auto">
                        <Subtitle>Generar Lecciones con Inteligencia Artificial</Subtitle>
                        <Form method="POST">
                            <p className="my-2" htmlFor="">Describe como quieres que se genere la leccion</p>
                            <p className="my-2" htmlFor=""><b>Ejemplo</b> quiero una leccion para alumnos intermedios que contenga el verbo ToBe</p>
                            <input type="text" placeholder="describe la leccion" className=" bg-slate-700 p-3 w-full my-2 rounded" />
                            <button className="w-full p-2 bg-violet-900 rounded">Generar</button>
                        </Form>
                    </div>
                </>
            }


            {
                !showIaGen && <>
                    <div className=" w-1/3 mx-auto">
                        <Subtitle>Generar de Forma manual</Subtitle>
                        <Form method="POST">
                            <p className="my-2" htmlFor="">Describe como quieres que se genere la leccion</p>
                            <p className="my-2" htmlFor=""><b>Ejemplo</b> quiero una leccion para alumnos intermedios que contenga el verbo ToBe</p>
                            <input type="text" placeholder="describe la leccion" className=" bg-slate-700 p-3 w-full my-2 rounded" />
                            <button className="w-full p-2 bg-violet-900 rounded">Generar</button>
                        </Form>
                    </div>
                </>
            }


        </>

    );
}

export default NewLesson;