import { useLoaderData } from "react-router-dom"

export const loader = ({ params }) => {

    const { id, taskId } = params
    return { id, taskId }
}

const TaskEdit = () => {

    const { id, taskId } = useLoaderData()


    return (
        <div>
            <button onClick={() => history.back()}>Atras</button>
            <br />
            TaskEdit {id}, {taskId}
        </div>
    );
}

export default TaskEdit;
