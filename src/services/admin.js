import axios from "axios";

export const getUsers = async () => {
    const response = await axios.get("http://localhost:5173/users.json")
    return response.data
}