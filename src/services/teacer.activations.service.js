import axios from "axios";
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'


export const uploadActivateFile = async ({
  token,
  file,
  type
}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  let formData = new FormData()

  formData.append("file", file)
  formData.append("type", type)

  const response = await axios.post(`${base_url}/api/activation`, formData, config)

  return response.data
}

export const checkActivation = async ({
  token
}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.get(`${base_url}/api/activation/check`, config)

  return response.data
}