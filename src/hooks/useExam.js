import { useEffect, useState } from "react";
import { deleteExam, getExams } from "../services/teacher";

export function useExam({ id, examID }) {

    const [exams, setExams] = useState([])
    const [exam, setExam] = useState([])
    const [examConfig, setExamConfig] = useState([])

    const getExamsList = async () => {
        const exams = await getExams(id)
        const { body } = exams.data
        setExams(body.exams)

    }

    const getExam = () => {

        if (!examID) return;
        const newExam = exams.filter(exam => exam.id === Number(examID))


        if (newExam[0]) {
            setExam(JSON.parse(newExam[0].exam))
            setExamConfig(JSON.parse(newExam[0].config))
            console.log(JSON.parse(newExam[0].config))
        }

    }

    const examDelete = async ({ examID }) => {
        const result = await deleteExam({ examID });
        const newExamList = exams.filter(exam => exam.id !== examID)
        setExams(newExamList);


    };

    useEffect(() => {
        getExamsList()
    }, [])

    useEffect(() => {
        getExam()
    }, [exams])


    return { exams, examDelete, exam, setExam, examConfig };
}