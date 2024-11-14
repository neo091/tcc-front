import { GridContent } from "@components/GridContent"
import Title from "@components/Title";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useChatBot } from "@hooks/useChatBot";
import Markdown from "markdown-to-jsx";

const Chatbot = () => {

    const { chatbotMessages, onEnterMessage, sendMessage, updateMessageHandle, showTipping } = useChatBot()

    return (

        <>
            <Title>ChatBot</Title>
            <GridContent>
                <div className="bg-slate-800 rounded-md shadow-md shadow-slate-800 hover:shadow-none transition-all ease-in-out duration-300">

                    <div className="min-h-[60vh] max-h-[80vh] overflow-y-auto p-2 flex flex-col gap-2" id="messagesBox">

                        {
                            chatbotMessages.map((item) => item.from === "Me"
                                ? <div className="flex justify-end items-center gap-2">
                                    <span>{item.from}:</span>
                                    <div className="bg-slate-700 p-3 rounded-md">
                                        {item.message}
                                    </div>
                                </div>
                                : <div className="flex justify-start items-center gap-2">
                                    <span>{item.from}:</span>
                                    <div className="bg-slate-900 p-3 rounded-md">
                                        <Markdown>{item.message}</Markdown>
                                    </div>
                                </div>
                            )
                        }

                        {showTipping && <div className="p-2 bg-slate-500 w-32 rounded">escribiendo...</div>}
                    </div>
                    <div className="relative overflow-hidden">
                        <input onKeyDown={onEnterMessage} type="text" className="h-12 w-full p-2 rounded-b-md text-black" placeholder="type here..." onKeyUp={updateMessageHandle} />
                        <button onClick={sendMessage} className="absolute right-0 bg-violet-800 h-full w-16 shadow-lg shadow-black" >
                            <div className="flex items-center justify-center">
                                <PaperAirplaneIcon className="w-8 h-8" />
                            </div>
                        </button>
                    </div>
                </div>
            </GridContent>

        </>
    );
}

export default Chatbot;
