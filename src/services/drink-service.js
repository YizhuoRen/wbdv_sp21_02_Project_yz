const DRINKS_URL = "http://localhost:4000/api/users"
const DRINKS_URL2 = "http://localhost:4000/api/drinks"

const createDrink = (userId, newDrink) => {
  return (
      fetch(`${DRINKS_URL}/${userId}/drink`, {
        method: 'post',
        credentials: "include",
        body: JSON.stringify(newDrink),
        headers: {'content-type': 'application/json'}
      }).then(response => response.json())
  )
}
export const deleteDrink = (drinkId) =>
    fetch(`${DRINKS_URL2}/${drinkId}`, {method:'DELETE'}).then(response => response.json())

const findDrinksByCreator = (userId) => {
  return (
      fetch(`${DRINKS_URL}/${userId}/drinks`).then(response => response.json())
  )
}

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

export default {
  createDrink,
  findDrinksByCreator,
  findDrinkById,
  findDrinksOfRecent,
  deleteDrink,
};

// findDrinksByCreator,
//     findAllDrinks,
//     findDrinksByName,
//     createDrink,
//     deleteDrink
