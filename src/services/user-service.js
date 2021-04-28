require('dotenv').config()
const URL = process.env.REACT_APP_API_URL


const login = (credentials) => {
  return fetch(`${URL}/users/login`, {
    method:'POST',
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {'content-type': 'application/json'}}).then(response => response.json())
}


const register = (credentials) =>
    fetch(`${URL}/users/register`, {
      method:'POST',
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: {'content-type': 'application/json'}}).then(response => response.json())

const profile = () => {
  return fetch(`${URL}/users/profile`, {method: "POST",
    headers: {'content-type':'application/json'}, credentials: "include"}).then((response) =>
  response.json())
}

const logout = () => {
  return fetch(`${URL}/users/logout`, {
    method:'POST',
    headers: {'content-type':'application/json'},
    credentials: "include"}).then(response => response.json())
}

const findRecentNewUsers= () => {
  return fetch(`${URL}/users/new`, {
    method:'POST', headers: {'content-type':'application/json'}}).then(response => response.json())
}

const updateProfile = (user) => {
  return fetch(`${URL}/users/update`, {
    method:'POST',
    credentials: "include",
    body: JSON.stringify(user),
    headers: {'content-type': 'application/json'}},
      ).then(response => response.json())
}

const findUserById = (userId) => {
  return fetch(`${URL}/users/user/${userId}`,{
    method:'POST',
    headers: {'content-type':'application/json'}}
  ).then(response => response.json())
}

const findUserByName = (username) => {
  return fetch(`${URL}/users/username/${username}`
  ).then(response => response.json())
}


const deleteUser = (userId) => fetch(`${URL}/users/${userId}`,
      {method: 'DELETE',  headers: {'content-type': 'application/json'}}
  ).then(response => response.json())

const follow = (userVisited, currentUser) => {
  return fetch(`${URL}/users/follow/${userVisited._id}/${currentUser._id}`, {
    method:'POST',
    headers: {'content-type': 'application/json'}},
  ).then(response => response.json())
}


const unfollow = (userVisited, currentUser) => fetch(`${URL}/users/unfollow/${userVisited._id}/${currentUser._id}`, {
    method:'POST',
    headers: {'content-type': 'application/json'}}
  ).then(response => response.json())



const checkFollowingState = (userVisited, currentUser) =>
fetch(`${URL}/users/${userVisited._id}/${currentUser._id}`, {
    method:'POST',
    headers: {'content-type': 'application/json'}}
  ).then(response => response.json())



export default {
  register,
  login,
  logout,
  profile,
  findRecentNewUsers,
  updateProfile,
  findUserById,
  follow,
  unfollow,
  checkFollowingState,
  findUserByName,
  deleteUser
}