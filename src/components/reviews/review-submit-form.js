import React, {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom";
import reviewService from "../../services/review-service";
import userService from "../../services/user-service";

const ReviewSubmitForm = ({setAddingReviewState, currentUser, setReviewsForCurrentDrink}) => {
  const {drinkId} = useParams()
  const [newReview, setNewReview] = useState(
      {drink: drinkId, creator: currentUser._id})
  const [submitSuccessState, setSubmitSuccessState] = useState(false)
  const createReview = (review) => {
    reviewService.createReview(drinkId,review).then(review => {
      setNewReview(review);
    });
    setSubmitSuccessState(true)
    reviewService.findReviewsForDrink(drinkId).then(reviews =>
        setReviewsForCurrentDrink(reviews))
  }



  return (
      <>
        {
          !submitSuccessState &&
          <div className="container yz-sign-in-container">
            <div className="yz-logo-name">
              funtail
            </div>
            <div className="yz-sign-in-box">
              <div className="yz-sign-in-title">
                Review this drink
              </div>
              <div className="yz-sign-in-rows">
                <div className="mb-3 row yz-sign-in-row">
                  <div className="col-sm-10">
                     <textarea onChange={event => setNewReview(
                         {...newReview, content: event.target.value})}
                               value={newReview.content}
                               placeholder={"What did you think about this drink? Did you make "
                               + "any changes or notes?"}
                               className="form-control">
                      </textarea>
                  </div>
                </div>
                <div className="mb-3 row yz-sign-in-row">
                  <label htmlFor="button" className="col-sm-2"/>
                  <div className="col-sm-10">
                    <button onClick={() => {
                      createReview(newReview)
                    }}
                            className="btn btn-primary btn-block yz-create-account-btn"
                            id="button">
                      Submit
                    </button>
                  </div>
                </div>
                <div className="mb-3 row yz-sign-in-row">
                  <label className="col-sm-2"/>
                  <div className="col-sm-10">
                    <button onClick={() => setAddingReviewState(false)}
                            className="float-right">Back to drink detail
                    </button>
                  </div>
                </div>
                <br/>

              </div>
            </div>
          </div>
        }
        {submitSuccessState && <>
          <div className="container yz-sign-in-container">
            <div className="yz-logo-name">
              funtail
            </div>
            <div className="yz-sign-in-box">
              <div className="yz-sign-in-title">
                Thanks for adding your feedback.
              </div>
              <div className="yz-sign-in-rows">
                <div className="mb-3 row yz-sign-in-row">
                  <div className="col-sm-10"></div>
                </div>
                <div className="mb-3 row yz-sign-in-row">
                  <label className="col-sm-2"/>
                  <div className="col-sm-10">
                    <button onClick={() => setAddingReviewState(false)}
                            className="float-right">Back to drink detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}
      </>)
}

export default ReviewSubmitForm