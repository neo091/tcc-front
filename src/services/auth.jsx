import axios from 'axios'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

const register = async (user) => {
    const response = await axios.post(`${base_url}/api/register`, user)
    return response.data
}

const login = async (user) => {
    const response = await axios.post(`${base_url}/api/login`, user)
    return response.data
}

export const doLogin = async (data) => {
    const response = await axios.post(`${base_url}/api/login`, data)
    return response.data
}

export default { register, login }