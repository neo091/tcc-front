
import { getUserData } from '../auth';

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000';
let token = null;

/**
 * Asigna el token para realizar las solicitudes
 * @param {string} newToken - El token de autenticación
 */
const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

/**
 * Obtiene el token de usuario y lo asigna
 */
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

/**
 * Verifica la respuesta del servidor
 * @param {Response} response - Respuesta del servidor
 * @returns {Promise<Object>} - El cuerpo de la respuesta en formato JSON
 * @throws {Error} - Lanza un error si la respuesta no es "ok"
 */
const checkResponse = async response => {
    if (!response.ok) {
        const errorMessage = await response.text();
        console.warn(`Error en la solicitud: ${response.status} - ${errorMessage}`);
        throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
    }
    return response.json();
}

export default {
    /**
     * Obtiene todos los usuarios disponibles
     * @returns {Promise<Array>} Lista de usuarios
     */
    async getAllUsuarios() {
        try {
            await getToken();
            const response = await fetch(`${base_url}/admin/usuarios-all`, {
                method: 'GET',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            return await checkResponse(response);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    },

    /**
     * Obtiene un usuario específico por su ID
     * @param {number} usuarioId - ID del usuario a buscar
     * @returns {Promise<Object>} Datos del usuario
     */
    async getUsuarioById(usuarioId) {
        try {
            await getToken();
            const response = await fetch(`${base_url}/admin/usuarios/${usuarioId}`, {
                method: 'GET',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            return await checkResponse(response);
        } catch (error) {
            console.error(`Error al obtener el usuario con ID ${usuarioId}:`, error);
            throw error;
        }
    },

    /**
     * Actualiza los datos de un usuario
     * @param {number} usuarioId - ID del usuario
     * @param {string} nombre - Nuevo nombre del usuario
     * @param {string} apellido - Nuevo apellido del usuario
     * @param {string} correo - Nuevo correo del usuario
     * @param {number} rol_id - Nuevo rol del usuario
     * @param {string} estado - Nuevo estado del usuario
     * @returns {Promise<Object>} Datos actualizados del usuario
     */
    async updateUsuario(usuarioId, nombre, apellido, correo, rol_id, estado) {
        try {
            await getToken();
            
            // Crear un objeto solo con los campos que no son null o undefined
            const data = {};
            if (nombre) data.nombre = nombre;
            if (apellido) data.apellido = apellido;
            if (correo) data.correo = correo;
            if (rol_id) data.rol_id = rol_id;
            if (estado) data.estado = estado;
    
            // Verificar si hay algún campo para enviar
            if (Object.keys(data).length === 0) {
                throw new Error("No se proporcionaron datos para actualizar");
            }
    
            const response = await fetch(`${base_url}/admin/update-usuario`, {
                method: 'PUT',
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuarioId, ...data }) // Enviar solo los campos modificados
            });
    
            return await checkResponse(response);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    },    

};
