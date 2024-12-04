
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reportService from '@services/reportService'; // Ajusta la ruta de importación según sea necesario
import { useAuthStore } from '@store/authStore';

const Report = () => {

  const { token, session } = useAuthStore()
  const navigate = useNavigate();

  const [aulas, setAulas] = useState([])
  const [aulaId, setAulaId] = useState(null)

  const [aula, setAula] = useState(false);
  const [estudiante, setEstudiante] = useState('');
  const [sugerenciasEstudiante, setSugerenciasEstudiante] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(false);
  const [students, setStudents] = useState([])

  const getRooms = async () => {
    const result = await fetch(`http://localhost:4000/api/teacher/rooms`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await result.json()

    if (result.ok) {
      setAulas(data.body)
    }
  }

  const getRoomsUsers = async ({ id }) => {
    const result = await fetch(`http://localhost:4000/api/teacher/rooms/${id}/students`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await result.json()

    if (result.ok) {
      setStudents(data.body)
      //console.log(data.body);
    }
  }

  // Manejar la selección de aula
  const seleccionarAula = (e) => {
    //setAula(selectedAula);
    //setEstudiante('');
    //setEstudianteSeleccionado(false);
    //setSugerenciasEstudiante([]);

    const id = e.target.value
    if (id === "") {
      setAula(false)
      setEstudiante("")
      setSugerenciasEstudiante([])
      return
    }

    setAula(true)
    getRoomsUsers({ id })
    setAulaId(id)
  };

  // Manejar la búsqueda de estudiante
  const buscarEstudiante = (e) => {
    const searchTxt = e.target.value
    setEstudiante(searchTxt)
    if (searchTxt === "") {
      setSugerenciasEstudiante([])
      return
    }


    const selectedStudent = [...students].filter(student =>
      student.nombre.toLowerCase().includes(searchTxt) ||
      student.apellido.toLowerCase().includes(searchTxt)
    )

    setSugerenciasEstudiante(selectedStudent);

  };

  // Seleccionar estudiante de las sugerencias
  const seleccionarEstudiante = (selectedEstudiante) => {
    setEstudiante(selectedEstudiante);
    setEstudianteSeleccionado(true);
    setSugerenciasEstudiante([]);
  };
  /*
    const imprimirPDF = () => {
      console.log('Generando reporte en PDF para:', aula, estudiante);
      // Lógica para generar el PDF
    };
  */
  const imprimirPDF = async () => {
    if (!token) {
      console.error("Usuario no autenticado.");
      alert("No se encuentra un token de autenticación.");
      return;
    }


    try {
      const reportBlob = await reportService.generateReport(
        { ne: estudiante, PRN: session.name, id_aula: aulaId }, // Asegúrate de pasar los datos correctos
        token
      );

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(reportBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.pdf'; // Nombre del archivo PDF
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Reporte generado con éxito.');
    } catch (error) {
      console.error("Error al generar el reporte:", error.message);
      alert("Ocurrió un error al generar el reporte. Intenta nuevamente.");
    }
  };

  useEffect(() => {

    getRooms()

  }, [])

  return (
    <div className="min-h-screen p-6 text-white" style={{ backgroundColor: '#141B2B' }}>
      <div className="bg-gray-800 p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Reportes</h1>
        <p className="mb-6 text-white-200">Selecciona un aula y un estudiante para generar un reporte.</p>

        {/* Select para seleccionar Aula */}
        <div className="mb-6">
          <label className="block text-white-300 mb-2">Seleccionar Aula:</label>
          <select
            onChange={seleccionarAula}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Selecciona un Aula --</option>
            {aulas.map((a) => (
              <option key={a.id} value={a.aula_id}>
                {a.nombre_aula} {a.id}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para buscar Estudiante */}
        <div className="mb-6">
          <label className="block text-white-300 mb-2">Buscar Estudiante:</label>
          <input
            type="text"
            value={estudiante}
            onChange={buscarEstudiante}
            placeholder="Escribe el nombre del estudiante..."
            className={`w-full px-4 py-2 rounded bg-gray-700 text-white border 
              ${aula ? 'border-white-600' : 'border-gray-500 cursor-not-allowed'} focus:outline-none focus:ring-2 ${!aula ? 'focus:ring-blue-400' : ''}`}
            disabled={!aula}
          />
          {sugerenciasEstudiante.length > 0 && (
            <ul className="border rounded bg-gray-700 mt-2">
              {sugerenciasEstudiante.map(element => (
                <li
                  key={element.nombre}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => seleccionarEstudiante(element.nombre + " " + element.apellido)}
                >
                  {element.nombre} {element.apellido}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4">
          <button
            onClick={imprimirPDF}
            className={`${aula && estudianteSeleccionado
              ? 'bg-cyan-500 hover:bg-green-700'
              : 'bg-gray-500 cursor-not-allowed'
              } text-white px-4 py-2 rounded shadow-md`}
            disabled={!aula || !estudianteSeleccionado}
          >
            Imprimir Reporte en PDF
          </button>
          <button
            onClick={() => navigate('/Teacher')}
            className="bg-rose-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;



/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const [aula, setAula] = useState('');
  const [estudiante, setEstudiante] = useState('');
  const [sugerenciasAula, setSugerenciasAula] = useState([]);
  const [sugerenciasEstudiante, setSugerenciasEstudiante] = useState([]);

  const navigate = useNavigate();

  const aulas = ['Aula 101', 'Aula 102', 'Aula 103', 'Laboratorio 1']; // Lista de aulas
  const estudiantes = ['Juan Pérez', 'María López', 'Carlos Gómez', 'Ana Torres']; // Lista de estudiantes

  const buscarAula = (input) => {
    setAula(input);
    setSugerenciasAula(
      input ? aulas.filter((a) => a.toLowerCase().includes(input.toLowerCase())) : []
    );
  };

  const buscarEstudiante = (input) => {
    setEstudiante(input);
    setSugerenciasEstudiante(
      input ? estudiantes.filter((e) => e.toLowerCase().includes(input.toLowerCase())) : []
    );
  };

  const imprimirPDF = () => {
    console.log('Generando reporte en PDF...');
    // Lógica para generar el PDF
    
  };

  return (
    <div className="min-h-screen p-6 text-white" style={{ backgroundColor: '#141B2B' }}>
      <div className="bg-gray-800 p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Reportes</h1>
        <p className="mb-6 text-white-200">Busca un aula y un estudiante para generar un reporte.</p>

        <div className="mb-6">
          <label className="block text-white-300 mb-2">Buscar Aula:</label>
          <input
            type="text"
            value={aula}
            onChange={(e) => buscarAula(e.target.value)}
            placeholder="Escribe el nombre del aula..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {sugerenciasAula.length > 0 && (
            <ul className="border rounded bg-gray-700 mt-2">
              {sugerenciasAula.map((s, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => {
                    setAula(s);
                    setSugerenciasAula([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

     
        <div className="mb-6">
          <label className="block text-white-300 mb-2">Buscar Estudiante:</label>
          <input
            type="text"
            value={estudiante}
            onChange={(e) => buscarEstudiante(e.target.value)}
            placeholder="Escribe el nombre del estudiante..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {sugerenciasEstudiante.length > 0 && (
            <ul className="border rounded bg-gray-700 mt-2">
              {sugerenciasEstudiante.map((s, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => {
                    setEstudiante(s);
                    setSugerenciasEstudiante([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

     
        <div className="flex gap-4">
          <button
            onClick={imprimirPDF}
            className="bg-cyan-500 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md"
          >
            Imprimir Reporte en PDF
          </button>
          <button
            onClick={() => navigate('/Teacher')}
            className="bg-rose-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
*/

/*

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generarReporte } from '../services/reportService';

const Report = () => {
  const [aula, setAula] = useState('');
  const [estudiante, setEstudiante] = useState('');
  const [sugerenciasAula, setSugerenciasAula] = useState([]);
  const [sugerenciasEstudiante, setSugerenciasEstudiante] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const aulas = ['Aula 101', 'Aula 102', 'Aula 103', 'Laboratorio 1'];
  const estudiantes = ['Juan Pérez', 'María López', 'Carlos Gómez', 'Ana Torres'];

  const buscarAula = (input) => {
    setAula(input);
    setSugerenciasAula(input ? aulas.filter((a) => a.toLowerCase().includes(input.toLowerCase())) : []);
  };

  const buscarEstudiante = (input) => {
    setEstudiante(input);
    setSugerenciasEstudiante(input ? estudiantes.filter((e) => e.toLowerCase().includes(input.toLowerCase())) : []);
  };

  const imprimirPDF = async () => {
    setCargando(true);
    setMensaje('');
    try {
      const data = await generarReporte(aula, estudiante);
      setMensaje(`Reporte generado con éxito: ${data.filePath}`);
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen p-6 text-white" style={{ backgroundColor: '#141B2B' }}>
      <div className="bg-gray-800 p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Reportes</h1>
        <p className="mb-6 text-white-200">Busca un aula y un estudiante para generar un reporte.</p>

        
        <div className="mb-6">
          <label className="block text-white-300 mb-2">Buscar Aula:</label>
          <input
            type="text"
            value={aula}
            onChange={(e) => buscarAula(e.target.value)}
            placeholder="Escribe el nombre del aula..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {sugerenciasAula.length > 0 && (
            <ul className="border rounded bg-gray-700 mt-2">
              {sugerenciasAula.map((s, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => {
                    setAula(s);
                    setSugerenciasAula([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
bd268
        <div className="mb-6">
          <label className="block text-white-300 mb-2">Buscar Estudiante:</label>
          <input
            type="text"
            value={estudiante}
            onChange={(e) => buscarEstudiante(e.target.value)}
            placeholder="Escribe el nombre del estudiante..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-white-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {sugerenciasEstudiante.length > 0 && (
            <ul className="border rounded bg-gray-700 mt-2">
              {sugerenciasEstudiante.map((s, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => {
                    setEstudiante(s);
                    setSugerenciasEstudiante([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={imprimirPDF}
            className="bg-cyan-500 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md"
            disabled={cargando}
          >
            {cargando ? 'Generando...' : 'Imprimir Reporte en PDF'}
          </button>
          <button
            onClick={() => navigate('/Teacher')}
            className="bg-rose-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
          >
            Volver
          </button>
        </div>

     
        {mensaje && <p className="mt-4 text-white">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Report;
*/