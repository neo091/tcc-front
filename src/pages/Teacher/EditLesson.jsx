import { Form, redirect, useLoaderData } from "react-router-dom"
import teacher, { getLesson, getLessonFiles, updateLesson } from "../../services/teacher"
import Button from "../../components/Button"
import Enlace from "../../components/Enlace"
import Swal from "sweetalert2"
import { useEffect, useRef, useState } from "react"
import fileDownload from "js-file-download"
import parseHTML from 'html-react-parser'
import AudioButton from "../../components/AudioButton"
import { useLessonsEdit } from "../../hooks/useLessonsEdit"
import { useLessonStore } from "../../store/lessonStore"
import { Card, CardHeader, CardTitle } from "../../components/Card"
import { useLessons } from "../../hooks/useLessons"

export const loader = async ({ params }) => {
    const lessonId = params.lessonId
    return { lessonId }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const updated = updateLesson(params.lessonId, updates)

    return redirect(`/Teacher/Rooms/${params.id}`)
}

const AddSectionButton = ({ handle, type, children }) => {
    return (
        <button onClick={() => handle(type)} className={`shadow-[inset_0px_-6px_0px_0px_#00000050] inline my-2 text-white py-2 px-5 transition-all duration-500 bg-violet-600 hover:bg-violet-500`}>
            {children}
        </button>
    )
}

const SectionTypes = ({ type, value, editHandle, id }) => {

    const [imageUrl, setImageUrl] = useState(null)
    const [audioUrl, setAudioUrl] = useState(null)

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
                    //await teacher.addLessonContent({ type: 1, value: text }, body.id)
                    //setSections([...sections, { ID: sections.length + 1, type: 1, value: text }])

                    Swal.fire({
                        title: "Edited",
                        timer: 1500,
                        icon: "success",
                        showConfirmButton: false
                    })


                    editHandle({ value: text, ID: id, type: type })
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

const EditLesson = () => {

    const { lastLessonCreatedId } = useLessonStore()
    const { getLesson } = useLessons({})

    const lesson = getLesson({ lessonId: lastLessonCreatedId })

    console.log(lesson)

    const [filesToUpload, setFilesToUpload] = useState([])
    const [myFiles, setMyFiles] = useState([])

    const inputFileRef = useRef()

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

    // const uploadFileHandle = async (file) => {
    //     await teacher.uploadFile(file, body.room, body.id).then(result => {

    //         return result

    //     }).catch((e) => console.log(e.message))

    // }

    const downloadFileHandle = async (file) => {
        await teacher.downloadFileFromServer(file.archivo_id)
            .then(result => fileDownload(result.data, file.name))
            .catch(({ message }) => console.log(message))

    }

    const deleteFileHandle = async (file) => {

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

    const [sections, setSections] = useState([])

    // useEffect(() => setSections(contents.body.result), [])

    const addTextSection = async () => {
        const { value: text } = await Swal.fire({
            title: "Add text section",
            input: "textarea",
            inputPlaceholder: "Enter your text here!"
        });


        if (text) {
            await teacher.addLessonContent({ type: 1, value: text }, body.id)
            setSections([...sections, { ID: sections.length + 1, type: 1, value: text }])
        }
    }

    const addTitleSection = async () => {
        const { value: title } = await Swal.fire({
            title: "Add title section",
            input: "text",
            inputPlaceholder: "Enter your title here!"
        });


        if (title) {
            await teacher.addLessonContent({ type: 2, value: title }, body.id)
            setSections([...sections, { ID: sections.length + 1, type: 2, value: title }])
        }
    }

    const addImageSection = async () => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your profile picture"
            }
        });

        if (file) {

            await teacher.uploadFile(file, body.room, body.id).then(result => {

                console.log(result.data.body)
                const { insertId } = result.data.body
                fetch(`http://localhost:4000/api/files/${insertId}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)

                        const url = `http://localhost:4000/uploads/${data.body[0].name}`

                        teacher.addLessonContent({ type: 3, value: url }, body.id).then(result => {
                            setSections([...sections, { ID: sections.length + 1, type: 3, value: url }])
                        }).catch((e) => {
                            console.log(e)
                        })
                    });

            }).catch((e) => console.log(e.message))


            //setSections([...sections, { ID: sections.length + 1, type: 3, value: file }])
        }
    }

    const addAudioSection = async () => {
        const { value: fileUpload } = await Swal.fire({
            title: "Select audio",
            input: "file",
            inputAttributes: {
                "accept": "mp3/*",
                "aria-label": "Upload your audio"
            }
        });

        if (fileUpload) {

            //subir archio de audio
            const upload = await teacher.uploadAudioFile(fileUpload, body.room, body.id)
            //obtenemos el id de el archivo insertado
            const { insertId } = upload.body.result
            const { file } = upload.body.data

            await teacher.addLessonContent({ type: 4, value: `http://localhost:4000/uploads/${file.filename}` }, body.id)

            setSections([...sections, { ID: sections.length + 1, type: 4, value: `http://localhost:4000/uploads/${file.filename}` }])

        }
    }


    const addSectionHandle = async (type) => {


        if (type && type === "text") {
            addTextSection()
        }

        if (type && type === "title") {
            addTitleSection()
        }

        if (type && type === "image") {
            addImageSection()
        }

        if (type && type === "audio") {
            addAudioSection()
        }
    }

    const editHandle = (data) => {

        const edited = sections.filter(section => {
            if (section.ID === data.ID) {
                section.ID = data.ID
                section.type = data.type
                section.value = data.value
                return { ID: data.ID, type: data.type, value: data.value }
            } else {
                return section
            }
        })
        setSections(edited)
        console.log(edited)

    }

    const deleteSectionHandle = () => {

    }

    return (
        <>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>

                <div className="">
                    <Card>
                        <CardHeader>
                            <CardTitle>Editar</CardTitle>
                        </CardHeader>
                        <div className="p-4">
                            <Form method="POST">

                                <div className="my-2">
                                    <input name='title' type="text" placeholder='Titulo de la lección' defaultValue={''} className="text-black p-2 w-full" />
                                </div>

                                <div className="my-2">
                                    <textarea name='desc'
                                        cols="30" rows="4"
                                        className="p-2 w-full text-black" placeholder="Descripción breve sobre esta lección"></textarea>
                                </div>

                                <div className="w-full flex gap-3">
                                    <Button text="GUARDAR" />
                                </div>

                            </Form>
                        </div>
                    </Card>
                </div>

            </div>


            {/* <div className='w-full sm:w-2/3 lg:w-2/4  mx-auto'>


                <Form method="POST">

                    <div className="my-2">
                        <input name='title' type="text" placeholder='Titulo de la lección' defaultValue={body.title} className="text-black p-2 w-full" />
                    </div>

                    <div className="my-2">
                        <textarea name='desc'
                            cols="30" rows="4"
                            className="p-2 w-full text-black" placeholder="Descripcion breve sobre esta lección" defaultValue={body.desc}></textarea>
                    </div>

                    <div className="w-full flex gap-3">
                        <Button text="GUARDAR" />
                    </div>

                </Form>

                <Enlace to={`../${body.room}/lessons/${body.id}/students`}>Alumnos</Enlace>

            </div>

            <div className="w-full sm:w-2/3 lg:w-2/4  mx-auto">
                <h2 className="my-3 font-semibold text-xl">Secciones de la lección</h2>

                <AddSectionButton type={"text"} handle={addSectionHandle}>
                    Text
                </AddSectionButton>

                <AddSectionButton type={"title"} handle={addSectionHandle}>
                    Title
                </AddSectionButton>

                <AddSectionButton type={"image"} handle={addSectionHandle}>
                    Image
                </AddSectionButton>

                <AddSectionButton type={"audio"} handle={addSectionHandle}>
                    Audio
                </AddSectionButton>

                <div className="">
                    {sections.map((section) => <SectionTypes key={section.ID} type={section.type} value={section.value} editHandle={editHandle} id={section.ID} />)}
                </div>
            </div > */}



        </>
    )
}

export default EditLesson;