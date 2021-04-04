 import React, {useState, useEffect} from 'react'
 import {useHistory, useParams} from 'react-router-dom'
 import cocktailService from "../services/cocktail-service"

 const DetailsScreen = () => {
  const {drinkId} = useParams();
  const history = useHistory();
  const [resultDrink, setResultDrink] = useState({});
  useEffect(()=> {findCocktailById()
    }, []);
  const findCocktailById = () => {
    cocktailService.findCocktailById(drinkId).then((data) => setResultDrink(data.drinks[0]))
  }
  return(
      <div className='container-fluid yz-detail-screen-container'>
          <button onClick={() => {
            history.goBack()
          }}>back</button>
          <h2>{resultDrink.strDrink}</h2>
        <p>
          <img className="float-right yz-detail-screen-image" src={resultDrink.strDrinkThumb}/>
        </p>
        <p>type: {resultDrink.strAlcoholic}</p>
        <ul>
          {resultDrink.strIngredient1 &&
          <li>
            {resultDrink.strIngredient1}
          </li>
          }
          {resultDrink.strIngredient2 &&
          <li>
            {resultDrink.strIngredient2}
          </li>
          }
          {resultDrink.strIngredient3 &&
          <li>
            {resultDrink.strIngredient3}
          </li>
          }
          {resultDrink.strIngredient4 &&
          <li>
            {resultDrink.strIngredient4}
          </li>
          }
          {resultDrink.strIngredient5 &&
          <li>
            {resultDrink.strIngredient5}
          </li>
          }
          {resultDrink.strIngredient6 &&
          <li>
            {resultDrink.strIngredient6}
          </li>
          }
          {resultDrink.strIngredient7 &&
          <li>
            {resultDrink.strIngredient7}
          </li>
          }
          {resultDrink.strIngredient8 &&
          <li>
            {resultDrink.strIngredient8}
          </li>
          }
          {resultDrink.strIngredient9 &&
          <li>
            {resultDrink.strIngredient9}
          </li>
          }
          {resultDrink.strIngredient10 &&
          <li>
            {resultDrink.strIngredient10}
          </li>
          }
          {resultDrink.strIngredient11 &&
          <li>
            {resultDrink.strIngredient11}
          </li>
          }
          {resultDrink.strIngredient12 &&
          <li>
            {resultDrink.strIngredient12}
          </li>
          }
          {resultDrink.strIngredient13 &&
          <li>
            {resultDrink.strIngredient13}
          </li>
          }
          {resultDrink.strIngredient14 &&
          <li>
            {resultDrink.strIngredient14}
          </li>
          }
          {resultDrink.strIngredient15 &&
          <li>
            {resultDrink.strIngredient15}
          </li>
          }
        </ul>
        { resultDrink.strInstructions &&
          <div>
            {resultDrink.strInstructions}
          </div>
        }
        {resultDrink.strInstructionsES &&
        <div>
          {resultDrink.strInstructionsES}
        </div>
        }
        {resultDrink.strInstructionsDE &&
        <div>
          {resultDrink.strInstructionsDE}
        </div>
        }
        {resultDrink.strInstructionsFR &&
        <div>
          {resultDrink.strInstructionsFR}
        </div>
        }
        {resultDrink.strInstructionsIT &&
        <div>
          {resultDrink.strInstructionsIT}
        </div>
        }

      </div>
  )
 }

 export default DetailsScreen