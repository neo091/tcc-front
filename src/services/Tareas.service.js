import axios from "axios";
const base_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'


export async function obtenerTareas({roomId, token}){

  const config = {
    headers:{
      "Authorization": `Bearer ${token}`
    }
  }
  const result = await axios.get(`${base_url}/api/dashboard/rooms/${roomId}/tasks`, config)

  return result.data

}