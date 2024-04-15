async function load(module) {
  return (await import(`${BASE_PATH}/${module}`)).default
}

const storage = await load('src/storage.js');

export function getLink() {
  const jsonData = JSON.stringify(localStorage);
  const base64Data = btoa(jsonData);

  const currentDomain = window.location.origin;

  const path = `${currentDomain}${BASE_PATH}/challenges/index.html?base64=${base64Data}`;

  return path;
}

export function setBase64ToLocalStorage(base64 = '') {
  const decodedBase64 = JSON.parse(atob(base64))
  Object.keys(decodedBase64).forEach(key => {
    storage.set(key, decodedBase64[key]);
  })
  location.href = `${BASE_PATH}/challenges`;
}

export default {
  getLink,
  setBase64ToLocalStorage
}
