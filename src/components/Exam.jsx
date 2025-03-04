import React, { useEffect, useState } from 'react';
import { fetchExams } from '../services/exam'; // Asegúrate de que el path sea correcto
import { useAuthStore } from '@store/authStore'; // O el store que estés usando
import { getUserData } from '../auth'; // Asegúrate de que esta función esté correctamente definida

const Exam = () => {
  const { token, setToken } = useAuthStore(); // Obtener el token del estado global
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenAndExams = async () => {
      if (!token) {
        await getToken(); // Asegúrate de que getToken() esté correctamente implementado
      }

      if (token) {
        try {
          const user = await getUserData(token); // Obtener el userId del token directamente
          const userId = user.id;  // Asumiendo que el userId se encuentra en `user.id`

          const exams = await fetchExams({ token, userId });
          setExamList(exams);

          console.log(exams)
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTokenAndExams();
  }, [token]);

  const getLevelColor = (level) => {
    return level === "Principiante" ? 'text-green-500' : level === "Intermedio" ? "text-yellow-500" : "text-red-500";
  };

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className='my-4 mx-6 max-h-80 overflow-x-auto'>
      {/* Encabezado de la tabla de exámenes */}
      <div className='flex justify-between'>
        <div className='px-6 py-2 bg-slate-700 flex-1'>Examen</div>
        <div className='px-6 py-2 bg-slate-700 flex-1'>Nivel</div>
        <div className='px-6 py-2 bg-slate-700 flex-1'>Fecha Limite</div>
      </div>

      {/* Cuerpo de la tabla de exámenes */}
      <div>
        {examList.length === 0 ? (
          <div className="text-center py-4">No hay exámenes disponibles</div>
        ) : (
          examList.map((exam, index) => (
            <div key={index} className='flex justify-between border-b border-slate-700'>
              <div className='px-6 py-4 flex-1'>{exam.title}</div>
              <div className={`px-6 py-4 flex-1 ${getLevelColor(exam.nivel)}`}>{exam.nivel}</div>
              <div className='px-6 py-4 flex-1'>{exam.expires_at}</div>
            </div>
          ))
        )}
      </div>
    </div>



  );
};

export default Exam;
