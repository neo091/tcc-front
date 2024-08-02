import { useLoaderData } from "react-router-dom"

export const loader = ({ params }) => {

    const { id, taskId } = params
    return { id: id, taskId: taskId }
}

const TaskEdit = () => {

    const { id, taskId } = useLoaderData()


    return (
        <div>
            TaskEdit {id}, {taskId}
        </div>
    );
}

export default TaskEdit;
