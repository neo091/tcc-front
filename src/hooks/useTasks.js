import { useCallback, useEffect, useState } from "react"
import { addTask } from "../services/teacher"


export function useTasks({ id }) {
    const [insertIdState, setInserId] = useState(null)

    const addNewTask = async () => {
        const response = await addTask({ id })
        const { insertId } = response.body
        setInserId(insertId)
    }

    useEffect(() => {
        addNewTask()
    }, [])

    return { insertId: insertIdState }
}