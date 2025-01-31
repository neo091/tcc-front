
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000';

const fetchVerifications = async () => {
  const response = await fetch(`${base_url}/act/verifications`);
  if (!response.ok) {
    throw new Error('Error al obtener las verificaciones');
  }
  return await response.json();
};

const fetchVerificationDetails = async (id) => {
  const response = await fetch(`${base_url}/act/verificationup/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los detalles de la verificación');
  }
  return await response.json();
};

const updateVerification = async (id, formData) => {
  const response = await fetch(`${base_url}/act/verificationup/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la verificación');
  }
};

const getStateLabel = (state) => {
  switch (state) {
    case 0: return 'Pendiente';
    case 1: return 'Aceptado';
    case 2: return 'Rechazado';
    default: return 'Desconocido';
  }
};

const Activation = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [formData, setFormData] = useState({ state: 0, verified: 0, state_message: '' });
  const [zoomedImage, setZoomedImage] = useState(null); // Nuevo estado

  useEffect(() => {
    const loadVerifications = async () => {
      try {
        const data = await fetchVerifications();
        setVerifications(data);
      } catch {
        setError('Error al obtener verificaciones');
      } finally {
        setLoading(false);
      }
    };
    loadVerifications();
  }, []);

  const handleSelectVerification = async (verification) => {
    try {
      const details = await fetchVerificationDetails(verification.id);
      setSelectedVerification(details[0]);
      setFormData({ 
        state: details[0].state || 0, 
        verified: details[0].verified, 
        state_message: details[0].state_message || '' ,
        estado: details[0].estado
      });
    } catch {
      setError('Error al obtener detalles de la verificación');
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === 'checkbox' ? (e.target.checked ? 1 : 0) : value;

    if (name === 'state') {
      setFormData((prev) => ({
        ...prev,
        state: value,
        verified: value == 1 || value == 2 ? 1 : 0,
        state_message: value == 1 ? 'aceptado' : value == 2 ? prev.state_message : '',
        estado: value == 1 ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleUpdate = async () => {
    if (!selectedVerification) return;

    if (formData.state == 2 && !formData.state_message.trim()) {
      Swal.fire({ title: 'Error', text: 'Debe ingresar un motivo de rechazo', icon: 'error' });
      return;
    }

    try {
      await updateVerification(selectedVerification.id, formData);
      const updatedVerifications = await fetchVerifications();
      setVerifications(updatedVerifications);
      Swal.fire({ title: 'Éxito', text: 'Verificación actualizada', icon: 'success' });
      setSelectedVerification(null);
    } catch {
      Swal.fire({ title: 'Error', text: 'Error al actualizar', icon: 'error' });
    }
  };

  // Función para manejar el clic en la imagen
  const handleImageClick = (img) => {
    setZoomedImage(img);
  };

  // Función para cerrar el modal de zoom
  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-white mb-8">Gestión de Verificaciones</h1>
      {loading && <div className="text-center">Cargando...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">Lista de Verificaciones</h2>
        <table className="table-auto w-full text-white border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 border-b text-left">Nombre  y Apellido</th>
              <th className="p-2 border-b text-left">Correo</th>
              <th className="p-2 border-b text-left">Estado</th>
              <th className="p-2 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((verification) => (
              <tr key={verification.id} className="hover:bg-gray-600">
                <td className="p-2 border-b">{verification.nombre_completo}</td>
                <td className="p-2 border-b">{verification.correo}</td>
                <td className="p-2 border-b">{getStateLabel(verification.state)}</td>
                <td className="p-2 border-b text-center">
                  <button
                    onClick={() => handleSelectVerification(verification)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
            <h2 className="text-xl font-semibold mb-4">Detalles de Verificación</h2>
            {selectedVerification.img_1 && (
              <img 
                src={`${base_url}/${selectedVerification.img_1}`} 
                alt="Imagen 1" 
                className="mb-2 rounded-lg cursor-pointer"
                onClick={() => handleImageClick(`${base_url}/${selectedVerification.img_1}`)}
              />
            )}

            {selectedVerification.img_2 && (
              <img 
                src={`${base_url}/${selectedVerification.img_2}`} 
                alt="Imagen 2" 
                className="mb-4 rounded-lg cursor-pointer"
                onClick={() => handleImageClick(`${base_url}/${selectedVerification.img_2}`)}
              />
            )}

            <select name="state" value={formData.state} onChange={handleChange} className="w-full mb-4 p-2 rounded bg-gray-700">
              <option value={0}>Pendiente</option>
              <option value={1}>Aceptado</option>
              <option value={2}>Rechazado</option>
            </select>

            {formData.state == 2 && (
              <textarea
                name="state_message"
                value={formData.state_message}
                onChange={handleChange}
                placeholder="Ingrese el motivo del rechazo"
                className="w-full mb-4 p-2 rounded bg-gray-700"
              />
            )}

            <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded w-full mb-2">Actualizar</button>
            <button onClick={() => setSelectedVerification(null)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full">Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal de zoom */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" 
          onClick={handleCloseZoom}
        >
          <img 
            src={zoomedImage} 
            alt="Imagen ampliada" 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
      )}
    </div>
  );
};

export default Activation;
