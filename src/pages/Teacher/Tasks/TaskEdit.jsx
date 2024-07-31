import { useLoaderData } from "react-router-dom"


export const loader = ({ params }) => {

    const { id } = params
    return { id: id }
}


const TaskEdit = () => {


    const { id } = useLoaderData()


    return (
        <div>
            TaskEdit {id}
        </div>
    );
}

export default TaskEdit;
