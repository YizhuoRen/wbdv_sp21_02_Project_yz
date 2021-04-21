import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom";
import userService from "../../services/user-service"

const Register = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({username: "", password: "", role: "USER"});
  const register = () => {
    if ((credentials.username === "")||(credentials.password ==="")) {
      alert("Please input username and password.")
    }
    else {
      userService.register(credentials).then((user) => {
        console.log(user)
        if (user === 0) {
          alert("username already taken")
        } else {
          history.push("/profile")
        }
      })
    }
  }
  return (
      <div className="row container yz-sign-up-container">
        <div className="col-7">
          <img src="https://images.unsplash.com/photo-1556881261-e41e8db21055?ixlib=r
          b-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfH
          x8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80" className="yz-sign-up-image" alt=""/>
        </div>
        <div className="col-5 yz-sign-up-box">
          <div className="yz-signup-title">Create Your Funtail Account</div>
          <div className="mb-3 row yz-sign-up-row">
            <label htmlFor="username" className="col-sm-2 yz-sign-up-labels">Username</label>
            <div className="col-sm-10">
              <input value={credentials.username} type="text" id="username" className="form-control"
                     placeholder="Alice" onChange={(event)=> setCredentials(
                  {...credentials, username: event.target.value})}/>
            </div>
          </div>
          {/*<div className="mb-3 row yz-sign-up-row">*/}
          {/*  <label htmlFor="password" className="col-sm-2 yz-sign-up-labels">Password</label>*/}
          {/*  <div className="col-sm-10">*/}
          {/*    <input type="password" id="password" className="form-control"*/}
          {/*           placeholder="123qwe#$%" />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="mb-3 row yz-sign-up-row">
            <label htmlFor="verifyPassword" className="col-sm-2 yz-sign-up-labels">
              Password</label>
            <div className="col-sm-10">
              <input value={credentials.password} type="password" id="verifyPassword" className="form-control"
                     placeholder="123qwe#$%" onChange={(event)=> setCredentials(
                  {...credentials, password: event.target.value})}/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="registerBtn" className="col-sm-2"/>
            <div className="col-sm-10">
                <button onClick={register} id="registerBtn" className="btn btn-primary btn-block yz-create-account-btn">
                  Creat Account
                </button>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2"/>
            <div className="col-sm-10">
              <span>Have an account?</span>
              <Link to="/login"> Sign in</Link>
              <Link to="/" className="float-right">Cancel</Link>
            </div>
          </div>
        </div>
      </div>

      )
}

export default Register