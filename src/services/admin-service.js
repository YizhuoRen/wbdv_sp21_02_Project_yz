const ADMIN_URL = "http://localhost:4000/api/admins"


const login = (credentials) => {
  return fetch(`${ADMIN_URL}/login`, {
    method:'post',
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {'content-type': 'application/json'}}).then(response => response.json())
}



const logout = () => {
  return fetch(`${ADMIN_URL}/logout`, {
    method:'post',
    credentials: "include"}).then(response => response.json())
}

const createAdmin = (credentials) =>
    fetch(`${ADMIN_URL}/create`, {
      method:'post',
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: {'content-type': 'application/json'}}).then(response => response.json())

const adminPage = () => {
  return fetch(`${ADMIN_URL}/admin`, {method: "post", credentials: "include"}).then((response) =>
      response.json())
}

export default {
  login,
  logout,
  createAdmin,
  adminPage
}