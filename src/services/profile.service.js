import axios from 'axios'
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

export async function updateUserImage({ file, token, type }) {

  const config = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
  }

  let formData = new FormData()

  formData.append("file", file)

  const result = await axios.put(`${base_url}/api/profile/${type}`, formData, config)
  return result.data
}