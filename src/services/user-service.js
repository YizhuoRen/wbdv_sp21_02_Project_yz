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

const findRecentNewUsers= () => {
  return fetch(`${URL}/new`, {
    method:'post'}).then(response => response.json())
}

const updateProfile = (user) => {
  return fetch(`${URL}/update`, {
    method:'post',
    credentials: "include",
    body: JSON.stringify(user),
    headers: {'content-type': 'application/json'}},
      ).then(response => response.json())
}

const findUserById = (userId) => {
  return fetch(`${URL}/${userId}`
  ).then(response => response.json())
}

const follow = (userVisited, currentUser) => {
  return fetch(`${URL}/follow/${userVisited._id}/${currentUser._id}`, {
    method:'post',
    headers: {'content-type': 'application/json'}},
  ).then(response => response.json())
}


export default {
  register,
  login,
  logout,
  profile,
  findRecentNewUsers,
  updateProfile,
  findUserById,
  follow
}