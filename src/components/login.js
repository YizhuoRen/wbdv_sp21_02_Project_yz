import React from "react"
import {Link} from "react-router-dom";


const Login = () => {
  return(
      <div className="container">
        <h1>
          Sign In
        </h1>
        <div className="mb-3 row">
          <label htmlFor="username" className="col-sm-2">Username</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="Alice"
                   id="username"/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control"
                   placeholder="123qwe#$%" id="password"/>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="button" className="col-sm-2"></label>
          <div className="col-sm-10">
            <a href="../profile/profile.template.client.html">
              <button className="btn btn-primary btn-block" id="button">Sign
                in
              </button>
            </a>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2"></label>
          <div className="col-sm-10">
            <a href="">Forgot password?</a>
            <Link to="/register"
               className="float-right">Sign up</Link>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2"></label>
          <div className="col-sm-10">
            <a href="../index.html" className="float-right">Cancel</a>
          </div>
        </div>

      </div>
  )



}


export default Login
