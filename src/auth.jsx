export async function getUserData() {
    await fakeNetwork()
    const loggedUserJson = await window.localStorage.getItem("loggedTCC")
    const userLogged = JSON.parse(loggedUserJson)
    return userLogged
}

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