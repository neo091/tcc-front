import axios from "axios"

const backend_url = import.meta.env.VITE_AUTH_URI || 'http://localhost:4000'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

export async function getUserData() {

    const loggedUserJson = await window.localStorage.getItem("loggedTCC")
    const userLogged = JSON.parse(loggedUserJson)

    return userLogged
}

//crear una funcion de prueba para verificar erroress de session

export async function destryoUser() {
    window.localStorage.clear()
    return {}
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}