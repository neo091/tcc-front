export const ExamResume = ({ currentExamId, notaExamen, correctQuestions }) => {

  return (
    <>
      <h1>Resumen: {currentExamId}</h1>
      <p>{notaExamen.recommendations}</p>
      <p>{JSON.stringify(correctQuestions)}</p>
    </>
  )
}