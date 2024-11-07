import axios from 'axios'

const base_url = "http://localhost:4000/api/gpt"

export const getResume = async (resume_object) => {
    const data = JSON.parse(resume_object)

    const response = axios
        .post(`${base_url}/resume`, data)

    return response
}


export const getRecommendations = async (resume_object) => {
    const data = JSON.parse(resume_object)


    const response = await axios
        .post(`${base_url}/recomendations`, data)

    return response.data
}

export const getQuestions = async () => {

    const response = await axios
        .get(`${base_url}/test-connect`, {})

    return response.data
}

export const generateExam = async (data) => {
    const response = await axios
        .post(`${base_url}/generate/exam`, data)

    return response.data

}

export async function getAnalice(data) {
    const response = await axios
        .post(`${base_url}/exam/analice`, data)
    return response.data
}