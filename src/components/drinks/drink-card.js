import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import drinkService from "../../services/drink-service";


const DrinkCard = ({drink, setDrinksOfCurrentUser={}, editable=false, currentUser={}}) => {

  const deleteDrink = () => {
    drinkService.deleteDrink(drink._id).then(()=>{
    drinkService.findDrinksByCreator(currentUser._id).then(
        (drinks) => setDrinksOfCurrentUser(drinks))
    })
  }

return(
  <div className='col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 yz-card-div'>
    <div className="card yz-card">
      <img height={250} src={drink.strDrinkThumb}
           className="card-img-top" alt="..."/>
      <div className="card-body">
        <Link to={`/details/${drink._id}`}>
        <h5 className="card-title">{drink.strDrink}</h5></Link>

        {editable!==false &&
            <>
        <Link to={`/profile/drinks/${drink._id}/edit`}>
        <i className='fas fa-edit yz-row-edit'/></Link>

          <button onClick={deleteDrink} type="button"
                  className="btn btn-danger float-right">Delete</button>
        </>
        }
      </div>
    </div>
  </div>
)
}

export default DrinkCard