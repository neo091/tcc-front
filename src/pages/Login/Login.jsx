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
    )

}

export default Login