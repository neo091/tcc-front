import { Navigate, useLoaderData } from 'react-router-dom';
import { useTasks } from '../../../hooks/useTasks';

export const loader = ({ params }) => {
    const { id } = params
    return { id: id }
}

export default function TaskNew() {
    const { id } = useLoaderData()
    const { insertId } = useTasks({ id })
    return insertId ? <Navigate to={`../${id}/TaskEdit/${insertId}`} replace={true} /> : 'loading'
}
