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
          <img width={400} className="float-right" src={resultDrink.strDrinkThumb}/>
        </p>
        <div>
          {resultDrink.strInstructions}
        </div>

      </div>
  )
 }

 export default DetailsScreen