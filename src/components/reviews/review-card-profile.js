import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import drinkService from "../../services/drink-service";


const ReviewCardProfile = ({review, deleteReview}) => {
  return(
      <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 yz-card-div'>
        <div className="card">
          <Link to={`/details/${review.drink._id}`} rel="stylesheet">
            <img src={review.drink.strDrinkThumb} className="card-img-top" alt="..."/>
          </Link>
          <div className="card-body">
            <Link to={`/details/${review.drink._id}`} rel="stylesheet">
            {review.drink.strDrink}
            </Link>
            <p rows={10} className="card-text">{review.content}</p>
            {deleteReview!=={} &&
            <button onClick={() => deleteReview(review._id)} type="button"
                    className="btn btn-danger">Delete</button>
            }
          </div>
        </div>
        <br/><br/>
      </div>
  )
}



export default ReviewCardProfile