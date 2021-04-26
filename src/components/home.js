import React, {useEffect, useState} from 'react'
import {Link, Route} from "react-router-dom";
import userService from "../services/user-service";
import drinkService from "../services/drink-service";
import reviewService from "../services/review-service";
import DrinkCardHome from "./drinks/drink-card-home";
import UserCard from "./users/users-card";
import ReviewCardHome from "./reviews/review-card-home";

export default () => {
  const [drinks, setDrinks] = useState([]);
  const [newUsers, settNewUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [drinksOfCurrentUser, setDrinksOfCurrentUser] = useState([]);
  const [reviewsOfCurrentUser, setReviewsOfCurrentUser] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  useEffect(() => {
    userService.profile().then(user => {
        setCurrentUser(user);
      if (user.username !== undefined) {
        reviewService.findReviewsByCreator(user._id).then((reviews) =>
          setReviewsOfCurrentUser(reviews)
        )
      }
    });
    drinkService.findDrinksOfRecent().then(
        (drinks) => setDrinks(drinks));
    userService.findRecentNewUsers().then(
        (newUsers) => settNewUsers(newUsers));
  }, [])


  return(
  <div className="yz-major-container-home">
    <nav className="navbar navbar-expand-lg navbar-light yz-home-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Funtail</Link>
        <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-label="Toggle navigation"
                aria-expanded={!isNavCollapsed ? true : false}
                onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"/>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}  id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/search/">
                Search
              </Link>
            </li>
            {currentUser.username === undefined &&
                <>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Sign in
              </Link>
            </li>
            </>
            }
            {currentUser !== {} && currentUser.username !== undefined &&
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>

    <div className="yz-home-title text-center">FunTail - A World of Drinks Recipes</div>
    <div className="yz-home-description text-center">From cocktails to punch for kids, <br/>
    find the perfect party drink. <br/>Plus photos, and reviews to help you mix drinks right.</div>


    {currentUser.username !== undefined  && reviewsOfCurrentUser.length > 0 &&
        <div className="container-fluid">
    <div className="container-fluid yz-home-card-group">
      <div className='row yz-gird-row'>
        {reviewsOfCurrentUser.map((review) =>
            <ReviewCardHome review={review}/>
        )}
      </div></div>
    </div>}

    <div className="container-fluid yz-home-card-group">
        <div className='row yz-gird-row'>
          {drinks.map((drink) =>
              <DrinkCardHome drink={drink}/>
          )}
      </div>
    </div>
    <div className="container-fluid">
    <div className="yz-home-card-group">
      <div className='row yz-row-users-home'>
      {newUsers.map((newUser) => {
            if (newUser.username !== currentUser.username) {
              return (
                  <UserCard user={newUser}/>)
            }
          }
      )}
      </div>
    </div>
    </div>
    <br/>
    <div className="container-fluid font-italic">
      <div className="float-right">
      <Link to="/privacyPolicy">
      <h6>Privacy Policy</h6></Link>
      </div>
    </div>
    <br/>
  </div>)
}