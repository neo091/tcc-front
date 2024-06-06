import Enlace from "../../components/Enlace";
import Title from "../../components/Title";

const Home = () => {
    return (
        <>
            <Title>Dashboard</Title>

            <div className=" text-center">

                <p className=" lg:w-1/2 mx-auto bg-slate-800 p-2 rounded font-medium text-xl my-4">
                    Aún no haz realizado ninguna prueba, haz una prueba para determinar tu nivel de Inglés.

                    <br />

                    <Enlace to={"/Dashboard/Test"}>
                        Iniciar Prueba
                    </Enlace>


                </p>

            </div>

        </>
    );
}

export default Home;