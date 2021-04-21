import React, {useEffect, useState} from "react"
import {Link, Route, useHistory, useParams} from "react-router-dom";
import userService from "../../services/user-service"
import CurrentDrink from "../drinks/current-drink";
import drinkService from "../../services/drink-service"
import DrinkCard from "../drinks/drink-card";

const VisitingProfile = () => {
  const {userId} = useParams();
  const [userVisited, setUserVisited] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [drinksOfUserVisited, setDrinksOfUserVisited] = useState([]);

  useEffect(() => {
        userService.findUserById(userId).then((user) => {
          setUserVisited(user)
        });
        userService.profile().then(currentUser => {
          setCurrentUser(currentUser)
        })
      }
      , [])

  const findDrinksByCreator = (currentUser) => {
    drinkService.findDrinksByCreator(currentUser._id).then(
        (drinks) => setDrinksOfUserVisited(drinks))
  }

  const follow = () => {
    if (currentUser === 0) {
      alert("please login first")
    }
    if (userVisited.followers.includes(currentUser._id)) {
      alert("already followed")
    }
    else {
      userService.follow(userVisited, currentUser).then((result) => {
        alert("follow success")
      })
    }
  }

  return (
      <div>
        <h1>Profile of {userVisited.username}</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-2 yz-profile-left-column">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/profile/${userVisited._id}`}>
                      <i className="far fa-user"/>
                      &nbsp;&nbsp;User
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/profile/${userVisited._id}/followers`}>
                      <i className="fas fa-user-friends"/>
                      &nbsp;&nbsp;Followers
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/profile/${userVisited._id}/following`}>
                      <i className="fas fa-user-friends"/>
                      &nbsp;&nbsp;Following
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link onClick={() => findDrinksByCreator(userVisited)}
                          to={`/profile/${userVisited._id}/drinks`}>
                      <i className="fas fa-glass-martini-alt"/>
                      &nbsp;&nbsp;Drinks
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/profile/${userVisited._id}/comments`}>
                      <i className="far fa-comment"/>
                      &nbsp;&nbsp;Reviews
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/`}>
                      <i className="fas fa-home"/>
                      &nbsp;&nbsp;Home
                    </Link>
                  </div>
                </li>
              </ul>
              <div>
              </div>
            </div>

            <div className="col col-10 yz-profile-right-column">
              <Route path={["/profile/:userId"]} exact={true}>
                <div className="container-fluid yz-profile-message-box">
                  <div>
                    <div
                        className="form-control">Username: {userVisited.username}</div>
                    <br/>
                    <div
                        className="form-control">Email: {userVisited.email}</div>
                    <br/>
                    <div
                        className="form-control">Address: {userVisited.address} </div>
                    <br/>
                    <button onClick={() => follow()} type="button"
                            className="btn btn-primary btn-sm">Follow
                    </button>
                  </div>

                  {/*Drinks:*/}
                  {/*<div className='container-fluid'>*/}
                  {/*  <div className='row yz-gird-row'>*/}
                  {/*    {drinksOfCurrentUser.map((drink) =>*/}
                  {/*        <DrinkCard drink={drink}/>*/}
                  {/*    )}*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </Route>
              <Route path={["/profile/:userId/followers"]} exact={true}>
                this is followers
              </Route>
              <Route path={["/profile/:userId/following"]} exact={true}>
                this is following
              </Route>
              <Route path={["/profile/:userId/comments"]} exact={true}>
                this is comments
              </Route>
              <Route path={["/profile/:userId/drinks"]} exact={true}>
                Drinks:
                <div className='container-fluid'>
                  <div className='row yz-gird-row'>
                    {drinksOfUserVisited.map((drink) =>
                        <DrinkCard drink={drink}/>
                    )}
                  </div>
                </div>
              </Route>
            </div>
          </div>
        </div>
      </div>
  )
}

export default VisitingProfile