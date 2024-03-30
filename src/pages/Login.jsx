import tcclogo from '../assets/logo.jpg'
import Banner from '../components/Banner'
import Button from '../components/Button'
import Content from '../components/Content'



const Login = () => {

    return (
        <>
            <Banner text='Inicia sesión' />
            <Content>
                <div className='bg-gray-50 bg-opacity-50 border border-gray p-6'>
                    <div className='w-2/3 mx-auto '>

                        <form action="" className=''>
                            <div>
                                <p>Nombre de usuario o correo electrónico</p>
                                <input type="text" className='p-2 rounded-xl border w-full' />
                            </div>

                            <div className='mt-2'>
                                <p>Contraseña</p>
                                <input type="password" className='p-2 rounded-xl border w-full' />
                            </div>

                            <div className='mt-2'>
                                <input type="checkbox" className=' mr-3' />
                                <label htmlFor="">Recuerdame</label>
                            </div>

                            <div className='mt-2'>
                                <Button text='Login' />
                            </div>

                            <a href="/register" className=' text-blue-600'>Register</a>
                        </form>
                    </div>
                </div>
            </Content>
        </>
    )

}

export default Login