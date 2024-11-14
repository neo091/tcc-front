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

    const response = await axios.get(`${base_url}/api/teacher/rooms/all`, config)
    return response.data

}


export const createRoom = async () => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${base_url}/api/teacher/rooms/create`, {}, config)

    return response.data
}

export const getRooms = async () => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/rooms/all`, config)

    return response.data
}

export const getRoom = async (room_id) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/room/${room_id}`, config)

    return response.data
}

export const updateRoom = async (data) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${base_url}/api/teacher/room`, data, config)
    return response.data
}

export const deleteRoom = async (aula_id) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${base_url}/api/teacher/rooms/delete`, { aula_id }, config)

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

export const getLessons = async ({ id }) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/lessons/all/${id}`, config)

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

export const getLesson = async ({ id }) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/lessons/${id}`, config)
    return response.data
}

export const deleteLesson = async ({ lesson }) => {
    const user = await getUserData()

    const config = {
        headers: { Authorization: `Bearer ${user.token}` }
    }

    const response = await axios.delete(`${base_url}/api/teacher/lessons/delete/${lesson}`, config)

    console.log(response)

    return response.data
}

export const getLessonFiles = async (lessonId) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/lessons/files/${lessonId}/all`, config)
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

export const uploadFile = async (file, roomId) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token, "Content-Type": "multipart/form-data", }
    }

    let formData = new FormData()

    formData.append("file", file)

    const response = axios.post(`${base_url}/api/files/upload/${roomId}`, formData, config)
    return response
}

const uploadAudioFile = async (file, roomId, lessonId) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token, "Content-Type": "multipart/form-data", }
    }

    let formData = new FormData()

    formData.append("file", file)

    const response = await axios.post(`${base_url}/api/files/upload/audio/${roomId}/${lessonId}`, formData, config)
    return response.data
}

const downloadFileFromServer = async (file_id) => {

    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token },
        responseType: "blob"
    }


    const response = axios
        .get(`${base_url}/api/files/download/${file_id}`, config)

    return response
}

export const deleteFileFromServer = async (file_id) => {
    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    return axios.get(`${base_url}/api/files/delete/${file_id}`, config)
}


const addLessonContent = async (data, lesson) => {

    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    return await axios.post(`${base_url}/api/teacher/lessons/contents/create/${lesson}`, data, config)
}

export const addContent = async ({ lessonId, data }) => {

    const user = await getUserData()

    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    return await axios.post(`${base_url}/api/teacher/lessons/contents/create/${lessonId}`, data, config)
}

export async function getContents({ lessonId }) {

    console.log(lessonId, '?')
    const user = await getUserData()
    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/teacher/lessons/contents/all/${lessonId}`, config)
    console.log(response.data)
    return response.data
}

const getLessonContents = async (lesson) => {

    const user = await getUserData()

    setToken(user.token)


    const response = await axios.get(`${base_url}/api/teacher/lessons/contents/all/${lesson}`, config)

    return response.data
}

const getFile = async (id) => {
    const response = await axios.get(`${base_url}/api/files/${id}`)
    return response.data
}

export const getTeacherRoomFiles = async (roomId) => {

    const user = await getUserData()
    setToken(user.token)

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.get(`${base_url}/api/files/get/${roomId}`, config)
    return response.data
}

export const addTask = async ({ id }) => {
    const response = await axios.post(`${base_url}/api/teacher/tasks/add/${id}`)
    return response.data
}

export const getTasks = async ({ id }) => {
    const response = await axios.get(`${base_url}/api/teacher/tasks/add/${id}`)
    return response.data
}

export async function saveExam(data) {

    const user = await getUserData()

    setToken(user.token)

    return await axios.post(`${base_url}/api/teacher/exams/save`, data,
        {
            headers: { Authorization: token }
        }
    )
}


export async function editExam(data) {

    const user = await getUserData()

    setToken(user.token)

    return await axios.put(`${base_url}/api/teacher/exams/update`, data,
        {
            headers: { Authorization: token }
        }
    )
}

export async function getExams(roomID) {

    const user = await getUserData()

    setToken(user.token)

    return await axios.get(`${base_url}/api/teacher/exams/${roomID}`,
        {
            headers: { Authorization: token }
        }
    )
}



export async function deleteExam({ examID }) {
    const user = await getUserData()

    setToken(user.token)

    return await axios.post(`${base_url}/api/teacher/exams/delete`,
        { examID },
        {
            headers: { Authorization: token }
        }
    )
}

export default {
    deleteRoom,
    add,
    edit,
    getAllRooms,
    getWhitId,
    deleteLesson,
    uploadFile,
    downloadFileFromServer,
    deleteFileFromServer,
    addLessonContent,
    getLessonContents,
    uploadAudioFile,
    getFile,
    getContents,
    addContent
}