import { useLoaderData } from "react-router-dom";
import teacherService from "../../../services/teacher";
import Title from "../../../components/Title";

export const loader = async ({ params }) => {

    const getRoom = await teacherService.getWhitId(params.id)

    return getRoom

}


const VirtualRoom = () => {

    const { body } = useLoaderData()


    return (
        <>
            <div className="flex">
                <Title>{body.nombre_aula}</Title>
            </div>
            <div>
                <p>{body.aula_descripcion}</p>
            </div>

        </>
    );
}

export default VirtualRoom;