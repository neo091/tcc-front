import { useState } from 'react'
import Banner from '../../components/Banner'
import Button from '../../components/Button'
import Content from '../../components/Content'
import EnlaceDefaultNoBg from '../../components/EnlaceDefaultNoBg'
import Header from '../../components/Header'
import Separador from '../../components/Separador'
import isEmail from 'validator/lib/isEmail'
import loginService from '../../services/auth'
import Alert from '../../components/Alerts'

const Input = ({ type, label, handle }) => {
    return (
        <div className='my-4'>
            <label>{label}</label>
            <input type={type} className='p-2 rounded-xl border w-full' onChange={(e) => handle(e.target.value)} />
        </div>
    )
}

const Login = () => {


    const [hideAlert, setHideAlert] = useState(true)
    const [alert, setAlert] = useState([])
    const [userLogin, setUserLogin] = useState([])


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

        if (!userLogin.email || userLogin.email === "") {
            showAlert({
                type: 'danger', message: 'need email'
            })

            return
        }

        if (!userLogin.password || userLogin.password === "") {
            showAlert({
                type: 'danger', message: 'need password'
            })

            return
        }

        if (!isEmail(userLogin.email)) {

            showAlert({
                type: 'danger', message: 'invalid email'
            })

            return
        }

        loginService.login(userLogin).then(result => {

            showAlert({
                type: 'success', message: 'login ok'
            })

            const user = result.body
            window.localStorage.setItem(
                'loggedTCC', JSON.stringify(user)
            )

            setTimeout(() => {
                location.href = '/Dashboard'
            }, 3000)


        }).catch((e) => {

            if (e.code === "ERR_BAD_RESPONSE") {
                showAlert({
                    type: 'danger', message: e.response.data.body.message
                })
            }
            console.log(e)
        })

    }


    return (
        <>
            <Header />
            <Banner text='Inicia sesión' />
            <Content>
                <div className='bg-gray-50 bg-opacity-50 border border-gray p-6'>
                    <div className='w-2/3 mx-auto '>

                        <Alert type={alert.type} message={alert.message} hide={hideAlert} />

                        <form action="/Dashboard" method='POST' onSubmit={(e) => submitHandle(e)} >
                            <Input type='text' label='Correo electrónico' handle={emailHandle} />
                            <Input type='password' label='Contraseña' handle={passwordHandle} />
                            <Separador />
                            <Button text='Login' /> | <EnlaceDefaultNoBg text='Register' href='./register' />
                        </form>
                    </div>
                </div>
            </Content>
        </>
    )

}

export default Login