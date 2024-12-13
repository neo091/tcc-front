/*
import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import UsersList from "@components/UsersList";

const Users = () => {

    return (
        <section className="grid grid-cols-12 py-2">

            <Card extraCss="col-span-12">
                <CardHeader>
                    <CardTitle>
                        Usuarios
                    </CardTitle>
                </CardHeader>
                <CardContent>

                    <UsersList />

                </CardContent>
            </Card>

        </section >
    );
}

export default Users;
*/
import React, { useEffect, useState } from 'react';
import adminUsuarioService from '../../services/adminUsuarioService';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('1'); // Usar string para coincidir con las opciones
  const [estado, setEstado] = useState('activo');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Definimos un mapa para los roles
  const rolMap = {
    '1': 'Alumno',
    '2': 'Profesor',
    '3': 'Admin',
  };

  const fetchUsuarios = async () => {
    try {
      const data = await adminUsuarioService.getAllUsuarios();
      setUsuarios(data.data || []);
      setLoading(false);
    } catch (error) {
      setError('Error al obtener usuarios');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Filtrar usuarios según el rol y la búsqueda
  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (roleFilter ? usuario.rol_id && usuario.rol_id.toString() === roleFilter : true) // Verificamos si rol_id está definido
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre') setNombre(value);
    if (name === 'apellido') setApellido(value);
    if (name === 'email') setEmail(value);
    if (name === 'rol') setRol(value);
    if (name === 'estado') setEstado(value);
  };

  const handleSelectUser = (usuario) => {
    setSelectedUser(usuario);
    setNombre(usuario.nombre || '');
    setApellido(usuario.apellido || '');
    setEmail(usuario.correo || '');
    setRol(usuario.rol_id ? usuario.rol_id.toString() : '1');  // Verificación para rol_id
    setEstado(usuario.estado || 'activo');
  };

  const handleDelete = async (usuarioId) => {
    try {
      await adminUsuarioService.deleteUsuario(usuarioId);
      setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.usuario_id !== usuarioId));
    } catch (err) {
      setError('Error al eliminar el usuario');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Map roles correctly
    const rolMapping = {
      'Alumno': 1,
      'Profesor': 2,
      'Admin': 3
    };

    const updates = {};
    if (nombre !== selectedUser.nombre) updates.nombre = nombre;
    if (apellido !== selectedUser.apellido) updates.apellido = apellido;
    if (email !== selectedUser.correo) updates.correo = email;
    if (rolMapping[rol] !== selectedUser.rol_id) updates.rol_id = rolMapping[rol];
    if (estado !== selectedUser.estado) updates.estado = estado;

    // If no changes are made, return early
    if (Object.keys(updates).length === 0) {
      setError('No se han realizado cambios para actualizar.');
      return;
    }

    try {
      await adminUsuarioService.updateUsuario(selectedUser.usuario_id, updates);
      fetchUsuarios();
      setSelectedUser(null);
      setNombre('');
      setApellido('');
      setEmail('');
      setRol('1'); // Default role value
      setEstado('activo');
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
    setNombre('');
    setApellido('');
    setEmail('');
    setRol('1');
    setEstado('activo');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: 'white' }}>Gestión de Usuarios</h1>

      {loading && <div className="text-center"><div className="spinner-border" role="status"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full text-black placeholder-gray-400"
        />
      </div>

      <div className="mb-3">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full text-black"
        >
          <option value="">Filtrar por rol</option>
          <option value="1">Alumno</option>
          <option value="2">Profesor</option>
          <option value="3">Admin</option>
        </select>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h3 className="mb-3" style={{ color: 'White' }}>Usuarios</h3>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map(usuario => (
                <tr key={usuario.usuario_id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td>
                    {usuario.rol_id && rolMap[usuario.rol_id.toString()] ?
                      rolMap[usuario.rol_id.toString()] : 'Desconocido'}
                  </td>
                  <td>{usuario.estado}</td>
                  <td>
                    <button
                      onClick={() => handleSelectUser(usuario)}
                      className="btn btn-warning btn-sm mr-2"
                    >
                      Gestionar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6 mb-4">
          {selectedUser && (
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded w-full text-black"
                />
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellido"
                  value={apellido}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded w-full text-black"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded w-full text-black"
                />
              </div>
              <div className="form-group">
                <label>Rol:</label>
                <select
                  name="rol"
                  value={rol}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded w-full text-black"
                >
                  <option value="1">Alumno</option>
                  <option value="2">Profesor</option>
                  <option value="3">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Estado:</label>
                <input
                  type="text"
                  name="estado"
                  value={estado}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded w-full text-black"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={handleBack}>Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
