import React from 'react';
import { Link } from 'react-router-dom';

const Comienzo = () => {
  return (
    <div className="min-h-screen bg-dark-blue-100 flex items-center justify-center" >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Prueba tu nivel de Ingles de manera Gratuita
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Estos son nuestros niveles de inglés. Elige uno para comenzar el test de prueba.
        </p>
        <div className="space-y-4">
          <Link
            to="/testFacil"
            className="block w-full bg-blue-500 text-white p-4 rounded-lg text-lg text-center hover:bg-blue-600 transition"
          >
            Nivel Fácil
            <p className="text-sm text-blue-100">Prueba de nivel básico de inglés.</p>
          </Link>
          <Link
            to="/testMedio"
            className="block w-full bg-green-500 text-white p-4 rounded-lg text-lg text-center hover:bg-green-600 transition"
          >
            Nivel Medio
            <p className="text-sm text-green-100">Prueba de nivel intermedio de inglés.</p>
          </Link>
          <Link
            to="/testDificil"
            className="block w-full bg-purple-500 text-white p-4 rounded-lg text-lg text-center hover:bg-purple-600 transition"
          >
            Nivel Difícil
            <p className="text-sm text-purple-100">Prueba de nivel avanzado de inglés.</p>
          </Link>
        </div>
        <div className="mt-6 text-center">   
        <Link
      to={"/"} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
      Volver a Inicio
        </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Comienzo;
