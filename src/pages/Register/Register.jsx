import { useState } from 'react'
import Banner from '../../components/Banner'
import Button from '../../components/Button'
import Content from '../../components/Content'
import EnlaceDefaultNoBg from '../../components/EnlaceDefaultNoBg'
import Header from '../../components/Header'
import Alert from '../../components/Alerts'
import RegisterService from '../../services/auth'
import isEmail from 'validator/lib/isEmail'

import { Link } from 'react-router-dom'

const Input = ({ type, label, handle }) => {
    return (
        <input type={type} placeholder={label} className='p-2 bg-slate-700 rounded w-full' onChange={(e) => handle(e.target.value)} />
    )
}

const Register = () => {

    const [user, setUser] = useState([])
    const [hideAlert, setHideAlert] = useState(true)
    const [alertMessage, setAlertMessage] = useState('default')
    const [alertType, setAlertType] = useState('default')


    const nameHandle = (text) => {
        setUser({ ...user, name: text })
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

            showAlert({
                type: 'success',
                message: 'Registro exitoso'
            })


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
    /*
    return (
        <>

            <div className='h-lvh flex flex-col'>
                <Header />
                <Alert type={alertType} message={alertMessage} hide={hideAlert} />

                <div className='h-full flex items-center justify-center'>
                    <div className=' bg-slate-800 p-2 w-96 '>

                        <Title>Crear cuenta</Title>

                        <form action="/register-success" method='POST' onSubmit={(e) => registerSubmit(e)}>
                            <Input type="text" label="Nombre" handle={nameHandle} />
                            <Input type="text" label="Correo electrónico" handle={emailHandle} />
                            <Input type="password" label="Contraseña" handle={passwordHandle} />

                            <div className='flex justify-center items-center gap-3'>

                                <button className='bg-sky-600 p-2 flex-1'>Regsiter</button>
                                <Link to={`${window.origin}/Login`} className='flex-1 text-center border-sky-600 border p-2 rounded'>Login</Link>

                            </div>

                        </form>
                    </div>

                </div>
            </div>


        </>
    )*/
    return (
        <>
            <Header />
            <div className='flex items-center justify-center'>

                <div className=' py-6'>
                    <img src="/images/logo.png" alt="" />
                    <Alert type={alertType} message={alertMessage} hide={hideAlert} />
                    <form action="/register-success" method='POST' onSubmit={(e) => registerSubmit(e)}>
                        <div className='flex flex-col gap-6 p-6 bg-slate-800 border-slate-700 border'>
                            <h1 className='text-center text-2xl font-semibold'>Registro</h1>
                            <Input type="text" label="Nombre" handle={nameHandle} />
                            <Input type="text" label="Correo electrónico" handle={emailHandle} />
                            <Input type="password" label="Contraseña" handle={passwordHandle} />

                            <div className='flex'>
                                <div className='flex-1'>
                                    <input type="checkbox" /> Acepto <Link className='text-sky-600'>Términos y condiciones.</Link>
                                </div>

                            </div>

                            <button className='bg-sky-600 inline-block p-2' >Register</button>
                            <p>Ya tienes una cuneta? <Link to={"/Login"} className='text-sky-600 ml-2'>Iniciar Sesión</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Register