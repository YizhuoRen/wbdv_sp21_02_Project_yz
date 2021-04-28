import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import cocktailService from "../services/cocktail-service"
import drinkService from "../services/drink-service"
import userService from "../services/user-service"
import reviewService from "../services/review-service"
import ReviewSubmitForm from "./reviews/review-submit-form";
import Moment from 'react-moment';

const DetailsScreen = () => {
  const {drinkId} = useParams();
  const history = useHistory();
  const [resultDrink, setResultDrink] = useState({});
  const [creator, SetCreator] = useState({});
  const [reviewsForCurrentDrink, setReviewsForCurrentDrink] = useState([]);
  const [addingReviewState, setAddingReviewState] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    findCocktailById();
    userService.profile().then(currentUser => {
      setCurrentUser(currentUser);
    });
    reviewService.findReviewsForDrink(drinkId).then(reviews =>
        setReviewsForCurrentDrink(reviews))
  }, []);

  const findCocktailById = () => {
      drinkService.findDrinkById(drinkId).then((d) => {
        setResultDrink(d);
        SetCreator(d.creator)}
      )
  }

  const tryAddingNewReview = () => {
    if (currentUser === 0 || currentUser === {}) {
      alert("please login first")
    } else {
      setAddingReviewState(true)
    }
  }

  const createReview = (review) => {
    reviewService.createReview(drinkId,review).then(review => {
      reviewService.findReviewsForDrink(drinkId).then(reviews =>
          setReviewsForCurrentDrink(reviews))
    });
  }

  return (
      <div className='container yz-profile-container'>
        <div className='container'>
        <button onClick={() => {
          history.goBack()
        }}>back
        </button>
        <h2>{resultDrink.strDrink}</h2>
        <p>
          <img className="float-right yz-detail-screen-image" alt=""
               src={resultDrink.strDrinkThumb}/>
        </p>
        <p>Alcoholic: {resultDrink.strAlcoholic}</p>
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
        {resultDrink.strInstructions &&
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
        <br/>
        <div>
          {creator !== {} &&
          <>By:
          <Link to={`/profile/${creator._id}`}>
             &nbsp;&nbsp;
            {creator.username}
          </Link></>}
          {creator === {} &&
          <div>From Website</div>
          }
        </div>
        <br/>
        {creator !== {} &&
        <>
          {currentUser.username !== undefined &&
          <button onClick={() => tryAddingNewReview()} type="button"
                  className="btn btn-danger">Add Review
          </button>}
          {addingReviewState && <ReviewSubmitForm
              setAddingReviewState={setAddingReviewState}
              currentUser={currentUser}
              createReview = {createReview}/>}
          <div>
            <br/>
            <br/>

            <ul className="list-group">
              {
                reviewsForCurrentDrink.map(review =>
                    <li key={review._id} className="list-group-item yz-detail-page-review-li">
                      <h6>{review.content}</h6>
                      <br/>
                      <div className="float-right">
                        <Link to={`/profile/${review.creator._id}`}>
                          {review.creator.username}
                        </Link>
                        <br/>
                        <Moment>
                          {review.createdTime}
                        </Moment>
                      </div>
                    </li>)
              }
            </ul>
            <br/><br/>
          </div>
        </>}
      </div>
      </div>
  )
}

export default DetailsScreen