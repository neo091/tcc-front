import axios from 'axios'
import { getUserData } from '../auth'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

async function getToken() {
  await getUserData().then(result => {

    if (result) setToken(result.token)
  })
}

export const saveExamResume = async (data) => {

  await getToken()

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(
    `${base_url}/api/dashboard/exam/resume`,
    data,
    config
  )

  return response.data
}

export const getExamResume = async ({id, token}) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  console.log(config);

  const response = await axios.get(
    `${base_url}/api/dashboard/exam/resume/${id}`,
    config
  )

  return response.data
}

export const fetchExams = async ({ token, userId }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(`${base_url}/api/excurso`, {
      params: { id: userId },
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // Retorna los exámenes obtenidos
  } catch (error) {
    throw new Error('Error al obtener los exámenes en curso');
  }
}

export const getCountAulas = async ({ token, id }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(`${base_url}/api/countaula`, {
      params: { id },
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // Retorna la cantidad de aulas
  } catch (error) {
    throw new Error('Error al obtener la cantidad de aulas');
  }
}


export const getCountFiles = async ({ token, userId, aulaId }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(`${base_url}/api/countfiles`, {
      params: { userId, aulaId },
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // Retorna la cantidad de archivos
  } catch (error) {
    throw new Error('Error al obtener la cantidad de archivos');
  }
}


export const getCountTareas = async ({ token, userId, aulaId }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(`${base_url}/api/counttareas`, {
      params: { userId, aulaId },
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // Retorna la cantidad de tareas
  } catch (error) {
    throw new Error('Error al obtener la cantidad de tareas');
  }
}


// Obtener la cantidad de alumnos en un aula
export const getCountAlumnos = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(`${base_url}/api/countalumnos`, {
      params: { id },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Retorna la cantidad de alumnos
  } catch (error) {
    throw new Error('Error al obtener la cantidad de alumnos');
  }
}

export const getListaAlumnos = async ({ token, id }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const response = await axios.get(`${base_url}/api/listalumnos`, {
      params: { id },
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data; // Retorna la lista de alumnos
  } catch (error) {
    throw new Error('Error al obtener la lista de alumnos');
  }
}
