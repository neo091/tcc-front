// deje de usar ya que enviaba datos inconsistentes. 
import axios from 'axios';
import { getUserData } from '../auth';

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000';
let token = null;

/**
 * Asigna el token para realizar las solicitudes
 * @param {string} newToken - El token de autenticación
 */
const setToken = (newToken) => {
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
 * Solicita todos los usuarios al backend
 */
export async function getAllUsuarios() {
  await getToken();
  try {
    const response = await axios.get(`${base_url}/usuarios-all`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

/**
 * Solicita un usuario específico al backend por su ID
 * @param {number} id - ID del usuario
 */
export async function getUsuarioById(id) {
  await getToken();
  try {
    const response = await axios.get(`${base_url}/usuarios/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

/**
 * Actualiza los datos de un usuario específico
 * @param {number} id - ID del usuario
 * @param {object} data - Datos a actualizar
 */
export async function updateUsuario(id, data) {
  await getToken();
  try {
    const response = await axios.patch(`${base_url}/update-usuario/${id}`, data, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
}

