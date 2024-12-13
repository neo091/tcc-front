const TaskResume = ({ resume }) => {
  return (
    <>
      <h1>Resumen!</h1>
      <p className="p-2 bg-slate-700 rounded shadow shadow-black">Puntos: {resume.points} de {resume.points_total}</p>
    </>
  )
}

export default TaskResume;
