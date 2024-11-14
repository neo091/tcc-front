import { sendMessageService } from "@services/gptService"
import { useEffect, useState } from "react"

const MESSAGES = [
    {
        id: 1,
        from: "Charlie",
        message: "Hola, ¿cómo puedo ayudarte con tu aprendizaje del inglés hoy?"
    }
]

export function useChatBot() {

    const [message, setMessage] = useState("")
    const [chatbotMessages, setChatBotMessages] = useState([])
    const [showTipping, setShowTipping] = useState(false)

    const onEnterMessage = (e) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    const updateMessageHandle = () => {
        const input = document.querySelector("input")
        setMessage(input.value)
    }

    const sendMessage = async () => {
        setShowTipping(true)
        const input = document.querySelector("input")
        const newMessage = [...chatbotMessages].concat({
            id: chatbotMessages.length + 1,
            from: "Me",
            message: message
        })
        setChatBotMessages(newMessage)
        input.value = ""
        input.focus()

        await sendMessageService(message).then(result => {

            setChatBotMessages(newMessage.concat({
                id: chatbotMessages.length + 1,
                from: "Charlie",
                message: result.body.result_message
            }))

            setShowTipping(false)

        }).catch((e) => console.log(e))




    }

    const scrollControl = () => {
        const messageBox = document.querySelector("#messagesBox")

        messageBox.scrollTo(0, messageBox.scrollHeight)

        // console.log(messageBox)
    }

    useEffect(() => {
        setChatBotMessages(MESSAGES)
    }, [])

    useEffect(() => {
        scrollControl()
    }, [chatbotMessages])

    return { chatbotMessages, message, onEnterMessage, sendMessage, setMessage, updateMessageHandle, showTipping }
}