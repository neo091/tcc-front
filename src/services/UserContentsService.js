import axios from 'axios'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

export const getContents = async ({ lesson, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.get(`${base_url}/api/dashboard/rooms/courses/lessons/${lesson}/contents`, config)

  return response.data
}