import axios from 'axios'

const base_url = "http://localhost:4000/api/gpt"

export const getResume = async (resume_object) => {
    const data = JSON.parse(resume_object)

    const response = axios
        .post(`${base_url}/resume`, data)

    return response
}


export const getRecomendations = async (resume_object) => {
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
