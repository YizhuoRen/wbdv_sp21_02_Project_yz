import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import userService from "../../services/user-service";
import adminsService from "../../services/admin-service";
import drinkService from "../../services/drink-service";


export default () => {
  // const [drinks, setDrinks] = useState([]);
  // const [newUsers, settNewUsers] = useState([]);
   const [currentAdmin, setCurrentAdmin] = useState({});
  useEffect(() => {
    adminsService.profile().then(currentAdmin => {
      if (currentAdmin === 0) {
        alert("Please login")
      } else {
      setCurrentAdmin(currentAdmin);}
    })
  }, [])

  return(
      <div className="container-fluid">
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
                  <Link className="nav-link" to="/">
                    Drinks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Create New Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>)
}
