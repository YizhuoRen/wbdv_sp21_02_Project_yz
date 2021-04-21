import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import drinkService from "../../services/drink-service";


const DrinkCard = ({drink, setDrinksOfCurrentUser, currentUser}) => {

  const deleteDrink = () => {
    drinkService.deleteDrink(drink._id).then(()=>{
    drinkService.findDrinksByCreator(currentUser._id).then(
        (drinks) => setDrinksOfCurrentUser(drinks))
    })
  }

return(
  <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 yz-card-div'>
    <div className="card yz-card">
      <img height={200} src={drink.strDrinkThumb}
           className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{drink.strDrink}</h5>
        <Link to={`/details/${drink._id}`}
              className="btn btn-primary">{drink.strDrink}</Link>
        <button onClick={deleteDrink} type="button"
                className="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
)
}

export default DrinkCard