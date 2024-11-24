import axios from 'axios'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

export const getLessons = async ({ room, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.get(`${base_url}/api/dashboard/rooms/courses/${room}/lessons`, config)

  return response.data
}