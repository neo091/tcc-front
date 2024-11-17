import { useState } from 'react'
import Alert from '@components/Alerts'
import RegisterService, { doLogin } from '@services/auth'
import isEmail from 'validator/lib/isEmail'

import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { AcademicCapIcon } from '@heroicons/react/24/solid'

const Input = ({ type, label, handle }) => {
  return (
    <input type={type} placeholder={label} className='p-2 bg-slate-700 rounded w-full' onChange={(e) => handle(e.target.value)} />
  )
}

const RegisterTeacher = () => {

  const [user, setUser] = useState({ rol_id: 2 })
  const [hideAlert, setHideAlert] = useState(true)
  const [alertMessage, setAlertMessage] = useState('default')
  const [alertType, setAlertType] = useState('default')
  const navigate = useNavigate()
  const { setSession, setIsLogin } = useAuthStore()

  const nameHandle = (text) => {
    setUser({ ...user, name: text })
  }

  const lastNameHandle = (text) => {
    setUser({ ...user, lastName: text })
  }

  const emailHandle = (text) => {
    setUser({ ...user, email: text })
  }

  const passwordHandle = (text) => {
    setUser({ ...user, password: text })
  }

  const showAlert = ({ type, message, time }) => {
    setHideAlert(false)
    setAlertMessage(message || 'no message yet')
    setAlertType(type || 'default')
    setTimeout(() => { setHideAlert(true) }, time || 3000)
  }

  const registerSubmit = (e) => {
    e.preventDefault()

    if (!user.name || user.name === "") {
      showAlert({
        type: 'danger',
        message: 'campo nombre sin rellenar'
      })

      return
    }

    if (!user.email || user.email === "") {

      showAlert({
        type: 'danger',
        message: 'campo correo sin rellenar'
      })

      return
    }

    if (!user.password || user.password === "") {

      showAlert({
        type: 'danger',
        message: 'campo contraseña sin rellenar'
      })

      return
    }

    if (!isEmail(user.email)) {

      showAlert({
        type: 'danger',
        message: 'invalid email'
      })

      return
    }

    RegisterService.register(user).then(result => {
      console.log(result)

      if (result.error) {
        showAlert({
          type: 'danger',
          message: 'Registro fallido!'
        })

        return
      }

      showAlert({
        type: 'success',
        message: 'Registro exitoso'
      })

      setTimeout(async () => {
        await doLogin({
          email: user.email,
          password: user.password
        })
          .then(result => {
            console.log("login", result)


            window.localStorage.setItem(
              'loggedTCC', JSON.stringify(result.body)
            )

            setSession(result.body)
            setIsLogin(true)

            navigate("/Teacher")


          })
          .catch((e) => {
            if (e.code == "ERR_BAD_RESPONSE") {
              showAlert({ type: ErrorType.DANGER, message: `Error ${e.response.data.status}, ${e.response.data.body.message}` })
            }

            if (e.code == "ERR_NETWORK") {
              showAlert({ type: ErrorType.DANGER, message: `Error` })
            }

            return
          })
      }, 3000)


    }).catch((err) => {

      if (err.code === "ERR_BAD_RESPONSE") {

        showAlert({
          type: 'danger',
          message: err.response.data.body
        })

        setTimeout(() => { setHideAlert(true) }, 5000)
      }

    })

  }

  return (
    <>

      <div className='grid grid-cols-[32rem_auto] max-lg:grid-cols-[1fr] w-[94%] max-md:w-[85%] max-lg:w-[55%] m-auto justify-center items-center gap-6 h-screen'>

        <div>
          <Alert type={alertType} message={alertMessage} hide={hideAlert} />
          <form action="/register-success" method='POST' onSubmit={(e) => registerSubmit(e)}>
            <div className='flex flex-col gap-6 p-6 bg-slate-800 border-slate-700 border rounded-xl shadow-black/45 shadow-xl hover:shadow-none transition-all duration-300'>

              <h1 className='text-center text-2xl font-semibold'>
                Crea tu cuenta como un
                <span className='font-semibold text-violet-400 flex gap-2 items-center justify-center'>Teacher <AcademicCapIcon className='w-6' title='Teacher' /> </span>
              </h1>

              <Input type="text" label="Nombre" handle={nameHandle} />
              <Input type="text" label="Apellido" handle={lastNameHandle} />
              <Input type="text" label="Correo electrónico" handle={emailHandle} />
              <Input type="password" label="Contraseña" handle={passwordHandle} />

              <div className='flex'>
                <div className='flex-1'>
                  <input type="checkbox" /> Acepto <Link className='text-sky-600'>Términos y condiciones.</Link>
                </div>

              </div>

              <button className='bg-sky-600 inline-block py-2 rounded font-semibold' >Crear Cuenta</button>
              <p>Ya tienes una cuenta? <Link to={"/Login"} className='text-sky-600 ml-2'>Iniciar Sesión</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default RegisterTeacher