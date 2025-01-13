import axios from 'axios'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

export const getAllCourses = async ({ token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.get(`${base_url}/api/dashboard/rooms`, config)

  return response.data
}

export const enrollToCourse = async ({ room, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.get(`${base_url}/api/dashboard/rooms/courses/enroll/${room}`, config)

  return response.data
}

export const getMyCourses = async ({ token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.get(`${base_url}/api/dashboard/rooms/courses`, config)

  return response.data
}

export const getRoomInfoService = async ({ token, userId, room }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }

  }

  const response = await axios.get(`${base_url}/api/dashboard/rooms/courses/info/${userId}/${room}`, config)

  return response.data

}