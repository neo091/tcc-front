import { Form, redirect, useLoaderData } from "react-router-dom"
import teacher, { getLesson, getLessonFiles, updateLesson } from "../../services/teacher"
import Button from "../../components/Button"
import Enlace from "../../components/Enlace"
import Swal from "sweetalert2"
import { useEffect, useRef, useState } from "react"
import Title from "../../components/Title"
import fileDownload from "js-file-download"


export const loader = async ({ params }) => {

    const result = await getLesson(params.lessonId)
    return { body: result.body.respuesta }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const updated = updateLesson(params.lessonId, updates)

    return redirect(`/Teacher/Rooms/${params.id}`)
}


const EditLesson = () => {

    const { body } = useLoaderData()

    const [filesToUpload, setFilesToUpload] = useState([])
    const [myFiles, setMyFiles] = useState([])

    const inputFileRef = useRef()


    const getFiles = () => {
        console.log(body)
        getLessonFiles(body.leccion_id).then(result => {
            setMyFiles(result.body)
        })
    }

    useEffect(() => {
        getFiles()
    }, [])


    const convertToDateTimeLocalString = (fecha_limite) => {
        const date = new Date(fecha_limite)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const modalHandle = () => inputFileRef.current.click()

    const fileUploadChange = (e) => {


        const file = e.target.files[0]
        const accepted = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        if (file) {


            const inArray = filesToUpload.filter(({ name }) => name === file.name)
            //console.log(file)

            if (inArray.length > 0) {
                return
            }


            if (file.type === accepted) {
                console.log('es docx')
            } else {
                console.log('no es docx')

                return
            }

            if (file.size > 1000000) {
                console.log('es menor o igual a 1MB', `${Math.trunc((file.size / 1000))}kb`)

                return
            }

            setFilesToUpload([...filesToUpload, file])
        }

    }

    const uploadFileHandle = async (file) => {
        await teacher.uploadFile(file, body.aula_id, body.leccion_id).then(result => {

            setFilesToUpload(filesToUpload.filter(({ name }) => name !== file.name))

            getFiles()


        }).catch((e) => console.log(e.message))

    }

    const downloadFileHandle = async (file) => {
        await teacher.downloadFileFromServer(file.archivo_id)
            .then(result => fileDownload(result.data, file.name))
            .catch(({ message }) => console.log(message))

    }

    const deleteHandle = async (file) => {

        Swal.fire({
            icon: "info",
            title: "Borrar Archivo",
            html: `<b>${file.name}</b>`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await teacher.deleteFileFromServer(file.archivo_id).then(result => getFiles())

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se ha borrado correctamente",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });

    }



    return (
        <>
            <div className='w-full sm:w-2/3 lg:w-2/4  mx-auto'>
                <Form method="POST">
                    <div className="my-2">
                        <input name='tipo_leccion' type="text" placeholder='tipo lección' defaultValue={body.tipo_leccion} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2">
                        <input name='fecha_limite' type="datetime-local" defaultValue={convertToDateTimeLocalString(body.fecha_limite)} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2">
                        <textarea name='descripcion' cols="30" rows="4" className="p-2 w-full text-black" placeholder="Descripcion breve sobre esta aula" defaultValue={body.descripcion}></textarea>
                    </div>


                    <div className="w-full flex gap-3">
                        <Button text="GUARDAR" />
                    </div>


                </Form>



                <div>
                    {
                        filesToUpload.map(file => (
                            <p className="bg-slate-800 p-2 text-center overflow-hidden " key={file.name}>{file.name} <button className=" bg-violet-700 p-2 inline-block rounded" onClick={() => uploadFileHandle(file)}>Subir</button></p>
                        ))
                    }
                </div>



                <form>
                    <Title>Subir Archivos</Title>
                    <input type="file" ref={inputFileRef} onChange={fileUploadChange} hidden />

                    <div onClick={() => modalHandle()} className=" hover:cursor-pointer my-4 p-4 border-dashed rounded border-violet-500 border-[5px] text-center uppercase font-bold text-violet-500">
                        <p>Click Aquí para subir archivo</p>
                    </div>
                </form>

                <div>
                    <h2 className=" font-semibold">Archivos:</h2>
                    {
                        myFiles.length > 0
                            ? myFiles.map(file => (
                                <p className="bg-slate-800 p-2 text-center overflow-hidden " key={file.name}>
                                    {file.name.substring(file.name.indexOf("-") + 1, file.name.length)}
                                    <button onClick={() => deleteHandle(file)} className=" bg-red-600 p-2 inline-block rounded mx-2 font-bolder uppercase">Borrar</button>
                                    <button onClick={() => downloadFileHandle(file)} className=" bg-violet-700 p-2 inline-block rounded mx-2 font-bolder uppercase">Descargar</button>
                                </p>
                            ))
                            : <div className=" bg-slate-800 p-4 text-center uppercase font-bold">
                                <p>No files</p>
                            </div>
                    }
                </div>



            </div>

        </>
    )
}

export default EditLesson;