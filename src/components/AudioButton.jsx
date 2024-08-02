import { useState } from "react"

const AudioButton = (props) => {

    const [isPlay, setIsPlay] = useState(false)
    const [audioTimer, setAudiTimer] = useState(0)

    const { url } = props
    const [audio, setAudio] = useState(new Audio(url))


    const playHandle = () => {


        if (!audio.isPlay && !isPlay) {
            audio.play()
            setIsPlay(!isPlay)
            return;
        }

        audio.pause()
        setIsPlay(!isPlay)
    }

    const stopAudio = () => {
        if (isPlay) {
            audio.pause();         // Vuelve a pausar
            audio.currentTime = 0;
            setIsPlay(!isPlay)
        }
    }




    return (

        <div className="flex">
            <button
                className="shadow-[inset_0px_-6px_0px_0px_#00000050] inline my-2 text-white py-2 px-5 w-full transition-all duration-500 bg-violet-600 hover:bg-violet-500"
                onClick={() => playHandle()}>
                {isPlay ? 'Pause' : 'Play'}
            </button>

            {isPlay && <button className="shadow-[inset_0px_-6px_0px_0px_#00000050] inline my-2 text-white py-2 px-5 transition-all duration-500 bg-red-600 hover:bg-red-500" onClick={() => stopAudio()}>Stop</button>}
            {isPlay && <div className="shadow-[inset_0px_-6px_0px_0px_#00000050] inline my-2 text-white py-2 px-5 transition-all duration-500 bg-red-600 hover:bg-red-500" onClick={() => stopAudio()}>{audioTimer}</div>}

        </div>
    )
}

export default AudioButton