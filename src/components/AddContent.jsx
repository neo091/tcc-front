import Swal from "sweetalert2";
import { CONTENT_TYPE } from "../utils/contentType";


export const AddContent = ({ contentType, children, addContent }) => {

    const addHandle = async () => {

        if (contentType === CONTENT_TYPE.text) {
            const { value: text } = await Swal.fire({
                title: "Agregar texto",
                input: "textarea",
                inputPlaceholder: "Texto aquí"
            });

            if (text) addContent({ type: 1, value: text })
        }

        if (contentType === CONTENT_TYPE.title) {
            const { value: title } = await Swal.fire({
                title: "Agregar un Titulo",
                input: "text",
                inputPlaceholder: "Enter your title here!"
            });

            if (title) addContent({ type: 2, value: title })
        }

        if (contentType === CONTENT_TYPE.image) {

            const { value: file } = await Swal.fire({
                title: "Select image",
                input: "file",
                inputAttributes: {
                    "accept": "image/*",
                    "aria-label": "Upload your profile picture"
                }
            });

            if (file) addContent({ file })
        }

        if (contentType === CONTENT_TYPE.audio) {
            const { value: file } = await Swal.fire({
                title: "Select audio",
                input: "file",
                inputAttributes: {
                    "accept": "mp3/*",
                    "aria-label": "Upload your audio"
                }
            });

            if (file) addContent({ audioFile: file })
        }

    }


    return (
        <button onClick={addHandle} className={`bg-sky-600 p-2 rounded`}>
            {children}
        </button>
    )
}