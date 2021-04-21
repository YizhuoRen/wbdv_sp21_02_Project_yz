import React, {useEffect, useState} from 'react'
import {Link, Route} from "react-router-dom";
import userService from "../services/user-service";
import drinkService from "../services/drink-service";
import DrinkCardHome from "./drinks/drink-card-home";
import UserCard from "./users/users-card";

export default () => {
  const [drinks, setDrinks] = useState([]);
  const [newUsers, settNewUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    userService.profile().then(currentUser => {
        drinkService.findDrinksOfRecent().then(
            (drinks) => setDrinks(drinks));
        userService.findRecentNewUsers().then(
            (newUsers) => settNewUsers(newUsers))
    });
    userService.profile().then(currentUser => {
      setCurrentUser(currentUser);
    })
  }, [])


  return(
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Funtail</Link>
        <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/search/">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/details">
                Details
              </Link>
            </li>
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
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="container-fluid yz-home-user-group">
      <ul className="list-group list-group-flush">
        {newUsers.map((newUser) => {
              if (newUser.username !== currentUser.username) {
                return (
                    <UserCard user={newUser}/>)
              }
            }
        )}
      </ul>
    </div>
    <div className="yz-home-title">FunTail - A World of Drinks Recipes</div>
    <div className="yz-home-description">From cocktails to punch for kids, <br/>
    find the perfect party drink. <br/>Plus photos, and reviews to help you mix drinks right.</div>
    <div className="container-fluid yz-home-card-group">
        <div className='row yz-gird-row'>
          {drinks.map((drink) =>
              <DrinkCardHome drink={drink}/>
          )}
      </div>

    </div>
  </div>)
}