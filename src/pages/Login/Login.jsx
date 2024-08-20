import { useState } from 'react'
import Button from '../../components/Button'
import Content from '../../components/Content'
import Header from '../../components/Header'
import isEmail from 'validator/lib/isEmail'
import { doLogin } from '../../services/auth'
import Alert from '../../components/Alerts'
import { Link, Navigate, redirect } from 'react-router-dom'
import Title from '../../components/Title'
import { useAuthStore } from '../../store/authStore'

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

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const { session, isLoggin, setSession, setIsLoggin, resetSession } = useAuthStore()

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

            console.log(user)


            // window.localStorage.setItem(
            //     'loggedTCC', JSON.stringify(user)
            // )


            // setUser(result.body)

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

        if (isLoggin) {
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
        setIsLoggin(true)

        window.localStorage.setItem(
            'loggedTCC', JSON.stringify(result.body)
        )

    }
    return (
        <>
            {isLoggin && session.type === 1 && <Navigate to={"/Dashboard"} replace={true} />}
            {isLoggin && session.type === 2 && <Navigate to={"/Teacher/Home"} replace={true} />}
            {isLoggin && session.type === 3 && <Navigate to={"/Admin"} replace={true} />}

            <Header />
            <Content>
                <div className=' my-16 flex justify-center'>
                    <div className='bg-slate-800 p-2 rounded' >

                        <Title>Iniciar Sessión</Title>

                        <Alert type={alert.type} message={alert.message} hide={hideAlert} />

                        <form action="/Dashboard" method='POST' onSubmit={(e) => LoginHandle(e)} >
                            <Input type='text' label='Correo electrónico' handle={emailHandle} />
                            <Input type='password' label='Contraseña' handle={passwordHandle} />
                            <div className='flex gap-3 items-center justify-center'>
                                <Button text='Login' /> <Link to={`${window.origin}/Register`} className=' text-center text-violet-500 underline decoration-violet-900 hover:text-violet-300 hover:decoration-violet-500 '>Register</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </Content>
        </>
    )

}

export default Login