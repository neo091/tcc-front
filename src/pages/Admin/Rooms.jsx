import React, { useState, useEffect } from 'react';
import adminAulaService from '../../services/adminAulaService';
import Swal from 'sweetalert2';

const Rooms = () => {
    const [aulas, setAulas] = useState([]);
    const [selectedAula, setSelectedAula] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newNombre, setNewNombre] = useState('');
    const [newDescripcion, setNewDescripcion] = useState('');
    const [isSearchMode, setIsSearchMode] = useState(true); // Estado para controlar si estamos en el modo de búsqueda
    const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

    // Obtener todas las aulas
    useEffect(() => {
        const fetchAulas = async () => {
            try {
                const response = await adminAulaService.getAllAulas();
                setAulas(response);
            } catch (error) {
                console.error('Error al cargar las aulas:', error);
            }
        };
        fetchAulas();
    }, []);

    // Filtrar aulas según el nombre o descripción basado en la búsqueda
    const filteredAulas = aulas.filter(aula => 
        aula.nombre_aula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aula.aula_descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Manejar la selección de un aula
    const handleSelectAula = (aula) => {
        setSelectedAula(aula);
        setNewNombre(aula.nombre_aula);
        setNewDescripcion(aula.aula_descripcion);
        setIsSearchMode(false); // Cambiar a modo de detalles
    };

    
    const handleEditAula = async () => {
        if (selectedAula) {
            try {
                // Actualizar el aula en la base de datos
                await adminAulaService.updateAula(selectedAula.aula_id, newNombre, newDescripcion);

                // Actualizar el aula en el estado local
                const updatedAulas = aulas.map(aula =>
                    aula.aula_id === selectedAula.aula_id
                        ? { ...aula, nombre_aula: newNombre, aula_descripcion: newDescripcion }
                        : aula
                );
                setAulas(updatedAulas);

                // Actualizar el aula seleccionada
                setSelectedAula({ ...selectedAula, nombre_aula: newNombre, aula_descripcion: newDescripcion });

                setIsEditing(false); // Salir del modo de edición
            } catch (error) {
                console.error('Error al editar el aula:', error);
            }
        }
    };

    // Manejar la eliminación de un aula con SweetAlert2
    const handleDeleteAula = async (aulaId) => {
        // Mostrar popup de confirmación antes de eliminar
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Este cambio no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await adminAulaService.deleteAula(aulaId);
                // Eliminar el aula de la lista
                const updatedAulas = aulas.filter(aula => aula.aula_id !== aulaId);
                setAulas(updatedAulas);
                Swal.fire('¡Eliminado!', 'El aula ha sido eliminada.', 'success'); // Alerta de éxito
            } catch (error) {
                console.error('Error al eliminar el aula:', error);
            }
        }
    };

    // Función para volver al modo de búsqueda
    const handleBackToSearch = () => {
        setIsSearchMode(true); // Cambiar al modo de búsqueda
        setSelectedAula(null); // Limpiar la selección del aula
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Seleccion de Aulas</h1>

            {/* Barra de búsqueda */}
            {isSearchMode && (
                 <div className="mb-4">
                 <input
                   type="text"
                   placeholder="Buscar aula..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="border px-4 py-2 rounded w-full text-black placeholder-gray-400"
                />
                 </div>
           
            )}

            {/* Mostrar listado de aulas si estamos en el modo de búsqueda */}
            {isSearchMode ? (
                <div className="space-y-4">
                    {filteredAulas.length === 0 ? (
                        <p className="text-lg text-gray-200">No se encontraron aulas.</p>
                    ) : (
                        filteredAulas.map((aula) => (
                            <div key={aula.aula_id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-blue-800 transition-all">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold">{aula.nombre_aula}</h2>
                                    <p className="text-white-300">{aula.aula_descripcion}</p>
                                </div>

                                <div className="space-x-3">
                                    <button
                                        onClick={() => handleSelectAula(aula)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAula(aula.aula_id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                // Mostrar detalles del aula seleccionada
                <div className="mt-6 border-t pt-4">
                    <h2 className="text-2xl font-bold mb-4">Detalles del Aula</h2>
                    <p><strong>Nombre:</strong> {selectedAula.nombre_aula}</p>
                    <p><strong>Descripción:</strong> {selectedAula.aula_descripcion}</p>

                    {/* Mostrar formulario de edición si está en modo de edición */}
                    {isEditing ? (
                        <div className="space-y-3 mt-4">
                            <input
                                type="text"
                                value={newNombre}
                                onChange={(e) => setNewNombre(e.target.value)}
                                placeholder="Nuevo nombre"
                                className="border px-4 py-2 rounded w-full text-black"
                            />
                            <input
                                type="text"
                                value={newDescripcion}
                                onChange={(e) => setNewDescripcion(e.target.value)}
                                placeholder="Nueva descripción"
                                className="border px-4 py-2 rounded w-full text-black"
                            />
                            <button
                                onClick={handleEditAula}
                                className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-green-600"
                            >
                                Guardar cambios
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-red-600"
                            >
                                Volver
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={handleBackToSearch} // Botón de "Volver"
                                className="mt-4 ml-4 bg-pink-700 text-white px-6 py-2 rounded hover:bg-red-600"
                            >
                                Volver a seleccion de aulas
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Rooms;
