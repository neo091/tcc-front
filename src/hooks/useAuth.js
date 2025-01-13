import { useAuthStore } from "@store/authStore"
import { useNavigate } from "react-router-dom"

export function useAuth() {

  const { resetSession } = useAuthStore()
  const navigate = useNavigate()

  const Logout = async (inactive = "") => {
    await resetSession()
    window.localStorage.clear()

    if (inactive !== "" && inactive === "inactive") {
      navigate('/Suspended')
      return
    }

    navigate('/Login')
  }


  return { Logout }
}