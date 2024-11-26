/*
import axios from "axios";

const API_URL = "http://localhost:4000/profile"; // Reemplaza con tu URL base

// --- Función para subir o actualizar una imagen ---
const uploadImage = async (endpoint, id, base64Image) => {
  try {
    const response = await axios.put(`${API_URL}/${endpoint}/${id}`, { image: base64Image });
    return response.data;
  } catch (error) {
    console.error(`Error uploading image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

// --- Función para obtener una imagen ---
const getImage = async (endpoint, id) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}/${id}`);
    return response.data.image; // Regresa el blob en formato base64
  } catch (error) {
    console.error(`Error fetching image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

// --- Función para eliminar una imagen ---
const deleteImage = async (endpoint, id) => {
  try {
    const response = await axios.delete(`${API_URL}/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export default {
  uploadImage,
  getImage,
  deleteImage,
};

import axios from "axios";

const API_URL = "http://localhost:4000/profile"; // Reemplaza con tu URL base

// --- Función para guardar una imagen --- 
const saveImage = async (type, userId, file) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  try {
    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("image", file); // El nombre del campo puede variar dependiendo de cómo esté configurado el servidor

    // Enviar la imagen al servidor
    const response = await axios.put(`${API_URL}/${type}/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Necesario para indicar que estamos enviando un archivo
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error saving ${type} image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

const getImage = async (type, userId) => {
  try {
    const response = await axios.get(`${API_URL}/${type}/${userId}`, {
      responseType: "arraybuffer",  // Necesario para recibir la imagen como un buffer
    });

    // Convertir el buffer en un Blob y crear una URL para usarla como fuente de imagen
    const imageBlob = new Blob([response.data], { type: "image/jpeg" }); // Cambia el tipo MIME si es necesario
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl; // Retorna la URL para usarla en un <img src="...">
  } catch (error) {
    console.error(`Error fetching ${type} image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const saveUserImage = (userId, file) => saveImage("userimage", userId, file);
export const getUserImage = (userId) => getImage("userimage", userId);

export const saveUserBackground = (userId, file) => saveImage("userbackground", userId, file);
export const getUserBackground = (userId) => getImage("userbackground", userId);

export default {
  saveUserImage,
  getUserImage,
  saveUserBackground,
  getUserBackground,
};

import axios from "axios";
import imageCompression from "browser-image-compression"; // Importa la librería

const API_URL = "http://localhost:4000/profile"; // Reemplaza con tu URL base

// --- Función para comprimir la imagen ---
const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1, // Tamaño máximo en MB
      maxWidthOrHeight: 800, // Tamaño máximo de ancho o altura
      useWebWorker: true, // Usar un worker para no bloquear el hilo principal
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile; // Regresa la imagen comprimida
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Error compressing image");
  }
};

// --- Función para guardar la imagen (con compresión) ---
const saveImage = async (type, userId, file) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  try {
    // Comprimir la imagen antes de enviarla
    const compressedFile = await compressImage(file);

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("image", compressedFile); // El nombre del campo puede variar dependiendo de cómo esté configurado el servidor

    // Enviar la imagen al servidor
    const response = await axios.put(`${API_URL}/${type}/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Necesario para indicar que estamos enviando un archivo
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error saving ${type} image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

// --- Función para obtener la imagen ---
const getImage = async (type, userId) => {
  try {
    const response = await axios.get(`${API_URL}/${type}/${userId}`, {
      responseType: "arraybuffer",  // Necesario para recibir la imagen como un buffer
    });

    // Convertir el buffer en un Blob y crear una URL para usarla como fuente de imagen
    const imageBlob = new Blob([response.data], { type: "image/jpeg" }); // Cambia el tipo MIME si es necesario
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl; // Retorna la URL para usarla en un <img src="...">
  } catch (error) {
    console.error(`Error fetching ${type} image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const saveUserImage = (userId, file) => saveImage("userimage", userId, file);
export const getUserImage = (userId) => getImage("userimage", userId);

export const saveUserBackground = (userId, file) => saveImage("userbackground", userId, file);
export const getUserBackground = (userId) => getImage("userbackground", userId);

export default {
  saveUserImage,
  getUserImage,
  saveUserBackground,
  getUserBackground,
};
*/
import axios from "axios";
import imageCompression from "browser-image-compression"; // Importa la librería

const API_URL = "http://localhost:4000/profile"; // Reemplaza con tu URL base

// --- Función para comprimir la imagen ---
const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 0.5, // Tamaño máximo en MB, reducir para mayor compresión
      maxWidthOrHeight: 800, // Tamaño máximo de ancho o altura
      useWebWorker: true, // Usar un worker para no bloquear el hilo principal
      initialQuality: 0.5, // Reducir la calidad inicial (0.1 - 1.0)
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile; // Regresa la imagen comprimida
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Error compressing image");
  }
};

// --- Función para guardar la imagen (con compresión) ---
const saveImage = async (type, userId, file) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  try {
    // Comprimir la imagen antes de enviarla
    const compressedFile = await compressImage(file);

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("image", compressedFile); // El nombre del campo puede variar dependiendo de cómo esté configurado el servidor

    // Enviar la imagen al servidor
    const response = await axios.put(`${API_URL}/${type}/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Necesario para indicar que estamos enviando un archivo
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error saving ${type} image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

// --- Función para obtener la imagen ---
const getImage = async (type, userId) => {
  try {
    const response = await axios.get(`${API_URL}/${type}/${userId}`, {
      responseType: "arraybuffer",  // Necesario para recibir la imagen como un buffer
    });

    // Convertir el buffer en un Blob y crear una URL para usarla como fuente de imagen
    const imageBlob = new Blob([response.data], { type: "image/jpeg" }); // Cambia el tipo MIME si es necesario
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl; // Retorna la URL para usarla en un <img src="...">
  } catch (error) {
    console.error(`Error fetching ${type} image: ${error.response?.data?.message || error.message}`);
    throw error;
  }
};

export const saveUserImage = (userId, file) => saveImage("userimage", userId, file);
export const getUserImage = (userId) => getImage("userimage", userId);

export const saveUserBackground = (userId, file) => saveImage("userbackground", userId, file);
export const getUserBackground = (userId) => getImage("userbackground", userId);

export default {
  saveUserImage,
  getUserImage,
  saveUserBackground,
  getUserBackground,
};
