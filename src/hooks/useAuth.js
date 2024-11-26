/*
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
}*/
import { useAuthStore } from "@store/authStore"
import { useNavigate } from "react-router-dom"

export function useAuth() {
  const { resetSession } = useAuthStore()
  const navigate = useNavigate()

  const Logout = async () => {
    try {
      // Reseteamos la sesión
      await resetSession()

      // Elimina solo los datos de autenticación del localStorage (puedes cambiar 'auth' por el nombre de la clave que uses)
      window.localStorage.removeItem('auth') 

      // Navegar al login después del logout
      navigate('/Login')

    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return { Logout }
}
