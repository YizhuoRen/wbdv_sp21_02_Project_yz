const findCocktailsByName = (name) => {
 return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then(response => response.json())
}

const findCocktailById = (drinkId) => {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`).then(response =>
  response.json())
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  findCocktailsByName,
  findCocktailById
}