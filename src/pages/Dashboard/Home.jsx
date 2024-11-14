import { useNavigate } from "react-router-dom";
import { useTestStore } from "@store/testStore";
import { GridContent } from "@components/GridContent";
import { NewTest } from "@components/NewTest";
import { PendingTest } from "@components/PendingTest";

const Home = () => {
    const navigate = useNavigate()
    const fetchQuestions = useTestStore(state => state.fetchQuestions)
    const questions = useTestStore(state => state.questions)
    const historial = useTestStore(state => state.historial)

    const loadQuestionsHandle = () => fetchQuestions(10).then(() => navigate('/Dashboard/test'))

    const continueHandle = () => navigate('/Dashboard/test')

    return (
        <>
            <h1 className=" font-semibold text-3xl mt-4">Dashboard</h1>

            <GridContent>

                {
                    questions.length > 0 ? <PendingTest handle={continueHandle} /> : <NewTest handle={loadQuestionsHandle} />
                }

            </GridContent>
        </>
    );
}

export default Home;