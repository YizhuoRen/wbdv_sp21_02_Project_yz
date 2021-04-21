import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import drinkService from "../../services/drink-service";


const DrinkCardHome = ({drink}) => {

  return(
      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 yz-card-div'>
        <div className="card yz-card">
          <img height={300} src={drink.strDrinkThumb}
               className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{drink.strDrink}</h5>
            <Link to={`/details/${drink._id}`}
                  className="btn btn-primary">{drink.strDrink}</Link>
          </div>
        </div>
      </div>
  )
}

export default DrinkCardHome