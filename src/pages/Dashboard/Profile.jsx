/*
import { GridContent } from "@components/GridContent"
import Title from "@components/Title"
import { useAuthStore } from "@store/authStore"

const UserTypeToString = (type) => {

    if (type === 0) return 'undefined'
    if (type === 1) return 'Student'
    if (type === 2) return 'Teacher'
    if (type === 3) return 'Admin'

}


const ProfilePicture = ({ src }) => <img src={src} className="mx-auto w-[100px] bg-black rounded-full " alt="" />
const ProfileInfo = ({ name }) => <p className=" text-center capitalize ">{name}</p>
const UserType = ({ type }) => <p className="text-sm text-center text-blue-500">{UserTypeToString(type)}</p>

const Profile = () => {


    const { session } = useAuthStore()

    console.log(session)

    const updatePanel = (e) => {
        document.querySelector('.active-panel').classList.remove('active-panel')
        e.target.classList.add('active-panel')
        updatePanelHandle(e.target.dataset.panelName)
    }


    return (
        <>
            <Title>Perfil</Title>
            <GridContent>
                <ProfilePicture src='/images/JohnWick.png' />
                <ProfileInfo name={session.name} />
                <ProfileInfo name={session.email} />
                <UserType type={session.type} />
            </GridContent>
        </>

    );
}

export default Profile;
*/

import React, { useState, useEffect } from "react";
import { GridContent } from "@components/GridContent";
import Title from "@components/Title";
import { useAuthStore } from "@store/authStore";
import {
  saveUserImage,
  getUserImage,
  saveUserBackground,
  getUserBackground,
} from "../../services/profile"; // Importación del servicio

const UserTypeToString = (type) => {
  switch (type) {
    case 1:
      return "Student";
    case 2:
      return "Teacher";
    case 3:
      return "Admin";
    default:
      return "User";
  }
};

const ProfilePicture = ({ src, onEdit }) => (
  <div className="relative w-[120px] mx-auto">
    <img
      src={src}
      className="w-full h-full bg-black rounded-full border-[4px] border-gray-600 object-cover"
      alt="Profile"
    />
    <button
      onClick={onEdit}
      className="absolute bottom-0 right-0 bg-blue-600 px-2 py-1 rounded-full text-white text-xs shadow-md"
    >
      Edit
    </button>
  </div>
);

const ProfileInfo = ({ name }) => (
  <p className="text-center text-lg font-semibold text-gray-300 capitalize">{name}</p>
);

const UserType = ({ type }) => (
  <p className="text-sm text-center text-blue-400">{UserTypeToString(type)}</p>
);

const Popup = ({ onClose, onSave, type, setFile }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-black bg-opacity-75 text-white p-6 rounded shadow-lg w-[90%] max-w-md">
      <h3 className="text-lg font-semibold mb-4">Subir Imagen {type}</h3>
      <input
        type="file"
        className="block w-full mb-4 bg-gray-700 border border-gray-600 rounded px-4 py-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-red-500 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { session } = useAuthStore();
  const [isBackgroundPopupOpen, setBackgroundPopupOpen] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch current profile and background images from the server
  useEffect(() => {
    const fetchImages = async () => {
      if (session?.id) {
        try {
          const profileImg = await getUserImage(session.id);
          const bgImg = await getUserBackground(session.id);

          setProfileImage(profileImg);
          setBackgroundImage(bgImg);
        } catch (error) {
          console.error("Error al cargar imágenes:", error);
        }
      }
    };
    fetchImages();
  }, [session?.id]);

  const handleSaveProfileImage = async () => {
    if (selectedFile) {
      try {
        await saveUserImage(session.id, selectedFile);
        setProfileImage(URL.createObjectURL(selectedFile)); // Vista previa
        setProfilePopupOpen(false);
      } catch (error) {
        console.error("Error al actualizar imagen de perfil:", error);
      }
    }
  };

  const handleSaveBackgroundImage = async () => {
    if (selectedFile) {
      try {
        await saveUserBackground(session.id, selectedFile);
        setBackgroundImage(URL.createObjectURL(selectedFile)); // Vista previa
        setBackgroundPopupOpen(false);
      } catch (error) {
        console.error("Error al actualizar imagen de fondo:", error);
      }
    }
  };

  return (
    <>
      <Title>Perfil</Title>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        {/* Imagen de Fondo */}
        <div className="relative w-full h-[200px] bg-gray-600 rounded-lg overflow-hidden">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setBackgroundPopupOpen(true)}
            className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md"
          >
            Editar Fondo
          </button>
        </div>

        {/* Información de Perfil */}
        <GridContent className="mt-[-60px]">
          <div className="relative">
            <ProfilePicture
              src={profileImage}
              onEdit={() => setProfilePopupOpen(true)}
            />
          </div>
          <div className="mt-4 text-center">
            <ProfileInfo name={session?.name} />
            <ProfileInfo name={session?.email} />
            <UserType type={session?.type} />
          </div>
        </GridContent>
      </div>

      {/* Popup para editar fondo */}
      {isBackgroundPopupOpen && (
        <Popup
          type="Fondo"
          onClose={() => setBackgroundPopupOpen(false)}
          onSave={handleSaveBackgroundImage}
          setFile={setSelectedFile}
        />
      )}

      {/* Popup para editar imagen de perfil */}
      {isProfilePopupOpen && (
        <Popup
          type="Perfil"
          onClose={() => setProfilePopupOpen(false)}
          onSave={handleSaveProfileImage}
          setFile={setSelectedFile}
        />
      )}
    </>
  );
};

export default Profile;
