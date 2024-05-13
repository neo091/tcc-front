export async function getUserData() {
    const loggedUserJson = window.localStorage.getItem("loggedTCC")
    const userLogged = JSON.parse(loggedUserJson)
    return userLogged
}

export async function destryoUser() {
    window.localStorage.clear()

    return {}
}