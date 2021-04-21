import React, {useEffect, useState} from "react"
import {Link, Route, useHistory} from "react-router-dom";
import userService from "../../services/user-service"
import CurrentDrink from "../drinks/current-drink";
import drinkService from "../../services/drink-service"
import DrinkCard from "../drinks/drink-card";
import reviewService from "../../services/review-service";

const Profile = () => {
  const [editing, setEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  const [photoChoice, setPhotoChoice] = useState("");
  const photoAddress1 = "https://cdn1.vectorstock.com/i/1000x1000/69/55/layered-colorful-alcoholic-cocktail-cartoon-vector-19426955.jpg"
  const photoAddress2 = "https://i.pinimg.com/736x/39/67/2e/39672e0c7ce7610243b8bce03f235177.jpg"
  const [drinksOfCurrentUser, setDrinksOfCurrentUser] = useState([]);
  const [reviewsByCurrentUser, setReviewsByCurrentUser] = useState([]);
  const history = useHistory();
  const logout = () => {
    userService.logout().then(response => setCurrentUser(response))
    history.push("/")
  }

  useEffect(() => {
    userService.profile().then(currentUser => {
      setCurrentUser(currentUser);
    })
  }, [])

  const findDrinksByCreator = (currentUser) => {
    drinkService.findDrinksByCreator(currentUser._id).then(
        (drinks) => setDrinksOfCurrentUser(drinks))
  }

  const updateProfile = () => {
    userService.updateProfile(currentUser);
    setEditing(false);
  }

  const getFollowers = () => {
    if (currentUser.username !== undefined) {
      userService.findUserById(currentUser._id).then(
          (user) => setCurrentUser(user)
      )
    }
  }

  const getFollowing = () => {
    if (currentUser.username !== undefined) {
      userService.findUserById(currentUser._id).then(
          (user) => setCurrentUser(user)
      )
    }
  }

  const findReviewsByCurrentUser = () => {
    reviewService.findReviewsByCreator(currentUser._id).then(
        reviewsByCurrentUser => setReviewsByCurrentUser(reviewsByCurrentUser))
  }


  const deleteReview = (reviewId) => {
    reviewService.deleteReview(reviewId).then(()=>
        reviewService.findReviewsByCreator(currentUser._id).then(
            reviewsByCurrentUser => setReviewsByCurrentUser(reviewsByCurrentUser)))
  }

  return (
      <div>
        <h1>Profile</h1>
        {currentUser.username &&
        <div>
          <h3>Welcome {currentUser.username}</h3>
        </div>}
        <div className="container-fluid">
          <div className="row">
            <div className="col col-2 yz-profile-left-column">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/profile`}>
                      <i className="far fa-user"/>
                      &nbsp;&nbsp;User
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link onClick={() => getFollowers()}
                          to={`/profile/user/check/followers`}>
                      <i className="fas fa-user-friends"/>
                      &nbsp;&nbsp;Followers
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link onClick={() => getFollowing()}
                          to={`/profile/user/check/following`}>
                      <i className="fas fa-user-friends"/>
                      &nbsp;&nbsp;Following
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link onClick={() => findDrinksByCreator(currentUser)}
                          to={`/profile/user/check/drinks`}>
                      <i className="fas fa-glass-martini-alt"/>
                      &nbsp;&nbsp;Drinks
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link to={`/profile/user/check/createDrink`}>
                      <i className="far fa-clipboard"/>
                      &nbsp;&nbsp;Create Drink
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link onClick={findReviewsByCurrentUser}
                          to={`/profile/user/check/comments`}>
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
                {currentUser.username !== undefined &&
                <li className="nav-item">
                  <div className="nav-link">
                    <button onClick={logout} className="btn btn-primary">Log out
                    </button>
                  </div>
                </li>}
              </ul>
              <div>
              </div>
            </div>

            <div className="col col-10 yz-profile-right-column">
              <Route path={["/profile"]} exact={true}>
                {currentUser.username !== undefined &&
                <div className="container-fluid yz-profile-message-box">
                  {!editing &&
                  <ul className="list-group">
                    <li className="list-group-item">
                       Profile Picture:
                      <img width={100} src={currentUser.photoAddress} alt=""/>
                    </li>

                    <li className="list-group-item">Username: {currentUser.username}</li>
                    <li
                        className="list-group-item">Email: {currentUser.email}</li>
                    <li
                        className="list-group-item">Address: {currentUser.address} </li>
                  </ul>}
                  {editing &&
                  <div>
                    <ul className="list-group">
                      <li className={`list-group-item
                    ${photoChoice === "1" ? "list-group-item-success" : ""}`}>
                        <label>
                          <input onClick={() => {
                            setPhotoChoice("1"); setCurrentUser(
                                {...currentUser, photoAddress:"https://i.pinimg.com/564x/4e/1c/d4/4e1cd42597f64a7cec2e97c387c47a65.jpg"})
                          }}
                                 type="radio" name={"profilePicture"}/><img width={100}
                            src="https://i.pinimg.com/564x/4e/1c/d4/4e1cd42597f64a7cec2e97c387c47a65.jpg" alt=""/>
                        </label>
                      </li>
                      <li className={`list-group-item
                    ${photoChoice === "2" ? "list-group-item-success" : ""}`}>
                        <label>
                          <input onClick={() => {
                            setPhotoChoice("2") ; setCurrentUser(
                                {...currentUser, photoAddress:"https://i.pinimg.com/736x/39/67/2e/39672e0c7ce7610243b8bce03f235177.jpg"})
                          }}

                                 type="radio" name={"profilePicture"}/><img width={100}
                            src="https://i.pinimg.com/736x/39/67/2e/39672e0c7ce7610243b8bce03f235177.jpg" alt=""/>
                        </label>
                      </li>
                    </ul>


                    <div
                        className="form-control">Username: {currentUser.username}</div>
                    <input onChange={(event) =>
                        setCurrentUser(
                            {...currentUser, email: event.target.value})}
                           className='form-control'
                           value={currentUser.email}/>
                    <input onChange={(event) =>
                        setCurrentUser(
                            {...currentUser, address: event.target.value})}
                           className='form-control'
                           value={currentUser.address}/>
                  </div>}
                  {!editing && <i onClick={() => {
                    setEditing(true);
                  }} className='fas fa-edit yz-row-edit'/>}
                  {editing && <i onClick={() => updateProfile()}
                                 className='fas fa-check yz-row-check'/>}


                  {/*Drinks:*/}
                  {/*<div className='container-fluid'>*/}
                  {/*  <div className='row yz-gird-row'>*/}
                  {/*    {drinksOfCurrentUser.map((drink) =>*/}
                  {/*        <DrinkCard drink={drink}/>*/}
                  {/*    )}*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>}
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}

              </Route>
              <Route path={["/profile/user/check/followers"]} exact={true}>
                {currentUser.username !== undefined &&
                <div>
                  {currentUser.followers.length !== 0 &&
                  <div>
                    <h3>followers:</h3>
                    <ul>
                      {currentUser.followers.map((follower) =>
                          <li>{follower.username}</li>
                      )}
                    </ul>
                  </div>
                  }
                  {currentUser.followers.length === 0 &&
                  <div
                      className="container-fluid  yz-profile-messages-no-content">
                    <h4>You don't have any followers yet
                      Try following other mixer</h4>
                  </div>
                  }
                </div>}
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}
              </Route>
              <Route path={["/profile/user/check/following"]} exact={true}>
                {currentUser.username !== undefined &&
                <div>
                  {currentUser.following.length !== 0 &&
                  <div>
                    <h3>following:</h3>
                    <ul>
                      {currentUser.following.map((singleFollowing) =>
                          <li>{singleFollowing.username}</li>
                      )}
                    </ul>
                  </div>
                  }
                  {currentUser.following.length === 0 &&
                  <h3>no following</h3>
                  }
                </div>}
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}
              </Route>
              <Route path={["/profile/user/check/createDrink"]} exact={true}>
                {currentUser.username !== undefined &&
                <CurrentDrink userId={currentUser._id}/>}
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}
              </Route>
              <Route path={["/profile/user/check/comments"]} exact={true}>
                {currentUser.username !== undefined &&
                <>
                  <h3>This is reviews</h3>
                  <ul className="list-group">
                    {reviewsByCurrentUser.map(review =>
                        <li key={review._id} className="list-group-item">
                          <h6>{review.content}</h6>
                          <br/>
                          <div className="float-right">
                            {review.drink.strDrink}
                            <br/>
                            {review.createdTime}
                          </div>
                          <button onClick={() =>{deleteReview(review._id)}} type="button"
                                  className="btn btn-danger">Delete
                          </button>
                        </li>
                    )}
                  </ul>
                </>
                }
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}
              </Route>
              <Route path={["/profile/user/check/drinks"]} exact={true}>
                {currentUser.username !== undefined &&

                <div className='container-fluid'>
                  {drinksOfCurrentUser.length !== 0 &&
                  <div className='row yz-gird-row'>
                    Your drinks:
                    {drinksOfCurrentUser.map((drink) =>
                        <DrinkCard drink={drink} setDrinksOfCurrentUser={setDrinksOfCurrentUser} currentUser={currentUser}/>
                    )}
                  </div>}
                  {drinksOfCurrentUser.length === 0 &&
                  <div
                      className="container-fluid  yz-profile-messages-no-content">
                    <h4>You don't have any personal cocktail recipes yet.
                      Share your own drink creations! <Link
                          to={"/profile/user/check/createDrink"}>Add a drink
                        recipe</Link></h4>
                  </div>}

                </div>
                }
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}
              </Route>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile