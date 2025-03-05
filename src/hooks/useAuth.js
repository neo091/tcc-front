import { useAuthStore } from "@store/authStore"
import { useNavigate } from "react-router-dom"

export function useAuth() {

  const { resetSession } = useAuthStore()
  const navigate = useNavigate()

  const Logout = async (inactive = "") => {
    await resetSession()

    const lastColorBlindSelected = window.localStorage.getItem("colorblind")


    window.localStorage.clear()

    window.localStorage.setItem(
      'colorblind', lastColorBlindSelected
    )

    if (inactive !== "" && inactive === "inactive") {
      navigate('/Suspended')
      return
    }

    navigate('/Login')
  }


  return { Logout }
}