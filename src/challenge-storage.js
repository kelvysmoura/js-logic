
import storage from "./storage.js";
import storageKeys from "./storage-keys.js";

function createKeyNames(hash) {
  let obj = {};
  Object.values(storageKeys).forEach(key => {
    obj[key] = `${hash}-${key}`
  });
  return obj;
}

export default function (hash) {
  const key = createKeyNames(hash);

  return {
    jscode(code) {
      return code === undefined
        ? storage.get(key[storageKeys.JSCODE]) ?? ""
        : storage.set(key[storageKeys.JSCODE], code);
    },

    progress(progress) {
      return progress === undefined
        ? storage.get(key[storageKeys.PROGRESS])
        : storage.set(key[storageKeys.PROGRESS], Math.round(progress));
    },

    status(json) {
      return json === undefined 
        ? storage.getJson(key[storageKeys.STATUS])
        : storage.setJson(key[storageKeys.STATUS], json);
    },

    error(message) {
      return message === undefined
        ? storage.get(key[storageKeys.ERROR])
        : storage.set(key[storageKeys.ERROR], message);
    },

    remove(keyName) {
      keyName = key[keyName]
      if (storage.has(keyName)) {
        return storage.remove(keyName);
      }
    }
  }
}