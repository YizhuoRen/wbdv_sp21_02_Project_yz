import React, {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom";
import reviewService from "../../services/review-service";
import userService from "../../services/user-service";

const ReviewSubmitForm = ({setAddingReviewState, currentUser, createReview}) => {
  const {drinkId} = useParams()
  const [newReview, setNewReview] = useState(
      {drink: drinkId, creator: currentUser._id})


  const [submitSuccessState, setSubmitSuccessState] = useState(false)


  return (
      <>
        {
          !submitSuccessState &&
          <div className="yz-add-review-container">
            <div className="yz-sign-in-box">
              <div className="yz-sign-in-title">
                Review this drink
              </div>
              <div className="yz-sign-in-rows">
                <div className="mb-3 row yz-sign-in-row">
                  <div className="col-sm-10">
                     <textarea rows={10} onChange={event => setNewReview(
                         {...newReview, content: event.target.value})}
                               value={newReview.content}
                               placeholder={"What did you think about this drink? Did you make "
                               + "any changes or notes?"}
                               className="form-control">
                      </textarea>
                  </div>
                </div>
                <div className="mb-3 row yz-sign-in-row">
                  <div className="col-sm-4">
                    <button onClick={() => {
                      createReview(newReview); setSubmitSuccessState(true)
                    }}
                            className="btn btn-primary btn-block yz-create-account-btn"
                            id="button">
                      Submit
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button onClick={() => {
                      setAddingReviewState(false)
                    }}
                            className="btn btn-primary btn-block yz-create-account-btn"
                            id="button">
                      Cancel
                    </button>
                  </div>
                </div>
                <br/>

              </div>
            </div>
          </div>
        }
        {submitSuccessState && <>
          <div className="yz-add-review-container">
            <div className="yz-sign-in-box">
              <div className="yz-sign-in-title">
                Thanks for adding your feedback.
              </div>
              <div className="yz-sign-in-rows">
                <div className="mb-3 row yz-sign-in-row">
                  <div className="col-sm-4">
                    <button onClick={() => setAddingReviewState(false)}
                            className="float-right">Back to drink detail
                    </button>
                  </div>
                </div>
                <br/>

              </div>
            </div>
          </div>
        </>}
      </>)
}

export default ReviewSubmitForm