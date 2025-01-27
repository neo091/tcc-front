
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getUserData } from '../../auth';

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000/admin';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getToken = async () => {
  try {
    const result = await getUserData();
    if (result && result.token) {
      setToken(result.token);
    } else {
      console.warn('No se encontró el token de usuario.');
    }
  } catch (error) {
    console.error('Error al obtener el token de usuario:', error);
    throw error;
  }
};

const fetchUsuarios = async () => {
  await getToken();
  const response = await fetch(`${base_url}/usuarios-all`, {
    headers: { Authorization: token },
  });
  if (!response.ok) {
    throw new Error('Error al obtener los usuarios');
  }
  return await response.json();
};

const updateUsuario = async (usuarioId, formData) => {
  await getToken();
  const response = await fetch(`${base_url}/update-usuario/${usuarioId}`, {
    method: 'PATCH',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el usuario');
  }
};

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    rol_id: '1',
    estado: 'activo',
  });
  const [filters, setFilters] = useState({ searchQuery: '', roleFilter: '' });

  const rolMap = {
    '1': 'Alumno',
    '2': 'Profesor',
    '3': 'Admin',
  };

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await fetchUsuarios();
        setUsuarios(data.data || []);
      } catch {
        setError('Error al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };
    loadUsuarios();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectUser = (usuario) => {
    setSelectedUser(usuario);
    setFormData({
      nombre: usuario.nombre || '',
      apellido: usuario.apellido || '',
      correo: usuario.correo || '',
      rol_id: usuario.rol_id?.toString() || '1',
      estado: usuario.estado || 0,
    });
    setSuccessMessage('');
  };
/*
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await updateUsuario(selectedUser.usuario_id, formData);
      setUsuarios((prev) =>
        prev.map((user) =>
          user.usuario_id === selectedUser.usuario_id
            ? { ...user, ...formData }
            : user
        )
      );
      setSuccessMessage('Usuario actualizado exitosamente');
      
      setSelectedUser(null);
      setFormData({ nombre: '', apellido: '', correo: '', rol_id: '1', estado: 'activo' });
    } catch {
      setError('Error al actualizar el usuario');
    }
  };
*/
const handleUpdate = async (e) => {
  e.preventDefault();
  if (!selectedUser) return;

  try {
    await updateUsuario(selectedUser.usuario_id, formData);
    setUsuarios((prev) =>
      prev.map((user) =>
        user.usuario_id === selectedUser.usuario_id
          ? { ...user, ...formData }
          : user
      )
    );

    Swal.fire({
      title: '¡Éxito!',
      text: 'Usuario actualizado exitosamente',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    setSelectedUser(null);
    setFormData({ nombre: '', apellido: '', correo: '', rol_id: '1', estado: 'activo' });
  } catch {
    Swal.fire({
      title: 'Error',
      text: 'Error al actualizar el usuario',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
};
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nombre.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesRole = filters.roleFilter
      ? usuario.rol_id?.toString() === filters.roleFilter
      : true;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-white mb-8">Gestión de Usuarios</h1>
      {loading && <div className="text-center">Cargando...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User List */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4">Gestion de Usuarios</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="searchQuery"
              placeholder="Buscar por nombre..."
              value={filters.searchQuery}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-600 rounded text-black"
            />
            <select
              name="roleFilter"
              value={filters.roleFilter}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-600 rounded text-black"
            >
              <option value="">Filtrar por rol</option>
              <option value="1">Alumno</option>
              <option value="2">Profesor</option>
              <option value="3">Admin</option>
            </select>
          </div>
          <table className="table-auto w-full mt-4 text-white">
            <thead>
              <tr>
                <th className="text-left">Nombre</th>
                <th className="text-left">Apellido</th>
                <th className="text-left">Email</th>
                <th className="text-left">Rol</th>
                <th className="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.usuario_id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td>{rolMap[usuario.rol_id?.toString()] || 'Desconocido'}</td>
                  <td>
                    <button
                      onClick={() => handleSelectUser(usuario)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Gestionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Form */}
        {selectedUser && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Gestionar Usuarios</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded text-black"
                  required
                />
              </div>
              <div>
                <label className="text-white">Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded text-black"
                  required
                />
              </div>
              <div>
                <label className="text-white">Email:</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded text-black"
                  required
                />
              </div>
              <div>
                <label className="text-white">Rol:</label>
                <select
                  name="rol_id"
                  value={formData.rol_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded text-black"
                >
                  <option value="1">Alumno</option>
                  <option value="2">Profesor</option>
                  <option value="3">Admin</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-white">Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-600 rounded text-black"
                >
                  <option value="1">ACTIVO</option>
                  <option value="0">INACTIVO</option>
                </select>
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white px-4 py-2 rounded mr-2  hover:bg-green-600"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="bg-pink-500 text-white px-4 py-2 rounded  hover:bg-red-600"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

};

export default Users;
