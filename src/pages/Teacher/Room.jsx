import { Link, useLoaderData } from "react-router-dom";
import teacher from "../../services/teacher";
import Title from "../../components/Title";

export const loader = async ({ params }) => {

    const getRoom = await teacher.getWhitId(params.id)

    return getRoom

}


const Room = () => {


    const { body } = useLoaderData()

    const { nombre_aula, nivel, aula_descripcion } = body



    return (
        <>


            <div className="w-[80%] mx-auto">
                <div className="flex-row sm:flex xl:flex  items-center gap-3">
                    <h1 className=" text-5xl font-extrabold">{nombre_aula}</h1>

                    <div className="flex gap-1">
                        <Link to={"./edit"} className="d-block bg-blue-800 p-3 rounded">EDITAR</Link>
                        <Link to={"./edit"} className="d-block bg-red-800 p-3 rounded">BORRAR</Link>
                    </div>

                </div>
                <p className="mt-3">{nivel}</p>
                <p className="whitespace-pre-wrap text-[20px] mt-3">{aula_descripcion}</p>


                <div className="flex-1 sm:flex xl:flex gap-3 mt-10">
                    <h1 className=" text-2xl font-extrabold">Lecciones</h1>

                    <div className="flex gap-1">
                        <Link to={"./NewLesson"} className="d-block bg-blue-800 p-3 rounded">Nueva lección</Link>
                    </div>

                </div>


            </div>


        </>
    );
}

export default Room;