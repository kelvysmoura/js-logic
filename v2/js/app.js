
const EXERCISE_LOADED = {};
const HASH_LOADED = {};

export const redirect = (to) => {
    location.hash = to
}

export const renderComponent = async (id, content) => {
    let element = document.querySelector(`[id="${id}"]`);
    if (element) {
        element.innerHTML = typeof content.then === 'function' ? await content : content;
        return element;
    }
}

export const getHash = function () {
    let url = document.location.href;
    if(HASH_LOADED[url]) {
        return HASH_LOADED[url]
    }
    let hash = (new URL(url)).hash.slice(1);
    HASH_LOADED[url] = hash;
    return HASH_LOADED[url];
}

export const loadExerciseDescription =  async (hash) => {
    let request = await fetch(`js/exercises/${hash}/description.md`);
    if (request.status !== 200) {
        return loadExerciseDescription(404);
    }
    return await request.text();
}

export const loadExercise = async (hash) => {
    if(EXERCISE_LOADED[hash]) {
        return EXERCISE_LOADED[hash];
    }
    try {
        let request = await import(`./exercises/${hash}/index.js`);
        EXERCISE_LOADED[hash] = request.default;
        return EXERCISE_LOADED[hash];
    } catch (e) {
        redirect(404);
    }
}

export const getCurrentExercise = () => {
    return loadExercise(getHash());
}

export const randomString = (qty = 1) => {
    return Array(qty).fill(true).map(() => {
        return Math.random().toString(16).replace('0.', '');
    }).join('_');
}

export async function sleep(seconds) {
    return await new Promise(revolve => setTimeout(revolve, seconds * 1000));
}