import Banner from "../components/Banner"
import Content from "../components/Content"
import logo from '../assets/logo.jpg'
import ButtonSky from "../components/ButtonSky"

const Home = () => {

    return (
        <>
            <Banner>
                <div className="w-2/3 mx-auto">
                    <h2 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">APRENDE INGLÉS DE MANERA FÁCIL Y EFICIENTE</h2>

                    <p class="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">Aquí encontrarás una variedad de recursos, consejos y estrategias diseñadas para ayudarte a dominar este idioma de manera efectiva y sin complicaciones. <br />Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades existentes, ¡estamos aquí para guiarte en cada paso del camino hacia la fluidez en <span className=" text-sky-500">inglés</span>!</p>


                    <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">

                        <ButtonSky text='Comenzar' url='./register' />

                    </div>
                </div>
            </Banner>
            <Content>

                Aquí va todo el contenido de la home
            </Content>
        </>
    )

}

export default Home