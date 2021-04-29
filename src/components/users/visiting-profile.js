import React, {useEffect, useState} from "react"
import {Link, Route, useHistory, useParams} from "react-router-dom";
import userService from "../../services/user-service"
import CurrentDrink from "../drinks/current-drink";
import drinkService from "../../services/drink-service"
import DrinkCard from "../drinks/drink-card";
import reviewService from "../../services/review-service";
import ReviewCardHome from "../reviews/review-card-home";
import FollowersCard from "./followers-card";
import ReviewCardProfile from "../reviews/review-card-profile";

const VisitingProfile = () => {
  const {userId} = useParams();
  const [active, setActive] = useState("activeUser")
  const [userVisited, setUserVisited] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [drinksOfUserVisited, setDrinksOfUserVisited] = useState([]);
  const [reviewsOfUserVisited, setReviewsOfUserVisited] = useState([]);
  const [showContent, setShowContent] = useState("USER")
  const [followingState, setFollowingState] = useState(false)

  useEffect(() => {
        userService.findUserById(userId).then((user) => {
          setUserVisited(user);
          setActive("activeUser")
          setShowContent("USER");
          userService.profile().then(currentUser => {
            setCurrentUser(currentUser)
            checkFollowingState(user, currentUser);
          });
        });
      }
      , [userId])

  const checkFollowingState = (userVisited, currentUser) => {
    userService.checkFollowingState(userVisited, currentUser).then(result => {
      if (result === 1) {
        setFollowingState(true);
      } else {
        setFollowingState(false);
      }
    })
  }

  const findDrinksByCreator = (userVisited) => {
    drinkService.findDrinksByCreator(userVisited._id).then(
        (drinks) => setDrinksOfUserVisited(drinks))
  }

  const follow = () => {
    if (currentUser === 0 || currentUser.username === undefined) {
      alert("please login first")
    }
    else {
      userService.follow(userVisited, currentUser).then((result) => {
        setFollowingState(true)
      })
    }
  }

  const unfollow = () => {
    if (currentUser === 0) {
      alert("please login first")
    }
    else {
      userService.unfollow(userVisited, currentUser).then((result) => {
        setFollowingState(false)
      })
    }
  }
  const getFollowers = () => {
    if (userVisited.username !== undefined) {
      userService.findUserById(userVisited._id).then(
          (user) => setUserVisited(user)
      )
    }
  }

  const getFollowing = () => {
    if (userVisited.username !== undefined) {
      userService.findUserById(userVisited._id).then(
          (user) => setUserVisited(user)
      )
    }
  }

  const findReviewsOfUserVisited = (userVisited) => {
    reviewService.findReviewsByCreator(userVisited._id).then(
        reviews => setReviewsOfUserVisited(reviews))
  }

  const deleteReview = (reviewId) => {
    reviewService.deleteReview(reviewId).then(() =>
        reviewService.findReviewsByCreator(userVisited._id).then(
            reviewsByCurrentUser => setReviewsOfUserVisited(
                reviewsByCurrentUser)))
  }

  return (
      <div className="container yz-profile-container">
        <br/>
        {userVisited.username === undefined &&
        <h3>No such user exists! <Link to="/">Home</Link></h3>}
        {userVisited.username !== undefined &&
            <>
        <div className="float-right font-italic">
          <h6>Profile of <strong>{userVisited.username}</strong></h6>
        </div>
        <br/>
        <div className="container-fluid">

            <div>
              <ul className="nav nav-tabs">

                <li className="nav-item">
                  <div className={`nav-link ${active==="activeUser" ? 'active':''}`}>
                    <Link onClick={() => {
                      setShowContent("USER");
                      setActive("activeUser")
                    }}
                          to={`/profile/${userVisited._id}`}>
                      <i className="far fa-user"/>
                      &nbsp;&nbsp;User
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <div className={`nav-link ${active==="activeFollowers" ? 'active':''}`}>
                    <Link onClick={() => {
                      setShowContent("FOLLOWERS");
                      getFollowers(); setActive("activeFollowers")
                    }} to={`/profile/${userVisited._id}`}>
                      <i className="fas fa-user-friends"/>
                      &nbsp;&nbsp;Followers
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <div className={`nav-link ${active==="activeFollowing" ? 'active':''}`}>
                    <Link onClick={() => {
                      setShowContent("FOLLOWING");
                      getFollowing(); setActive("activeFollowing")
                    }} to={`/profile/${userVisited._id}`}>
                      <i className="fas fa-user-friends"/>
                      &nbsp;&nbsp;Following
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <div className={`nav-link ${active==="activeDrinks" ? 'active':''}`}>
                    <Link onClick={() => {
                      setShowContent("DRINKS");
                      findDrinksByCreator(userVisited); setActive("activeDrinks")
                    }} to={`/profile/${userVisited._id}`}>
                      <i className="fas fa-glass-martini-alt"/>
                      &nbsp;&nbsp;Drinks
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <div className={`nav-link ${active==="activeReviews" ? 'active':''}`}>
                    <Link onClick={() => {
                      setShowContent("REVIEWS");
                      findReviewsOfUserVisited(userVisited); setActive("activeReviews")
                    }} to={`/profile/${userVisited._id}`}>
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
              </div>

            {/*
               (***************right part*****************)
              */}

            <div className="yz-profile-content-box">
              {/*
               (***************user part*****************)
              */}

              {showContent === "USER" &&
              <div className="container-fluid yz-profile-message-box">
                <div>
                  <div className="card mb-3 yz-profile-other-picture">
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img src={userVisited.photoAddress}
                             className="img-thumbnail" width={200} alt="..."/>
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <h4 className="card-title">{userVisited.username}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!followingState &&
                  <button onClick={() => follow()} type="button"
                          className="btn btn-primary btn-info btn-lg">Follow me
                  </button>
                  }
                  {followingState &&
                  <button onClick={() => unfollow()} type="button"
                          className="btn btn-primary btn-info btn-lg">Following
                  </button>
                  }
                </div>
              </div>
              }

              {showContent === "FOLLOWERS" &&
              <div>
                {userVisited.followers.length !== 0 &&
                <div>
                  <ul>
                    {userVisited.followers.map((follower) =>
                        <FollowersCard currentUser={currentUser} user={follower}/>
                    )}
                  </ul>
                </div>
                }
                {userVisited.followers.length === 0 &&
                <div
                    className="container-fluid  yz-profile-messages-no-content">
                  <h4>Like what you see? Follow {userVisited.username} to get
                    their activity in your feed.</h4>
                </div>
                }
              </div>

              }
              {showContent === "FOLLOWING" &&

              <div>
                {userVisited.following.length !== 0 &&
                <div>
                  <ul>
                    {userVisited.following.map((singleFollowing) => {
                          return (<FollowersCard currentUser={currentUser} user={singleFollowing}/>
                          )
                        }
                    )}
                  </ul>
                </div>
                }
                {userVisited.following.length === 0 &&
                <div
                    className="container-fluid  yz-profile-messages-no-content">
                  <h3>No following yet.</h3>
                </div>
                }
              </div>
              }
              {showContent === "REVIEWS" &&
              <>
                {reviewsOfUserVisited.length === 0  &&
                <div
                    className="container-fluid  yz-profile-messages-no-content">
                  <h3>No review.</h3>
                </div>
                }
                {reviewsOfUserVisited.length > 0 &&
                    <>
                      <br/><br/>
                      <div className='row yz-gird-row'>
                      {
                    reviewsOfUserVisited.map(
                        review => <ReviewCardProfile review={review}/>)}
                      </div>
                      </>
                }
              </>
              }
              {showContent === "DRINKS" &&
              <>
                <div className='container-fluid'>
                  {drinksOfUserVisited.length !== 0 &&
                  <>
                    <div className='row yz-gird-row'>
                      {drinksOfUserVisited.map((drink) =>
                          <DrinkCard drink={drink}/>
                      )}
                    </div>
                  </>}
                  {drinksOfUserVisited.length === 0 &&
                  <div
                      className="container-fluid  yz-profile-messages-no-content">
                    <h4>No cocktail recipes yet.</h4>
                  </div>}
                </div>
              </>
              }
            </div>
        </div>
            </>}
      </div>
  )
}

export default VisitingProfile