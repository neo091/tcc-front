import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { useTestStore } from "../../store/testStore";
import { AgCharts } from "ag-charts-react";
import { useState } from "react";

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
                className=" bg-violet-600 hover:bg-violet-700 rounded block w-full text-center my-2 font-semibold text-white p-4 transition-all duration-500">
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

    const loadQuestionsHandle = () => {
        fetchQuestions(10).then(() => navigate('/Dashboard/test'))
    }

    const continueHandle = () => {
        navigate('/Dashboard/test')
    }

    const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: [
            { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
            { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
            { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
        ],
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
    });



    return (
        <>
            <Title>Dashboard</Title>

            {
                questions.length > 0 && <PendingTest handle={continueHandle} />
            }

            {
                questions.length <= 0 && <NewTest handle={loadQuestionsHandle} />
            }

            <div>

                <AgCharts options={chartOptions} />

            </div>

        </>
    );
}

export default Home;