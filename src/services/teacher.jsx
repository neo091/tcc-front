
import axios from 'axios'
import { getUserData } from '../auth'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllRooms = async (data) => {
    setToken(data.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/all-rooms/${data.id}`, config)
    return response.data

}

const getWhitId = async (id) => {

    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }


    const response = await axios.get(`${base_url}/api/teacher/room/${id}`, config)

    return response.data

}

const add = async (data) => {


    const user = await getUserData()

    setToken(user.token)

    const newData = {
        name: data.name,
        level: data.level,
        desc: data.desc,
        id: user.id
    }

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${base_url}/api/teacher/add-virtual-room`, newData, config)
    return response.data
}

const deleteRoom = async (id) => {
    const user = await getUserData()
    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${base_url}/api/teacher/delete-virtual-room/${id}`, config)
    return response.data

}

const edit = async (data, id) => {
    const user = await getUserData()

    setToken(user.token)

    const newData = {
        nombre_aula: data.name,
        nivel: data.level,
        aula_descripcion: data.desc
    }

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${base_url}/api/teacher/room/${id}`, newData, config)
    return response.data
}

const getLessons = async (id_room) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/lessons/${id_room}/all`, config)
    return response.data
}

export const createLesson = async (id_room) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${base_url}/api/teacher/lessons/create/${id_room}`, {}, config)
    return response.data
}

export const getLesson = async (lessonId) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/lessons/${lessonId}`, config)
    return response.data
}

export async function updateLesson(lessonId, data) {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${base_url}/api/teacher/lessons/update/${lessonId}`, data, config)
    return response.data
}

export default { deleteRoom, add, edit, getAllRooms, getWhitId, getLessons }