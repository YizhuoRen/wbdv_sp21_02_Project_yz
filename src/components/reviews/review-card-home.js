import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import drinkService from "../../services/drink-service";


const ReviewCardHome = ({review, deleteReview}) => {
  return(
      <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12'>
        <div className="card" >
          <Link to={`/details/${review.drink._id}`} rel="stylesheet">
          <img height={300} src={review.drink.strDrinkThumb} className="card-img-top" alt="..."/>
          </Link>
            <div className="card-body">
              <p rows={10} className="card-text">{review.content}</p>
              <br/>
              <button onClick={() => {
                deleteReview(review._id)
              }} type="button"
                      className="btn btn-danger">Delete
              </button>
            </div>
        </div>
      </div>
  )
}



export default ReviewCardHome