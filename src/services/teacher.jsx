
import axios from 'axios'

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

const addNewVirtualRoom = async (data) => {

    setToken(data.user.token)

    const newData = {
        name: data.name,
        level: data.level,
        desc: data.desc,
        id: data.user.id
    }

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${base_url}/api/teacher/add-virtual-room`, newData, config)
    return response.data
}


export default { addNewVirtualRoom, getAllRooms }