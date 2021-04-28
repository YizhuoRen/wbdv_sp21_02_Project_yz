require('dotenv').config()
const DRINKS_URL = process.env.REACT_APP_API_URL

const createDrink = (userId, newDrink) =>  fetch(`${DRINKS_URL}/drinks/${userId}/drink`, {
        method: 'post',
        credentials: "include",
        body: JSON.stringify(newDrink),
        headers: {'content-type': 'application/json'}
      }).then(response => response.json())

export const deleteDrink = (drinkId) =>
    fetch(`${DRINKS_URL}/drinks/${drinkId}`, {method:'DELETE'}).then(response => response.json())

const findDrinksByCreator = (userId) => {
  return (
      fetch(`${DRINKS_URL}/users/${userId}/drinks`).then(response => response.json())
  )
}

const updateDrink = (updatedDrink) =>
    fetch(`${DRINKS_URL}/drinks/${updatedDrink._id}`, {
      method: 'put',
      body: JSON.stringify(updatedDrink),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())

const findDrinkById = (id) => {
  return (
      fetch(`${DRINKS_URL}/drinks/${id}`,
          {
            method: 'post',
            headers: {'content-type': 'application/json'}
          }).then(
          response => response.json())
  )
}

const findDrinksOfRecent = () => {
  return (
      fetch(`${DRINKS_URL}/drinks`,
          {
            method: 'post',
            headers: {'content-type': 'application/json'}
          }
      ).then(response => response.json())
  )
}

const findTotalDrinkByName = (drinkName) => fetch(`${DRINKS_URL}/totalDrinks/name/${drinkName}`,
    {
      method: 'post',
      headers: {'content-type': 'application/json'}
    }).then(
    response => response.json())

const findDrinkByName = (drinkName) => fetch(`${DRINKS_URL}/drinks/name/${drinkName}`,
    {
      method: 'post',
      headers: {'content-type': 'application/json'}
    }).then(
    response => response.json())



export default {
  createDrink,
  findDrinksByCreator,
  findDrinkById,
  findDrinksOfRecent,
  deleteDrink,
  findDrinkByName,
  updateDrink,
  findTotalDrinkByName
};

