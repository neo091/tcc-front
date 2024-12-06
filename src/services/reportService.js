import axios from "axios";
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000';

/**
 * Servicio para generar el reporte.
 * @param {Object} params - Parámetros necesarios para el reporte.
 * @param {string} params.ne - Nombre completo del estudiante.
 * @param {string} params.PRN - Nombre completo del profesor.
 * @param {number} params.id_aula - ID del aula virtual.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Blob>} - Promesa que resuelve un Blob con el PDF del reporte.
 */
const generateReport = async ({ ne, PRN, id_aula }, token) => {
    if (!ne || !PRN || !id_aula) {
        throw new Error("Los parámetros ne, PRN y id_aula son obligatorios.");
    }

    if (!token) {
        throw new Error("Token de autorización no proporcionado.");
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        responseType: 'blob', // Especifica que esperas un archivo como respuesta.
    };

    try {
        const response = await axios.get(`${base_url}/api/reporte`, {
            params: { ne, PRN, id_aula },
            ...config,
        });

        return response.data; // Devuelve el archivo PDF como un Blob.
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        throw new Error(
            error.response?.data?.error || "Error al generar el reporte. Intenta nuevamente."
        );
    }
};
const getAulasYEstudiantes = async (token) => {
    if (!token) {
        throw new Error("Token de autorización no proporcionado.");
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${base_url}/api/aulas`, config);
        return response.data; // Se espera que la API devuelva un objeto con las aulas y los estudiantes.
    } catch (error) {
        console.error("Error al obtener las aulas y estudiantes:", error);
        throw new Error("Error al obtener las aulas y estudiantes. Intenta nuevamente.");
    }
};



const saveComment = async ({ comentario, user_id, room }, token) => {
    if (!comentario || !user_id || !room) {
        throw new Error("Los parámetros comentario, user_id y room son obligatorios.");
    }

    if (!token) {
        throw new Error("Token de autorización no proporcionado.");
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.post(`${base_url}/api/comentario/${user_id}/${room}`, { comentario }, config);
        return response.data; // Devuelve el resultado de la operación.
    } catch (error) {
        console.error("Error al guardar el comentario:", error);
        throw new Error(
            error.response?.data?.error || "Error al guardar el comentario. Intenta nuevamente."
        );
    }
};

const updateComment = async ({ comentario, user_id, room }, token) => {
    if (!comentario || !user_id || !room) {
        throw new Error("Los parámetros comentario, user_id y room son obligatorios.");
    }

    if (!token) {
        throw new Error("Token de autorización no proporcionado.");
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(`${base_url}/api/comentario/${user_id}/${room}`, { comentario }, config);
        return response.data; // Devuelve el resultado de la operación.
    } catch (error) {
        console.error("Error al actualizar el comentario:", error);
        throw new Error(
            error.response?.data?.error || "Error al actualizar el comentario. Intenta nuevamente."
        );
    }
};


const getAlumno = async ( nombre, apellido, aula_id , token) => {
    if (!nombre || !apellido || !aula_id) {
        throw new Error("Los parámetros nombre, apellido y aula_id son obligatorios.");
    }

    if (!token) {
        throw new Error("Token de autorización no proporcionado.");
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${base_url}/api/getalumno/${nombre}/${apellido}/${aula_id}`, config);
        return response.data; // Devuelve los datos del alumno.
    } catch (error) {
        console.error("Error al obtener el alumno:", error);
        throw new Error(
            error.response?.data?.error || "Error al obtener el alumno. Intenta nuevamente."
        );
    }
};





export default {
    generateReport,
    getAulasYEstudiantes,
    saveComment,  
    updateComment,
    getAlumno
};
