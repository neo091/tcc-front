import Tarea from "./Tarea";

export const TareaOfList = ({ tareas }) => tareas.map(tarea => <Tarea key={tarea.id} tarea={tarea} />)