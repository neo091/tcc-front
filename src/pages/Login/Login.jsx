import { useState } from 'react'
import Header from '../../components/Header'
import isEmail from 'validator/lib/isEmail'
import { doLogin } from '../../services/auth'
import Alert from '../../components/Alerts'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { ErrorType } from '../../services/helpers'

const Input = ({ type, label, handle }) => {
  return (
    <input
      type={type}
      placeholder={label}
      className='p-2 bg-slate-700 border-none w-full'
      onChange={(e) => handle(e.target.value)}
    />
  )
}

const Login = () => {

  const [hideAlert, setHideAlert] = useState(true)
  const [alert, setAlert] = useState([])
  const [userLogin, setUserLogin] = useState(null)
  const [user, setUser] = useState(null)

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const { session, isLogin, setSession, setIsLogin, resetSession } = useAuthStore()

  const emailHandle = (text) => setEmail(text)
  const passwordHandle = (text) => setPassword(text)

  const showAlert = ({ type, message, duration }) => {

    setHideAlert(false)
    setAlert({
      type: type,
      message: message
    })

    setTimeout(() => { setHideAlert(true) }, duration || 5000)
  }


  const LoginHandle = async (event) => {
    event.preventDefault()

    if (email) {
      if (!isEmail(email)) {
        showAlert({ type: ErrorType.DANGER, message: 'need a valid email please!' })
        return
      }
    } else {
      showAlert({ type: ErrorType.DANGER, message: 'need a email please!' })
      return
    }

    if (!password) {
      showAlert({ type: ErrorType.DANGER, message: 'need a password please!' })
      return
    }

    if (isLogin) {
      showAlert({ type: ErrorType.DANGER, message: 'is login!' })
      return
    }

    const result = await doLogin({
      email,
      password
    }).catch((e) => {
      if (e.code == "ERR_BAD_RESPONSE") {
        showAlert({ type: ErrorType.DANGER, message: `Error ${e.response.data.status}, ${e.response.data.body.message}` })
      }

      if (e.code == "ERR_NETWORK") {
        showAlert({ type: ErrorType.DANGER, message: `Error` })
      }

      return
    })

    setSession(result.body)
    setIsLogin(true)

    window.localStorage.setItem(
      'loggedTCC', JSON.stringify(result.body)
    )

  }
  return (
    <>
      {isLogin && session.type === 1 && <Navigate to={"/Dashboard"} replace={true} />}
      {isLogin && session.type === 2 && <Navigate to={"/Teacher/Home"} replace={true} />}
      {isLogin && session.type === 3 && <Navigate to={"/Admin"} replace={true} />}

      <Header />
      <div className='flex justify-center'>
        <div className='my-6'>
          <img src="/images/logo.png" alt="" />

          <Alert type={alert.type} message={alert.message} hide={hideAlert} />

          <form action="/Dashboard" method='POST' onSubmit={(e) => LoginHandle(e)} >

            <div className='flex flex-col gap-6 p-6 bg-slate-800 border-slate-700 border'>

              <h1 className='text-center text-2xl font-semibold'>Iniciar Sesión</h1>
              <Input type='text' label='Correo electrónico' handle={emailHandle} />
              <Input type='password' label='Contraseña' handle={passwordHandle} />
              <div className='flex'>
                <div className='flex-1'>
                  <input type="checkbox" /> Recordarme
                </div>
                <Link className='text-sky-600'>¿Olvidaste tu Contraseña?</Link>
              </div>
              <button className='bg-sky-600 inline-block p-2' >Login</button>

              <p>¿Aun no tienes una cuenta? <Link to={"/Register"} className='text-sky-600 ml-2'>Registrar</Link></p>

            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default Login