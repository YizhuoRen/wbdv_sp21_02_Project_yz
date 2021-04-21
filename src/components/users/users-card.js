import React, {useEffect, useState} from "react"
import {Link, Route, useHistory} from "react-router-dom";

const UserCard = ({user}) => {

  return (
      <div className="card mb-3 yz-user-card">
        <div className="row g-0">
          <div className="col-md-4">
            <Link to={`/profile/${user._id}`}>
              <img src={user.photoAddress} width={100} alt="..."/>
            </Link>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link to={`/profile/${user._id}`}>
                <h5 className="card-title">{user.username}</h5>
              </Link>
              <p className="card-text"/>
              <p className="card-text"><small className="text-muted">new
                user</small></p>
            </div>
          </div>
        </div>
      </div>
  )

}

export default UserCard