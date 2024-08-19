import { useState } from 'react'
import Header from '../../components/Header'
import isEmail from 'validator/lib/isEmail'
import { doLogin } from '../../services/auth'
import Alert from '../../components/Alerts'
import { Link, Navigate, redirect } from 'react-router-dom'
import Title from '../../components/Title'
import { useAuthStore } from '../../store/authStore'
import { ErrorType } from '../../services/helpers'

const Input = (props) => {
    const { label, type, handle } = props
    return (
        <div className='my-6'>
            <label htmlFor="email" className="block font-medium leading-6 text-white-900">
                {label}
            </label>
            <input type={type} className='p-2 mt-2 bg-slate-700 rounded border-none w-full' onChange={(e) => handle(e.target.value)} />
        </div>
    )
}
const Login = () => {

    const [hideAlert, setHideAlert] = useState(true)
    const [alert, setAlert] = useState([])

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const { session, isLogin, setSession, setIsLogin } = useAuthStore()

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
            showAlert({ type: ErrorType.DANGER, message: 'is loggin!' })
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
<<<<<<< HEAD
=======

    /*
<<<<<<< HEAD
>>>>>>> 874a7b7 (cambioo diseño login.)
    return (
        <>
            {isLogin && session.type === 1 && <Navigate to={"/Dashboard"} replace={true} />}
            {isLogin && session.type === 2 && <Navigate to={"/Teacher/Home"} replace={true} />}
            {isLogin && session.type === 3 && <Navigate to={"/Admin"} replace={true} />}

            <div className='h-lvh flex flex-col'>

                <Header />

                <div className='h-full flex items-center justify-center '>
                    <div className=' p-2 rounded w-96 flex flex-col gap-3' >

                        <img src="images/logo.png" alt="" />

                        <h2 className='text-center text-2xl font-bold uppercase'>Iniciar Sesión</h2>

                        <Alert type={alert.type} message={alert.message} hide={hideAlert} />

                        <form action="/Dashboard" method='POST' onSubmit={(e) => LoginHandle(e)} >
                            <Input type='text' label='Correo electrónico' handle={emailHandle} />
                            <Input type='password' label='Contraseña' handle={passwordHandle} />
                            <div className='flex  flex-col gap-3 items-center'>
                                <button className='bg-sky-600 p-2 w-full'>Login</button>
                                <Link to={'/'}>Olvidaste tu contraseña?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )^*/
=======
>>>>>>> 874a7b7 (cambioo diseño login.)
    return (
        <>
            {
                user !== null
                    ? user.type === 1
                        ? <Navigate to={"/Dashboard"} replace={true} />
                        : user.type === 2
                            ? <Navigate to={"/Teacher/Home"} replace={true} />
                            : user.type === 3
                                ? <Navigate to={"/Admin"} replace={true} />
                                : ''
                    : ''
            }


            <Header />
            <Content>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm"> 
    <img alt="Your Company"
    src="/imagenes/logo.png" // Path from the public directory
    className="mx-auto h-26 w-auto" // Adjust height and keep width auto
        />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
        Iniciar Sesión
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Alert type={alert.type} message={alert.message} hide={hideAlert} />

      <form action="/Dashboard" method="POST" className="space-y-6" onSubmit={(e) => submitHandle(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
            Correo electrónico
          </label>
          <div className="mt-2">
            <Input
              id="email"
              name="email"
              type="text"
              required
              autoComplete="email"
              handle={emailHandle}
              className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
              Contraseña
            </label>
          
          </div>
          <div className="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              handle={passwordHandle}
              className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

<<<<<<< HEAD
=======
                        </form>
                    </div>
                </div>
            </Content>
        </>
    )^*/
    return (
        <>
            {
                user !== null
                    ? user.type === 1
                        ? <Navigate to={"/Dashboard"} replace={true} />
                        : user.type === 2
                            ? <Navigate to={"/Teacher/Home"} replace={true} />
                            : user.type === 3
                                ? <Navigate to={"/Admin"} replace={true} />
                                : ''
                    : ''
            }


            <Header />
            <Content>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm"> 
    <img alt="Your Company"
    src="/imagenes/logo.png" // Path from the public directory
    className="mx-auto h-26 w-auto" // Adjust height and keep width auto
        />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
        Iniciar Sesión
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Alert type={alert.type} message={alert.message} hide={hideAlert} />

      <form action="/Dashboard" method="POST" className="space-y-6" onSubmit={(e) => submitHandle(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
            Correo electrónico
          </label>
          <div className="mt-2">
            <Input
              id="email"
              name="email"
              type="text"
              required
              autoComplete="email"
              handle={emailHandle}
              className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
              Contraseña
            </label>
          
          </div>
          <div className="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              handle={passwordHandle}
              className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

>>>>>>> 874a7b7 (cambioo diseño login.)
        <div>
          <Button
            text='Login'
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
        </div>
        <div className="flex justify-center text-sm">
              <a href="" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Olvidaste tu contraseña?
              </a>
            </div>
      </form>

      
    </div>
  </div>
</Content>
</>
    )






}

export default Login