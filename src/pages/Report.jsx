import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import reportService from '@services/reportService'; // Ajusta la ruta de importación según sea necesario
import { useAuthStore } from '@store/authStore';
import { TrashIcon } from '@heroicons/react/24/solid';

const Report = () => {
  const { token, session } = useAuthStore();
  const navigate = useNavigate();

  const [aulas, setAulas] = useState([]);
  const [aulaId, setAulaId] = useState(null);

  const [aula, setAula] = useState(false);
  const [estudiante, setEstudiante] = useState('');
  const [sugerenciasEstudiante, setSugerenciasEstudiante] = useState([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(false);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState([]);
  const [studentComment, setStudentComment] = useState([])

  const getRooms = async () => {
    const result = await fetch(`http://localhost:4000/api/teacher/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json();

    if (result.ok) {
      setAulas(data.body);
    }
  };

  const getRoomsUsers = async ({ id }) => {
    const result = await fetch(`http://localhost:4000/api/teacher/rooms/${id}/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await result.json();

    if (result.ok) {
      setStudents(data.body);
    }
  };

  const seleccionarAula = (e) => {
    const id = e.target.value;

    // Si no se selecciona un aula válida, restablecemos el estado
    if (id === '') {
      setAula(false);
      setAulaId(null);
      setEstudiante('');
      setEstudianteSeleccionado(false);
      setSugerenciasEstudiante([]);
      setStudentComment([])
      return;
    }

    // Si se selecciona un aula válida, cargamos los estudiantes
    setAula(true);
    getRoomsUsers({ id });
    setAulaId(id);
    setEstudiante(''); // Restablecemos el campo de búsqueda
    setEstudianteSeleccionado(false); // Marcamos que no hay estudiante seleccionado
  };


  const buscarEstudiante = (e) => {
    const searchTxt = e.target.value;
    setEstudiante(searchTxt);
    if (searchTxt === '') {
      setSugerenciasEstudiante([]);
      setStudentComment([])
      return;
    }

    const selectedStudent = [...students].filter((student) =>
      student.nombre.toLowerCase().includes(searchTxt) ||
      student.apellido.toLowerCase().includes(searchTxt)
    );

    setSugerenciasEstudiante(selectedStudent);
  };

  const getStudentComments = async ({ id }) => {
    const comments = await fetch(`http://localhost:4000/api/comentario/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    const json = await comments.json()

    setStudentComment(json.body)
  }

  const seleccionarEstudiante = (selected) => {

    getStudentComments({ id: selected.usuario_id })
    setStudent(selected)
    setEstudiante(selected.nombre + ' ' + selected.apellido);
    setEstudianteSeleccionado(true);
    setSugerenciasEstudiante([]);
  };

  const imprimirPDF = async () => {
    if (!token) {
      console.error('Usuario no autenticado.');
      alert('No se encuentra un token de autenticación.');
      return;
    }

    try {
      const reportBlob = await reportService.generateReport(
        { ne: estudiante, PRN: session.name, id_aula: aulaId }, // Asegúrate de pasar los datos correctos
        token
      );

      const url = window.URL.createObjectURL(reportBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ReporteAlumno.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Reporte generado con éxito.');
    } catch (error) {
      console.error('Error al generar el reporte:');
      alert('Ocurrió un error al generar el reporte. Intenta nuevamente.');
    }
  };

  const addCommentService = async ({ comment }) => {
    const result = await fetch(`http://localhost:4000/api/comentario/${student.usuario_id}/${aulaId}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comentario: comment })
    })

    const json = await result.json()
    setStudentComment([json.body])
    console.log([json.body]);
  }

  const agregarComentario = () => {
    Swal.fire({
      title: 'Agregar comentario sobre el Alumno',
      input: 'textarea',
      inputLabel: ``,
      inputPlaceholder: 'Escribe tu comentario aquí...',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'El comentario no puede estar vacío.';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        addCommentService({ comment: result.value })
        Swal.fire('Guardado', 'El comentario ha sido guardado.', 'success');
      }
    });
  };

  const editCommentService = async ({ comment }) => {
    console.log(comment, student.usuario_id, aulaId)
    const result = await fetch(`http://localhost:4000/api/comentario/${student.usuario_id}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comentario: comment })
    })

    const json = await result.json()

    if (result.ok) {
      let studentCommentCopy = studentComment[0]
      studentCommentCopy.comentario = comment
      console.log([studentCommentCopy]);
      setStudentComment([studentCommentCopy])

    }

    console.log(json);
  }

  const editStudentComment = () => {
    Swal.fire({
      title: 'Agregar comentario sobre el Alumno',
      input: 'textarea',
      inputLabel: ``,
      inputPlaceholder: 'Escribe tu comentario aquí...',
      inputValue: studentComment[0].comentario,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'El comentario no puede estar vacío.';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Comentario agregado:', result.value);
        editCommentService({ comment: result.value })
        Swal.fire({
          text: 'El comentario ha sido guardado.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
          background: '#141B2B',
          color: 'white'
        });
      }
    });
  };

  const deleteCommentService = async ({ id }) => {
    const result = await fetch(`http://localhost:4000/api/comentario/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    if (result.ok) {
      setStudentComment([])
    }
  }

  const deleteCommentHandle = () => {
    Swal.fire({
      text: 'Borrar comentario?',
      icon: 'warning',
      showCancelButton: true,
      background: '#141B2B',
      color: 'white'
    }).then(result => {
      if (result.isConfirmed) {
        deleteCommentService({ id: studentComment[0].com_id })
      }
    })
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="min-h-screen p-6 text-white" style={{ backgroundColor: '#141B2B' }}>
      <div className="bg-gray-800 p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Reportes</h1>
        <p className="mb-6 text-white-200">Selecciona un aula y un estudiante para generar un reporte.</p>

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

        <div className="mb-6">
          <label className="block text-white-300 mb-2">Buscar Estudiante:</label>
          <input
            type="text"
            value={estudiante}
            onChange={buscarEstudiante}
            placeholder="Escribe el nombre del estudiante..."
            className={`w-full px-4 py-2 rounded bg-gray-700 text-white border ${aula ? 'border-white-600' : 'border-gray-500 cursor-not-allowed'
              } focus:outline-none focus:ring-2 ${!aula ? 'focus:ring-blue-400' : ''}`}
            disabled={!aula}
          />
          {sugerenciasEstudiante.length > 0 && (
            <ul className="border rounded bg-gray-700 mt-2">
              {sugerenciasEstudiante.map((element) => (
                <li
                  key={element.nombre}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => seleccionarEstudiante(element)}
                >
                  {element.nombre} {element.apellido}
                </li>
              ))}
            </ul>
          )}
        </div>

        {
          studentComment.length > 0 && <div>
            <h2>Comentarios:</h2>
            <div className='p-2 bg-gray-700 rounded my-2'>
              {studentComment.map(comment => {
                return (
                  <div className='flex gap-1'>

                    <p className='flex-1'>{comment?.comentario}</p>
                    <button className='p-2 bg-sky-600 rounded' onClick={editStudentComment}>Editar</button>
                    <button onClickCapture={deleteCommentHandle} className='p-2 bg-red-600 rounded'>
                      <TrashIcon className='w-6' />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        }

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

          {
            studentComment.length <= 0 && <button
              onClick={agregarComentario}
              className={`${aula && estudianteSeleccionado
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-gray-500 cursor-not-allowed'
                } text-white px-4 py-2 rounded shadow-md`}
              disabled={!aula || !estudianteSeleccionado}
            >
              Agregar Comentario
            </button>
          }


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
