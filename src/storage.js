
export function get(key) {
  return window.localStorage.getItem(key);
}

export function getJson(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function setJson(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function set(key, value) {
  return window.localStorage.setItem(key, value);
}

export function has(key) {
  return get(key) ?? false;
}

export function remove(key) {
  return window.localStorage.removeItem(key);
}

export default {
  get, set, getJson, setJson, has, remove
}