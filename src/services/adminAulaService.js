import { getUserData } from '../auth';

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000';
let token = null;

// Asigna el token para realizar las solicitudes
const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

// Obtiene el token de usuario y lo asigna
async function getToken() {
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
}

// Verifica la respuesta del servidor
const checkResponse = async response => {
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
    }
    return response.json();
}

export default {
    /**
     * Obtiene todas las aulas disponibles
     * @returns {Promise<Array>} Lista de aulas
     */
    async getAllAulas() {
        try {
            await getToken();
            const response = await fetch(`${base_url}/admin/aulas`, {
                method: 'GET',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            return await checkResponse(response);
        } catch (error) {
            console.error('Error al obtener las aulas:', error);
            throw error;
        }
    },

    /**
     * Obtiene una aula específica por su ID
     * @param {number} aulaId - ID del aula a buscar
     * @returns {Promise<Object>} Datos del aula
     */
    async getAulaById(aulaId) {
        try {
            await getToken();
            const response = await fetch(`${base_url}/admin/aulas/${aulaId}`, {
                method: 'GET',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            return await checkResponse(response);
        } catch (error) {
            console.error(`Error al obtener el aula con ID ${aulaId}:`, error);
            throw error;
        }
    },

    /**
     * Actualiza los datos generales de un aula (nombre y descripción)
     * @param {number} aulaId - ID del aula
     * @param {string} nombre_aula - Nuevo nombre del aula
     * @param {string} aula_descripcion - Nueva descripción del aula
     * @returns {Promise<Object>} Datos actualizados del aula
     */
    async updateAula(aulaId, nombre_aula, aula_descripcion) {
        try {
            await getToken();
            const response = await fetch(`${base_url}/admin/update-aula-gen`, {
                method: 'PUT',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ aulaId, nombre_aula, aula_descripcion })
            });
            return await checkResponse(response);
        } catch (error) {
            console.error('Error al actualizar el aula:', error);
            throw error;
        }
    },

    /**
     * Elimina un aula con el ID dado
     * @param {number} aulaId - ID del aula a eliminar
     */
    async deleteAula(aulaId) {
        try {
            await getToken();  // Asegurarse de que el token de usuario esté disponible
            const response = await fetch(`${base_url}/admin/delete/${aulaId}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            // Comprobamos la respuesta del servidor
            const data = await checkResponse(response);

            // Si la eliminación fue exitosa, mostrar mensaje
            console.log('Aula eliminada con éxito:', data);
            alert(data.message);  // Mostrar mensaje al usuario

            // Actualizar la UI, si es necesario (por ejemplo, recargar la lista)
            // loadAulas(); // Si tienes una función que recarga las aulas en la UI

        } catch (error) {
            console.error('Error al eliminar el aula:', error);
            alert('No se pudo eliminar el aula. Intenta nuevamente.');
        }
    }
};
