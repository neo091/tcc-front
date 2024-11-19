import { useAuthStore } from "@store/authStore"
import { useNavigate } from "react-router-dom"

export function useAuth() {

  const { resetSession } = useAuthStore()
  const navigate = useNavigate()

  const Logout = async () => {
    await resetSession()
    window.localStorage.clear()

    navigate('/Login')
  }


  return { Logout }
}