const URL = "http://localhost:4000/api/users" //use https

const login = (credentials) => {
  return fetch(`${URL}/login`, {
    method:'post',
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {'content-type': 'application/json'}}).then(response => response.json())
}


const register = (credentials) =>
    fetch(`${URL}/register`, {
      method:'post',
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: {'content-type': 'application/json'}}).then(response => response.json())

const profile = () => {
  return fetch(`${URL}/profile`, {method: "post", credentials: "include"}).then((response) =>
  response.json())
}

const logout = () => {
  return fetch(`${URL}/logout`, {
    method:'post',
    credentials: "include"}).then(response => response.json())
}


export default {
  register,
  login,
  logout,
  profile,
}