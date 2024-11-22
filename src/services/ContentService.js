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

export const generateContent = async (data) => {

  await getToken()

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
  await getToken()
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
  await getToken()

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(
    `${base_url}/api/teacher/lessons/contents/all/${lessonId}`, config
  )

  return response.data
}

export async function deleteContent(contentId) {
  await getToken()

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(
    `${base_url}/api/teacher/lessons/contents/delete/${contentId}`, config
  )

  return response.data
}