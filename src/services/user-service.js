require('dotenv').config()
const URL = process.env.REACT_APP_API_URL


const login = (credentials) => {
  return fetch(`${URL}/users/login`, {
    method:'post',
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {'content-type': 'application/json'}}).then(response => response.json())
}


const register = (credentials) =>
    fetch(`${URL}/users/register`, {
      method:'post',
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: {'content-type': 'application/json'}}).then(response => response.json())

const profile = () => {
  return fetch(`${URL}/users/profile`, {method: "post", credentials: "include"}).then((response) =>
  response.json())
}

const logout = () => {
  return fetch(`${URL}/users/logout`, {
    method:'post',
    credentials: "include"}).then(response => response.json())
}

const findRecentNewUsers= () => {
  return fetch(`${URL}/users/new`, {
    method:'post'}).then(response => response.json())
}

const updateProfile = (user) => {
  return fetch(`${URL}/users/update`, {
    method:'post',
    credentials: "include",
    body: JSON.stringify(user),
    headers: {'content-type': 'application/json'}},
      ).then(response => response.json())
}

const findUserById = (userId) => {
  return fetch(`${URL}/users/user/${userId}`,{
    method:'post'}
  ).then(response => response.json())
}

const findUserByName = (username) => {
  return fetch(`${URL}/users/username/${username}`
  ).then(response => response.json())
}


const deleteUser = (userId) => fetch(`${URL}/users/${userId}`,
      {method: 'delete',  headers: {'content-type': 'application/json'}}
  ).then(response => response.json())

const follow = (userVisited, currentUser) => {
  return fetch(`${URL}/users/follow/${userVisited._id}/${currentUser._id}`, {
    method:'post',
    headers: {'content-type': 'application/json'}},
  ).then(response => response.json())
}


const unfollow = (userVisited, currentUser) => fetch(`${URL}/users/unfollow/${userVisited._id}/${currentUser._id}`, {
    method:'post',
    headers: {'content-type': 'application/json'}}
  ).then(response => response.json())



const checkFollowingState = (userVisited, currentUser) =>
fetch(`${URL}/users/${userVisited._id}/${currentUser._id}`, {
    method:'post',
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