import { useState } from 'react'
import Button from '../../components/Button'
import Content from '../../components/Content'
import Header from '../../components/Header'
import isEmail from 'validator/lib/isEmail'
import loginService from '../../services/auth'
import Alert from '../../components/Alerts'
import { Link, Navigate, redirect } from 'react-router-dom'
import Title from '../../components/Title'

const Input = ({ type, label, handle }) => {
    return (
        <div className='my-4'>
            <label>{label}</label>
            <input type={type} className='p-2 bg-slate-700 rounded border-none w-full' onChange={(e) => handle(e.target.value)} />
        </div>
    )
}

const ErrorType = {
    DANGER: "danger",
    SUCCESS: "success"
}

const Login = () => {

    const [hideAlert, setHideAlert] = useState(true)
    const [alert, setAlert] = useState([])
    const [userLogin, setUserLogin] = useState(null)
    const [user, setUser] = useState(null)


    const emailHandle = (text) => {
        setUserLogin({ ...userLogin, email: text })
    }

    const passwordHandle = (text) => {
        setUserLogin({ ...userLogin, password: text })
    }

    const showAlert = ({ type, message, duration }) => {

        setHideAlert(false)
        setAlert({
            type: type,
            message: message
        })

        setTimeout(() => { setHideAlert(true) }, duration || 5000)
    }

    const submitHandle = (e) => {
        e.preventDefault()

        if (!userLogin) {
            showAlert({
                type: ErrorType.DANGER, message: 'need email'
            })

            return
        }


        if (!userLogin.email || userLogin.email === "") {
            showAlert({
                type: ErrorType.DANGER, message: 'need email'
            })

            return
        }

        if (!userLogin.password || userLogin.password === "") {
            showAlert({
                type: ErrorType.DANGER, message: 'need password'
            })

            return
        }

        if (!isEmail(userLogin.email)) {

            showAlert({
                type: ErrorType.DANGER, message: 'invalid email'
            })

            return
        }

        loginService.login(userLogin).then(result => {

            showAlert({
                type: ErrorType.SUCCESS, message: 'login correcto, redirigiendo...'
            })

            const user = result.body
            window.localStorage.setItem(
                'loggedTCC', JSON.stringify(user)
            )


            setUser(result.body)

        }).catch((e) => {

            if (e.code === "ERR_BAD_RESPONSE") {
                showAlert({
                    type: ErrorType.DANGER, message: e.response.data.body.message
                })
            }

            if (e.code === "ERR_NETWORK") {
                showAlert({
                    type: ErrorType.DANGER, message: "Error de Servidor"
                })
            }
        })

    }

    /*
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
                <div className=' my-16 flex justify-center items-center self-center'>
                    <div className='bg-slate-800 p-2 rounded' >

                        <Title>Iniciar Sessión</Title>

                        <Alert type={alert.type} message={alert.message} hide={hideAlert} />

                        <form action="/Dashboard" method='POST' onSubmit={(e) => submitHandle(e)} >
                            <Input type='text' label='Correo electrónico' handle={emailHandle} />
                            <Input type='password' label='Contraseña' handle={passwordHandle} />
                            <div className='flex gap-3 items-center justify-center'>
                                <Button text='Login' /> | <Link to={`${window.origin}/Register`} className=' text-center text-violet-500 underline decoration-violet-900 hover:text-violet-300 hover:decoration-violet-500 '>Register</Link>
                            </div>

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