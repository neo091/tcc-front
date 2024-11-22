import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';

const FinishExam = ({ notaExamen, exam, correctQuestion, roomId }) => {

  return (
    <div className="text-center flex flex-col gap-3 items-center justify-center bg-slate-800 rounded max-w-[600px] m-auto py-8">

      {notaExamen.percentage > 70 ? <CheckBadgeIcon className="w-24 text-green-500" /> : <XCircleIcon className="w-24 text-red-600" />}
      <h2 className="text-2xl font-semibold">Has terminado el examen</h2>
      <p>Su puntuación: {correctQuestion.reduce((acc, item) => acc + item.points, 0)} de {exam.reduce((acc, item) => acc + item.points, 0)}</p>
      <p>{notaExamen.recommendations}</p>

      <Link to={`/Dashboard/Rooms/${roomId}`} className=" bg-violet-600 px-4 py-2 rounded w-[200px] m-auto block text-center mt-8">Volver</Link>
    </div>
  );
}

export default FinishExam;
