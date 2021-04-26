const DRINKS_URL = "http://localhost:4000/api/users"
const DRINKS_URL2 = "http://localhost:4000/api/drinks"

const createDrink = (userId, newDrink) =>  fetch(`${DRINKS_URL2}/${userId}/drink`, {
        method: 'post',
        credentials: "include",
        body: JSON.stringify(newDrink),
        headers: {'content-type': 'application/json'}
      }).then(response => response.json())

export const deleteDrink = (drinkId) =>
    fetch(`${DRINKS_URL2}/${drinkId}`, {method:'DELETE'}).then(response => response.json())

const findDrinksByCreator = (userId) => {
  return (
      fetch(`${DRINKS_URL}/${userId}/drinks`).then(response => response.json())
  )
}

const updateDrink = (updatedDrink) =>
    fetch(`${DRINKS_URL2}/${updatedDrink._id}`, {
      method: 'put',
      body: JSON.stringify(updatedDrink),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())

const findDrinkById = (id) => {
  return (
      fetch(`http://localhost:4000/api/drinks/${id}`,
          {
            method: 'post',
            headers: {'content-type': 'application/json'}
          }).then(
          response => response.json())
  )
}

const findDrinksOfRecent = () => {
  return (
      fetch(`http://localhost:4000/api/drinks`,
          {
            method: 'post',
            headers: {'content-type': 'application/json'}
          }
      ).then(response => response.json())
  )
}

const findTotalDrinkByName = (drinkName) => fetch(`http://localhost:4000/api/totalDrinks/name/${drinkName}`,
    {
      method: 'post',
      headers: {'content-type': 'application/json'}
    }).then(
    response => response.json())

const findDrinkByName = (drinkName) => fetch(`http://localhost:4000/api/drinks/name/${drinkName}`,
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

// findDrinksByCreator,
//     findAllDrinks,
//     findDrinksByName,
//     createDrink,
//     deleteDrink
