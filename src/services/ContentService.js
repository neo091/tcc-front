import axios from 'axios'
import { getUserData } from '../auth'

const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

await getUserData().then(result => {
  setToken(result.token)
})

export const generateContent = async (data) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(
    `${base_url}/api/teacher/lessons/contents/generate`,
    data,
    config
  )

  return response.data
}

export async function saveContent(data) {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(
    `${base_url}/api/teacher/lessons/contents/save`,
    data,
    config
  )

  return response.data
}

export async function getContents(lessonId) {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(
    `${base_url}/api/teacher/lessons/contents/all/${lessonId}`, config
  )

  return response.data
}