import Content from "../components/Content"
import EnlaceDefault from "../components/EnlaceDefault"
import Header from "../components/Header"

const Home = () => {

    return (
        <>
            <Header />
            <div className="w-2/3 flex items-center mx-auto my-14">

                <div className="w-2/3">
                    <h2 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-4xl tracking-tight text-center ">APRENDE INGLÉS DE MANERA FÁCIL Y EFICIENTE</h2>

                    <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto ">Aquí encontrarás una variedad de recursos, consejos y estrategias diseñadas para ayudarte a dominar este idioma de manera efectiva y sin complicaciones.</p>
                </div>


                <img src="images/learning.png" width="400px" height="500px" alt="" />



            </div>

            <div className=" w-2/5 mx-auto">

                <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">

                    <EnlaceDefault text='Comenzar' href='./register' />

                </div>

            </div>
            <Content>


            </Content>
        </>
    )

}

export default Home