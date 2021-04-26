const REVIEWS_URL = "http://localhost:4000/api/drinks"
const REVIEWS_URL2 = "http://localhost:4000/api/users"
const REVIEWS_URL3 = "http://localhost:4000/api/reviews"

const createReview = (drinkId, review) =>
  fetch(`${REVIEWS_URL}/${drinkId}/review`, {
        method:'post',
        body: JSON.stringify(review),
        headers: {'content-type': 'application/json'}}).then(response =>
    response.json())

const findReviewsForDrink = (drinkId) =>
    fetch(`${REVIEWS_URL3}/${drinkId}`).then(response =>
        response.json())


const findReviewsByCreator = (userId) =>
  fetch(`${REVIEWS_URL2}/${userId}/reviews`).then(response =>
      response.json())

export const deleteReview = (reviewId) =>
    fetch(`${REVIEWS_URL3}/${reviewId}`, {method:'DELETE'}).then(response => response.json())


export default {
  createReview,
  findReviewsForDrink,
  findReviewsByCreator,
  deleteReview
}