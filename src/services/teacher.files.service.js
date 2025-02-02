import axios from "axios";
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

export const deleteFile = async ({
  token,
  file
}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.delete(`${base_url}/api/teacher/files/${file}`, config)

  return response.data
}
