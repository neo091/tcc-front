import React, { useEffect, useRef, useState } from 'react';
import LogoImage from '/images/logo.png'
import { useAuth } from '@hooks/useAuth';
import { ArrowUpTrayIcon, Bars2Icon, PowerIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore } from '@store/authStore';
import { checkActivation, uploadActivateFile } from '@services/teacer.activations.service';
const serverUrl = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

const ActiveAccount = () => {
  const sidebarRef = useRef()
  const { token } = useAuthStore()
  const { Logout } = useAuth()

  const [fileOneUploaded, setFileOneUploaded] = useState(false)
  const [fileTwoUploaded, setFileTwoUploaded] = useState(false)
  const [fileOne, setFileOne] = useState("")
  const [fileTwo, setFileTwo] = useState("")

  const [activationState, setActivationState] = useState(null)

  useEffect(() => {
    const loadMyActivation = async () => {
      await checkActivation({ token })
        .then(result => myActivationResult(result.body.verification))
        .catch((e) => console.log(e.message))
    }
    loadMyActivation()
  }, [])

  const myActivationResult = (result) => {
    if (result) {

      setActivationState(result.state)

      if (result.img_1 !== null && result.img_1 !== "") {
        setFileOneUploaded(true)
        setFileOne(serverUrl + "/" + result.img_1)
      }

      if (result.img_2 !== null && result.img_2 !== "") {
        setFileTwoUploaded(true)
        setFileTwo(serverUrl + "/" + result.img_2)
      }

      console.log(result);

    }
  }

  const toggleSidebar = (e) => {

    const element = e.target

    if (element.id.toString() === "toggleSidebar") {
      sidebarRef.current.classList.toggle("hidden")
    }

    if (element.id.toString() !== "toggleSidebar") {
      sidebarRef.current.classList.add("hidden")
    }

  }

  useEffect(() => {
    document.body.addEventListener('click', toggleSidebar);
    return () => {
      document.body.removeEventListener('click', toggleSidebar);
    }
  }, [])


  const uploadFileOne = async () => {

    const { value: file } = await Swal.fire({
      title: "Certificado",
      text: "Foto de certificado o diploma que confirmen que eres un docente",
      input: "file",
      inputAttributes: {
        "accept": "image/*",
        "aria-label": "Upload your profile picture"
      },
      background: "#4b5563",
      color: "white"
    })

    if (file) await uploadActivateFile({
      token,
      file,
      type: "1"
    }).then(result => {
      if (result.upload) {
        setFileOneUploaded(true)
        setFileOne(serverUrl + "/" + result.file)
      }
    }).catch((e) => {
      console.log(e.message)
    })

  }

  const uploadFileTwo = async () => {

    const { value: file } = await Swal.fire({
      title: "Selfie de Certificado",
      text: "Selfie de certificado o diploma que confirmen que eres un docente",
      input: "file",
      inputAttributes: {
        "accept": "image/*",
        "aria-label": "Upload your picture"
      },
      background: "#4b5563",
      color: "white"
    });

    if (file) await uploadActivateFile({
      token,
      file,
      type: "2"
    }).then(result => {
      if (result.upload) {
        setFileTwoUploaded(true)
        setFileTwo(serverUrl + "/" + result.file)
      }
    }).catch((e) => {
      console.log(e.message)
    })

  }


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block w-72 max-xl:w-24 bg-slate-800 fixed lg:static h-full z-10 " ref={sidebarRef}>

        <div className="text-center p-2 ">
          <button>
            <img src={LogoImage} className=" w-40" alt="Tcc" />
          </button>
        </div>
        <div className="flex flex-col">
          <nav className="mt-5 py-2 px-4 max-xl:px-0">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
            <ul className="mb-6 flex flex-col gap-2 relative">


              <li >
                <button onClick={Logout} className="group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-red-700 w-full">
                  <PowerIcon className="w-6" />
                  <span className="max-xl:hidden block">Desconexión</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

      </div>
      <div className="relative overflow-x-hidden overflow-y-auto flex flex-1 flex-col">

        <header className="bg-slate-800 text-white z-20">
          <ul className="flex items-center ">
            <li>
              <button className="p-4" id="toggleSidebar">
                <Bars2Icon className="w-6 h-6" id="toggleSidebar" />
              </button>
            </li>
            <li>
              <Link className="px-6 py-4 inline-block hover:bg-slate-700" to={'/'}>Home</Link>
            </li>
          </ul>
        </header>
        <div className="flex flex-col w-full md:w-96 gap-6 m-auto px-6">
          <h1 className='text-4xl text-center font-bold mb-6'>Activar Cuenta</h1>
          <p>Tu cuenta se encuentra <span className='text-red-600 mb-4'>INACTIVA</span>, por favor sigue los siguientes pasos para activarla:</p>

          {
            activationState !== null
              ? activationState === 0
                ? <p className='text-blue-400'>Pendiente de validación...</p>
                : activationState === 1
                  ? (
                    <p className='text-green-400'>Cuenta Activada</p>
                  )
                  : activationState === 2
                  && (<p className='text-red-400'>Activación Rechazada</p>)
              : (<></>)
          }

          <p className='text-2xl'><span className='font-bold text-violet-600'>1:</span> Foto de certificado o diploma que confirmen que eres un docente</p>
          {
            fileOne !== "" && (
              <p>
                <a href={fileOne} target='_blank'>Ver Imagen</a>
              </p>
            )
          }
          <button disabled={fileOneUploaded} onClick={uploadFileOne} className='disabled:bg-slate-400 disabled:cursor-not-allowed p-2 bg-violet-600 flex gap-1 items-center text-center justify-center font-semibold'>SUBIR ARCHIVO <ArrowUpTrayIcon className='w-6' /></button>

          <p className='text-2xl'><span className='font-bold text-violet-600'>2:</span> Selfie de certificado o diploma que confirmen que eres un docente</p>
          {
            fileTwo !== "" && (
              <p>
                <a href={fileTwo} target='_blank'>Ver Imagen</a>
              </p>
            )
          }
          <button disabled={fileTwoUploaded} onClick={uploadFileTwo} className='disabled:bg-slate-400 disabled:cursor-not-allowed p-2 bg-violet-600 flex gap-1 items-center text-center justify-center font-semibold'>SUBIR ARCHIVO <ArrowUpTrayIcon className='w-6' /></button>
        </div>
      </div>
    </div>
  );
}

export default ActiveAccount;
