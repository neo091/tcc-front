import { updateUserImage } from "@services/profile.service"
import { useAuthStore } from "@store/authStore"
import Swal from "sweetalert2"

export const UserTypeToString = (type) => {

  if (type === 0) return 'undefined'
  if (type === 1) return 'Student'
  if (type === 2) return 'Teacher'
  if (type === 3) return 'Admin'

}


export const ProfilePicture = () => {
  const { session, setUserPic } = useAuthStore()


  const updateImage = async (file, type) => {
    let userPic
    await updateUserImage({ file, token: session.token, type: type })
      .then(result => {

        if (!result.error) {
          userPic = result.body.filename
          //setUserPic(result.body.filename)

        }
      })

    return userPic
  }

  const changeImageHandle = async (type) => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        "accept": "image/*",
        "aria-label": "Upload your profile picture"
      },
      background: "#4b5563",
      color: "white"
    });
    if (file) {
      await updateImage(file, type).then(pic => {
        setUserPic(pic)
      })
    }
  }
  return (
    <section className="group relative mx-auto w-[100px] h-[100px] rounded-full overflow-hidden ">
      <button onClick={() => changeImageHandle('pic')} className="group-hover:opacity-100 group-hover:blur-0 absolute p-2 bg-gray-600 bottom-0 left-0 right-0 text-xs blur-sm opacity-0 transition-all duration-300">Cambiar</button>
      <img src={session.pic ? `http://localhost:4000/uploads/${session.pic}` : `https://ui-avatars.com/api/?name=${session?.name}&background=0D8ABC&color=fff`} className=" w-full h-full bg-black " alt="" />

    </section>
  )
}

export const ProfileBg = () => {

  const { session, setUserBg } = useAuthStore()

  console.log(session);

  const updateImage = async (file, type) => {
    let userPic
    await updateUserImage({ file, token: session.token, type: type })
      .then(result => {

        if (!result.error) {
          userPic = result.body.filename
          //setUserPic(result.body.filename)

        }
      })

    return userPic
  }

  const changeImageHandle = async (type) => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        "accept": "image/*",
        "aria-label": "Upload your profile picture"
      },
      background: "#4b5563",
      color: "white"
    });
    if (file) {
      await updateImage(file, type).then(pic => {
        setUserBg(pic)
      })
    }
  }

  return (
    <div className="relative w-full h-[200px] bg-gray-600 rounded-lg overflow-hidden group">
      <img
        src={session.bg ? `http://localhost:4000/uploads/${session.bg}` : `https://ui-avatars.com/api/?name=${session?.name}&background=0D8ABC&color=fff`}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => changeImageHandle('bg')}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md group-hover:opacity-100 opacity-0 transition-all duration-500 "
      >
        Editar Fondo
      </button>
    </div>
  )
}

export const ProfileInfo = ({ name }) => <p className=" text-center capitalize ">{name}</p>
export const ProfileUserType = ({ type }) => <p className="text-sm text-center text-blue-500">{UserTypeToString(type)}</p>