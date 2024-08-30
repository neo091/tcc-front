import parseHTML from 'html-react-parser'
import AudioButton from "./AudioButton"
import Swal from 'sweetalert2'

export const Content = ({ type, value }) => {

    const optionsModalHandle = () => {
        Swal.fire({
            title: "You want to make changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Edit",
            denyButtonText: `Delete`
        }).then(async (result) => {


            if (result.isConfirmed) {
                const { value: text } = await Swal.fire({
                    title: "Edit section",
                    input: "textarea",
                    inputValue: value
                });

                if (text) {
                    Swal.fire({
                        title: "Edited",
                        timer: 1500,
                        icon: "success",
                        showConfirmButton: false
                    })

                    //falta agregar el edit
                    //editHandle({ value: text, ID: id, type: type })
                }
            }


            if (result.isDenied) {
                Swal.fire({
                    title: "Deleted",
                    timer: 1500,
                    icon: "success",
                    showConfirmButton: false
                })
            }
        })
    }

    return (
        <>
            {type === 1 && <div onClick={optionsModalHandle} className="p-2 hover:bg-slate-600 hover:cursor-pointer">
                {parseHTML(value)}
            </div>}
            {type === 2 && <div className="p-2 hover:bg-slate-600 hover:cursor-pointer" onClick={optionsModalHandle}>
                <h2 className="font-bold text-2xl ">{value}</h2>
            </div>}
            {type === 3 && <p className="mt-2">
                {<img src={value} onClick={optionsModalHandle} />}
            </p>}

            {type === 4 && <AudioButton url={value} />}
        </>
    )
}