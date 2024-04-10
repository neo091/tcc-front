import tcclogo from '../assets/logo.jpg'
import Banner from '../components/Banner'
import Button from '../components/Button'
import Content from '../components/Content'


const Register = () => {

    return (
        <>
            <Banner text='Registro de Usuarios' />

            <Content>
                <div className='bg-gray-50 bg-opacity-50 border border-gray p-6'>

                    <div className='w-2/3 mx-auto '>

                        <div >
                            <form action="" className=''>
                                <div>
                                    <p>Nombre</p>
                                    <input type="text" className='p-2 rounded-xl border w-full' />
                                </div>

                                <div className='mt-2'>
                                    <p>Correo electrónico</p>
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
                                    <Button text='Register' />
                                </div>

                                <a href="/login" className=' text-blue-600'>Login</a>
                            </form>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )

}

export default Register