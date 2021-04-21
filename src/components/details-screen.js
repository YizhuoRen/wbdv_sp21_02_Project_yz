import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import cocktailService from "../services/cocktail-service"
import drinkService from "../services/drink-service"
import userService from "../services/user-service"
import reviewService from "../services/review-service"
import ReviewSubmitForm from "./reviews/review-submit-form";

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
      setCurrentUser(currentUser)
    });
    reviewService.findReviewsForDrink(drinkId).then(reviews =>
        setReviewsForCurrentDrink(reviews))
  }, []);

  const findCocktailById = () => {
    cocktailService.findCocktailById(drinkId).then(
        (data) => setResultDrink(data.drinks[0]))
    if (resultDrink._id === undefined) {
      drinkService.findDrinkById(drinkId).then((drink) => {
        setResultDrink(drink);
        userService.findUserById(drink.creator).then((creator) => {
          SetCreator(creator)
        })
      });
    }
  }

  const tryAddingNewReview = () => {
    if (currentUser === 0) {
      alert("please login first")
    } else {
      setAddingReviewState(true)
    }
  }

  return (
      <div className='container-fluid yz-detail-screen-container'>
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
        {creator &&
        <div>
          Creator: &nbsp;&nbsp;
          <Link to={`/profile/${creator._id}`}>
            {creator.username}
          </Link>
        </div>
        }
        <br/>
        <button onClick={() => tryAddingNewReview()} type="button"
                className="btn btn-danger">Add Review
        </button>
        {addingReviewState && <ReviewSubmitForm
            setAddingReviewState={setAddingReviewState}
            currentUser={currentUser}
            setReviewsForCurrentDrink={setReviewsForCurrentDrink}/>}
        <div>
          <br/>
          <br/>
          <h3>Reviews:</h3>
          <ul className="list-group">
            {reviewsForCurrentDrink.map(review =>
                <li key={review._id} className="list-group-item">
                  <h6>{review.content}</h6>
                  <br/>
                  <div className="float-right">
                    {review.creator.username}
                    <br/>
                    {review.createdTime}
                  </div>

                </li>)}
          </ul>
        </div>
      </div>
  )
}

export default DetailsScreen