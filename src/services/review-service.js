require('dotenv').config()
const REVIEWS_URL = process.env.REACT_APP_API_URL



const createReview = (drinkId, review) =>
  fetch(`${REVIEWS_URL}/drinks/${drinkId}/review`, {
        method:'post',
        body: JSON.stringify(review),
        headers: {'content-type': 'application/json'}}).then(response =>
    response.json())

const findReviewsForDrink = (drinkId) =>
    fetch(`${REVIEWS_URL}/reviews/${drinkId}`).then(response =>
        response.json())


const findReviewsByCreator = (userId) =>
  fetch(`${REVIEWS_URL}/users/${userId}/reviews`).then(response =>
      response.json())

export const deleteReview = (reviewId) =>
    fetch(`${REVIEWS_URL}/reviews/${reviewId}`, {method:'DELETE'}).then(response => response.json())


export default {
  createReview,
  findReviewsForDrink,
  findReviewsByCreator,
  deleteReview
}