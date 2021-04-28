require('dotenv').config()
const ADMIN_URL = process.env.REACT_APP_API_URL


const login = (credentials) => {
  return fetch(`${ADMIN_URL}/admins/login`, {
    method:'post',
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {'content-type': 'application/json'}}).then(response => response.json())
}



const logout = () => {
  return fetch(`${ADMIN_URL}/admins/logout`, {
    method:'post',
    credentials: "include"}).then(response => response.json())
}

const createAdmin = (credentials) =>
    fetch(`${ADMIN_URL}/admins/create`, {
      method:'post',
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: {'content-type': 'application/json'}}).then(response => response.json())

const adminPage = () => {
  return fetch(`${ADMIN_URL}/admins/admin`, {method: "post", credentials: "include"}).then((response) =>
      response.json())
}

export default {
  login,
  logout,
  createAdmin,
  adminPage
}