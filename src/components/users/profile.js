import React, {useEffect, useState} from "react"
import {Link, Route, useHistory} from "react-router-dom";
import userService from "../../services/user-service"

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({});
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

  return (
      <div>
        <h1>Profile</h1>
        <h3>Welcome {currentUser && currentUser.username}</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-2 yz-profile-left-column">
              <div>
                <Link to={`/profile`}>
                  <i className="far fa-user"></i>
                  &nbsp;&nbsp;user
                </Link>
              </div>
              <div>
                <Link to={`/profile/followers`}>
                  <i className="fas fa-user-friends"></i>
                  &nbsp;&nbsp;followers
                </Link>
              </div>
              <div>
                <Link to={`/profile/following`}>
                  <i className="fas fa-user-friends"></i>
                  &nbsp;&nbsp;following
                </Link>
              </div>
              <div>
                <Link to={`/profile/recipe`}>
                  <i className="far fa-clipboard"></i>
                  &nbsp;&nbsp;recipe
                </Link>
              </div>
              <div>
                <Link to={`/profile/comments`}>
                  <i className="far fa-comment"></i>
                  &nbsp;&nbsp;comments
                </Link>
              </div>
              <div>
                <Link to={`/profile/likes`}>
                  <i className="far fa-thumbs-up"></i>
                  &nbsp;&nbsp;likes
                </Link>
              </div>
              <div>
                <button onClick={logout} className="btn btn-primary">Log out
                </button>
              </div>
            </div>

            <div className="col col-10 yz-profile-right-column">
              <Route path={["/profile"]} exact={true}>
                {currentUser.username !== undefined &&
                <div>
                  Username: {currentUser.username} <br/>
                  Email: {currentUser.email} <br/>
                  Address: {currentUser.address} <br/>
                </div>}
                {currentUser.username === undefined &&
                <div>
                  <h3>Please sign in first</h3>
                  <Link to="/login">
                    Sign in
                  </Link>
                </div>}

              </Route>
              <Route path={["/profile/followers"]} exact={true}>
                this is followers
              </Route>
              <Route path={["/profile/following"]} exact={true}>
                this is following
              </Route>
              <Route path={["/profile/recipe"]} exact={true}>
                this is recipe
              </Route>
              <Route path={["/profile/comments"]} exact={true}>
                this is comments
              </Route>
              <Route path={["/profile/likes"]} exact={true}>
                this is likes
              </Route>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile