import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { useTestStore } from "../../store/testStore";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "../../components/Card";

const PendingTest = ({ handle }) => {
    return (
        <section className="lg:w-1/2 mx-auto bg-slate-800 p-2 rounded">
            <p className=" text-center  font-medium text-xl my-4">Prueba Pendiente.</p>
            <button onClick={handle}
                className=" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                Continuar Prueba
            </button>

        </section>
    )
}

const NewTest = ({ handle }) => {
    return (
        <section className="lg:w-1/2 mx-auto bg-slate-800 p-2 rounded">
            <p className=" text-center font-medium text-xl my-4">Aún no haz realizado ninguna prueba, haz una prueba para determinar tu nivel de Inglés.</p>

            <button onClick={handle}
                className=" bg-sky-600 hover:bg-sky-700 block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500">
                Comenzar Prueba
            </button>

        </section>
    )
}

const Home = () => {
    const navigate = useNavigate()
    const fetchQuestions = useTestStore(state => state.fetchQuestions)
    const questions = useTestStore(state => state.questions)
    const historial = useTestStore(state => state.historial)

    const loadQuestionsHandle = () => fetchQuestions(10).then(() => navigate('/Dashboard/test'))

    const continueHandle = () => navigate('/Dashboard/test')

    return (
        <>
            <Title>Dashboard</Title>

            {
                questions.length > 0 && <PendingTest handle={continueHandle} />
            }



            <div className="grid grid-cols-12 gap-4 my-4">

                <div className="col-span-7">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Pruebas
                            </CardTitle>
                        </CardHeader>

                        <div>
                            {
                                questions.length <= 0 && <NewTest handle={loadQuestionsHandle} />
                            }
                        </div>
                    </Card>
                </div>

            </div>
        </>
    );
}

export default Home;