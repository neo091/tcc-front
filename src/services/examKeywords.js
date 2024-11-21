import axios from "axios";

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

export const getKeywordsService = async (roomId) => {
  const response = await axios.get(`${base_url}/api/teacher/lessons/contents/keywords/${roomId}`)
  return response.data
}
