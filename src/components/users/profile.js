import React, {useEffect, useState} from "react"
import {Link, Route, useHistory} from "react-router-dom";
import userService from "../../services/user-service"
import CurrentDrink from "../drinks/current-drink";
import drinkService from "../../services/drink-service"
import DrinkCard from "../drinks/drink-card";
import reviewService from "../../services/review-service";
import UserCard from "./users-card";
import FollowersCard from "./followers-card";
import ReviewCardHome from "../reviews/review-card-home";
import ReviewCardProfile from "../reviews/review-card-profile";

const Profile = () => {
  const [editing, setEditing] = useState(false)
  const [active, setActive] = useState("activeUser")
  const [currentUser, setCurrentUser] = useState({});
  const [photoChoice, setPhotoChoice] = useState("");
  const [drinksOfCurrentUser, setDrinksOfCurrentUser] = useState([]);
  const [reviewsByCurrentUser, setReviewsByCurrentUser] = useState([]);
  const [showContent, setShowContent] = useState("USER")
  const history = useHistory();
  const logout = () => {
    userService.logout().then(response => setCurrentUser(response))
    history.push("/")
  }

  useEffect(() => {
    userService.profile().then(currentUser => {
      setCurrentUser(currentUser);
    });
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
      // alert(JSON.stringify(currentUser.id))
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
    reviewService.deleteReview(reviewId).then(() =>
        reviewService.findReviewsByCreator(currentUser._id).then(
            reviewsByCurrentUser => setReviewsByCurrentUser(
                reviewsByCurrentUser)))
  }

  return (
      <div className="container yz-profile-container">
        {currentUser.username === undefined &&
        <>
          <div className="alert alert-warning alert-dismissible fade show"
               role="alert">
            <strong>Hoops!</strong> Please <strong><a href="/login"> log in </a></strong>first!
            <br/>
            <br/>
            <a href="/"> Home </a>
          </div>

        </>
        }

        {currentUser.username &&
        <>
         <br/>
          <div className="float-right font-italic">
            <h6>Welcome, <strong>{currentUser.username}</strong></h6>
          </div>
          <br/>


          {/*
           (***************left nav part*****************)
           */}

          <div className="container-fluid">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <div className={`nav-link ${active==="activeUser" ? 'active':''}`}>
                      <a onClick={() => {setShowContent("USER"); setActive("activeUser")}}
                            to={`/profile`}>
                        <i className="far fa-user"/>
                        &nbsp;&nbsp;User
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className={`nav-link ${active==="activeFollowers" ? 'active':''}`}>
                      <Link onClick={() => {
                        setShowContent("FOLLOWERS");
                        getFollowers(); setActive("activeFollowers")
                      }} to={`/profile`}>
                        <i className="fas fa-user-friends"/>
                        &nbsp;&nbsp;Followers
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className={`nav-link ${active==="activeFollowing" ? 'active':''}`}>
                      <Link onClick={() => {
                        setShowContent("FOLLOWING");
                        getFollowing();setActive("activeFollowing")
                      }}
                            to={`/profile`}>
                        <i className="fas fa-user-friends"/>
                        &nbsp;&nbsp;Following
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className={`nav-link ${active==="activeDrinks" ? 'active':''}`}>
                      <Link onClick={() => {
                        setShowContent("DRINKS");
                        findDrinksByCreator(currentUser);setActive("activeDrinks")
                      }}
                            to={`/profile`}>
                        <i className="fas fa-glass-martini-alt"/>
                        &nbsp;&nbsp;Drinks
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className={`nav-link ${active==="activeCreateDrinks" ? 'active':''}`}>
                      <Link onClick={() => {setShowContent("CREATE_DRINK"); setActive("activeCreateDrinks")}}
                            to={`/profile`}>
                        <i className="far fa-clipboard"/>
                        &nbsp;&nbsp;Create Drink
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className={`nav-link ${active==="activeReviews" ? 'active':''}`}>
                      <Link onClick={() => {
                        setShowContent("REVIEWS");
                        findReviewsByCurrentUser();
                        setActive("activeReviews")
                      }}
                            to={`/profile`}>
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
                  <li className="nav-item">
                    <div className="nav-link">
                      <Link onClick={logout}>Log
                        out
                      </Link>
                    </div>
                  </li>
                </ul>

              {/*
               (***************right part*****************)
              */}


              <div className="yz-profile-content-box">
                {/*
               (***************user part*****************)
              */}
                {showContent === "USER" &&
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
                            setPhotoChoice("1");
                            setCurrentUser(
                                {
                                  ...currentUser,
                                  photoAddress: "https://i.pinimg.com/564x/4e/1c/d4/4e1cd42597f64a7cec2e97c387c47a65.jpg"
                                })
                          }}
                                 type="radio" name={"profilePicture"}/><img
                            width={100}
                            src="https://i.pinimg.com/564x/4e/1c/d4/4e1cd42597f64a7cec2e97c387c47a65.jpg"
                            alt=""/>
                        </label>
                      </li>
                      <li className={`list-group-item
                      ${photoChoice === "2" ? "list-group-item-success" : ""}`}>
                        <label>
                          <input onClick={() => {
                            setPhotoChoice("2");
                            setCurrentUser(
                                {
                                  ...currentUser,
                                  photoAddress: "https://i.pinimg.com/736x/39/67/2e/39672e0c7ce7610243b8bce03f235177.jpg"
                                })
                          }}

                                 type="radio" name={"profilePicture"}/><img
                            width={100}
                            src="https://i.pinimg.com/736x/39/67/2e/39672e0c7ce7610243b8bce03f235177.jpg"
                            alt=""/>
                        </label>
                      </li>
                    </ul>

                    <input onChange={(event) =>
                        setCurrentUser(
                            {...currentUser, email: event.target.value})}
                           className='form-control'
                           placeholder="Please input your email"
                           value={currentUser.email}/>
                    <input onChange={(event) =>
                        setCurrentUser(
                            {...currentUser, address: event.target.value})}
                           placeholder="Please input your address"
                           className='form-control'
                           value={currentUser.address}/>
                  </div>
                  }
                  {!editing && <i onClick={() => {
                    setEditing(true);
                  }} className='fas fa-edit yz-row-edit'/>}
                  {editing && <i onClick={() => updateProfile()}
                                 className='fas fa-check yz-row-check'/>}
                </div>
                }


                {/*
               (***************followers part*****************)
              */}
                {showContent === "FOLLOWERS" &&
                <div>
                  {currentUser.followers.length !== 0 &&
                  <div>
                    <ul>
                      {currentUser.followers.map((follower) =>
                          <FollowersCard currentUser={currentUser} user={follower}/>
                      )}
                    </ul>
                  </div>
                  }
                  {currentUser.followers.length === 0 &&
                  <div
                      className="container-fluid  yz-profile-messages-no-content">
                    <h4>You don't have any followers yet <br/>
                      Try following other mixers.</h4>
                  </div>
                  }
                </div>
                }

                {/*
               (***************following part*****************)
              */}
                {showContent === "FOLLOWING" &&
                <div>
                  {currentUser.following.length !== 0 &&
                  <div>
                    <ul>
                      {currentUser.following.map((singleFollowing) => {
                         return( <FollowersCard currentUser={currentUser} user={singleFollowing}/>
                         )
                      }
                      )}
                    </ul>
                  </div>
                  }
                  {currentUser.following.length === 0 &&
                  <div
                      className="container-fluid  yz-profile-messages-no-content">
                    <h4>You're not following any mixers yet <br/>
                      Tap to follow a mixer's activity,<br/>
                      such as when they make a cocktail recipe.</h4>
                  </div>
                  }
                </div>
                }

                {/*
               (***************CREATE DRINK part*****************)
              */}
                {showContent === "CREATE_DRINK" &&
                <CurrentDrink setActive={setActive} setShowContent={setShowContent} userId={currentUser._id}/>
                }


                {/*
               (***************REVIEWS part*****************)
              */}
                {showContent === "REVIEWS" &&
                <>
                    <br/><br/>
                    {reviewsByCurrentUser.map(review =>
                        <ReviewCardProfile review={review} deleteReview={deleteReview}/>
                    )}
                </>
                }

                {/*
               (***************DRINKS part*****************)
              */}
                {showContent === "DRINKS" &&
                <div className='container-fluid'>
                  {drinksOfCurrentUser.length !== 0 &&
                      <>
                  <div className='row yz-gird-row'>
                    {drinksOfCurrentUser.map((drink) =>
                        <DrinkCard drink={drink}
                                   setDrinksOfCurrentUser={setDrinksOfCurrentUser}
                                   currentUser={currentUser}
                                   editable={true}/>
                    )}
                  </div>
                      </>
                  }
                  {drinksOfCurrentUser.length === 0 &&
                  <div
                      className="container-fluid  yz-profile-messages-no-content">
                    <h4>You don't have any personal cocktail recipes yet.
                      Share your own drink creations! <Link
                          onClick={() => setShowContent("CREATE_DRINK")}
                          to={`/profile`}>Add a drink
                        recipe</Link></h4>
                  </div>}
                </div>
                }
          </div>
          </div>
        </>}

      </div>
  )
}

export default Profile