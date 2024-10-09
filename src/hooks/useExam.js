import { useEffect, useState } from "react";
import { deleteExam, getExams } from "../services/teacher";

export function useExam({ id }) {

    const [exams, setExams] = useState([])

    const getExamsList = async () => {
        const exams = await getExams(id)
        const { body } = exams.data
        setExams(body.exams)
    }

    const examDelete = async ({ examID }) => {
        const result = await deleteExam({ examID });
        const newExamList = exams.filter(exam => exam.id !== examID)
        setExams(newExamList);
    };



    useEffect(() => {
        getExamsList()
    }, [])


    return { exams, examDelete };
}