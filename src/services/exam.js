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

export const saveExamResume = async (data) => {

  await getToken()

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(
    `${base_url}/api/dashboard/exam/resume`,
    data,
    config
  )

  return response.data
}

export const getExamResume = async (id) => {

  await getToken()

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(
    `${base_url}/api/dashboard/exam/resume/${id}`,
    config
  )

  return response.data
}