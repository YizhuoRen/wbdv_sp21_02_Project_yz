import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom";
import userService from "../../services/user-service"

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({username: "", password: "", role: ""});

  const login = () => {
    userService.login(credentials).then((user) => {
      console.log(user)
      if (user === 0) {
        alert("login failed, try again")
      } else {
        history.push("/profile")
      }
    })
    history.push("/profile")
  }

  return (

      <div className="container yz-sign-in-container">
        <div className="yz-logo-name">
          funtail
        </div>
        <div className="yz-sign-in-box">
          <div className="yz-sign-in-title">
            Sign in to your account
          </div>
          <div className="yz-sign-in-rows">
            <div className="mb-3 row yz-sign-in-row">
              <label htmlFor="username"
                     className="col-sm-2 yz-sign-in-labels">Username</label>
              <div className="col-sm-10">
                <input value={credentials.username} type="text" className="form-control" placeholder="Alice"
                       onChange={event => setCredentials({...credentials, username: event.target.value})}
                       id="username"/>
              </div>
            </div>
            <div className="mb-3 row yz-sign-in-row">
              <label htmlFor="password"
                     className="col-sm-2 yz-sign-in-labels">Password</label>
              <div className="col-sm-10">
                <input value={credentials.password}  type="password" className="form-control"
                       onChange={event => setCredentials({...credentials, password: event.target.value})}
                       placeholder="123qwe#$%" id="password"/>
              </div>
            </div>
            <div className="mb-3 row yz-sign-in-row">
              <label htmlFor="button" className="col-sm-2"></label>
              <div className="col-sm-10">
                  <button onClick={login} className="btn btn-primary btn-block yz-create-account-btn" id="button">
                    Continue
                  </button>
              </div>
            </div>
            <div className="mb-3 row yz-sign-in-row">
              <label className="col-sm-2"></label>
              <div className="col-sm-10">
                {/*<Link to="">Forgot password?</Link>*/}
                <span>Don't have an account?&nbsp;
                <Link to="/register">Sign up</Link>
                </span>
                <Link to="/" className="float-right">Cancel</Link>
              </div>
            </div>
            <br/>

          </div>
        </div>
      </div>
  )

}

export default Login
