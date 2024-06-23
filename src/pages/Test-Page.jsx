import { useTestStore } from "../store/testStore"

const TestPage = () => {

    const historial = useTestStore(state => state.historial)
    const addToHistory = useTestStore(state => state.addToHistory)
    const resetHistory = useTestStore(state => state.resetHistory)


    const addToHistoryHandle = () => {
        addToHistory({
            name: 'marcos'
        })
    }


    return (
        <>

            <button onClick={addToHistoryHandle}>Add</button>
            <button onClick={resetHistory}>Reset</button>
        </>
    )
}

export default TestPage