import axios from "axios";
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'
export const getUsers = async () => {
    const response = await axios.get("http://localhost:5173/users.json")
    return response.data
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}