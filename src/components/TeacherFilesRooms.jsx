import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import { deleteFileFromServer, getTeacherRoomFiles, uploadFile } from "@services/teacher"
import { useRoomStore } from "@store/roomStore"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const TeacherFilesRooms = () => {

  const { room } = useRoomStore()
  const [files, setFiles] = useState([])

  const getFileList = async () => {
    const fileList = await getTeacherRoomFiles(room.aula_id)

    setFiles(fileList.body.files)

    // console.log(fileList.body.files)
  }

  useEffect(() => {
    getFileList()
  }, [])


  const addFileHandle = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        "accept": "pdf/*",
        "aria-label": "Upload your profile picture"
      }
    });
    if (file) {
      const uploaded = await uploadFile(file, room.aula_id)

      if (!uploaded.data.error) {
        console.log(uploaded.data.body)
        const newFileList = [...files].concat({ archivo_id: uploaded.data.body.insertId, name: file.name })
        setFiles(newFileList)


        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "agregado correctamente"
        });
      }
    }
  }

  const deleteFileHandle = async (fileId, name) => {


    Swal.fire({
      title: `Borrar ${name}`,
      showCancelButton: true,
      confirmButtonText: "Borrar",
      confirmButtonColor: "#ef4444"
    }).then(async (response) => {
      if (response.isConfirmed) {
        console.log('borrado')
        const newFiles = [...files].filter(({ archivo_id }) => archivo_id !== fileId)
        setFiles(newFiles)
        await deleteFileFromServer(fileId)


        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "eliminado correctamente"
        });
      }
    })

  }

  return (
    <div className="bg-slate-800 rounded mb-4">
      <div className="flex py-4 px-4 border-b border-slate-700">
        <h2 className="flex-1">Archivos</h2>
        <button onClick={addFileHandle}>
          <PlusCircleIcon className="w-8 h-8" />
        </button>
      </div>

      <div className="p-4">
        {
          files.map(({ name, archivo_id, view_in_files }) => {


            return (
              <>
                {view_in_files === 1 && <div key={archivo_id} className="bg-slate-700 rounded relative p-2 block my-2 hover:underline hover:cursor-pointer ">
                  <div className="mr-8 truncate">{name}</div>
                  <button className="text-red-500 absolute right-1 top-2" title="Delete">
                    <TrashIcon className='w-6 h-6' onClick={() => deleteFileHandle(archivo_id, name)} />
                  </button>

                </div>}

              </>
            )
          })
        }
        {
          files.length <= 0 && <p className="text-center">Carga archivos</p>
        }
      </div>

    </div>
  );
}

export default TeacherFilesRooms;
