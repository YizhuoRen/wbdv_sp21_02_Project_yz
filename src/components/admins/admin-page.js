import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import userService from "../../services/user-service";
import adminsService from "../../services/admin-service";
import drinkService from "../../services/drink-service";


export default () => {
   const [searchName, setSearchName] = useState([]);
  const [searchDrinkName, setSearchDrinkName] = useState([]);
   const [status, setStatus] = useState("");
   const [currentAdmin, setCurrentAdmin] = useState({});
  const [userFound, setUserFound] = useState([]);
  const [drinksFound, setDrinksFound] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const history = useHistory();
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const logout = () => {
    adminsService.logout().then(response => setCurrentAdmin(response))
  }

  useEffect(() => {
    adminsService.adminPage().then(currentAdmin => {
      if (currentAdmin === 0) {
        alert("Please login")
      } else {
      setCurrentAdmin(currentAdmin);}
    })
  }, [])


  const findUserByName = (username) => {
       userService.findUserByName(username).then((users) =>
           setUserFound(users))
  }

  const findDrinkByName = (drinkName) => {
    drinkService.findDrinkByName(drinkName).then((drinks) => {
          setDrinksFound(drinks)
        }
    );
  }


  const deleteUser = (userFoundId) => {
    userService.deleteUser(userFoundId).then(() => {
          alert("Successfully Deleted the User!");

        }
    )
  }

  const deleteDrink = (drinkId) => {
    drinkService.deleteDrink(drinkId).then(() =>
        alert("Successfully Deleted the Drink!")
    )
  }

  return(
      <>
        {currentAdmin.username !== undefined &&
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link onClick={()=>setStatus("")} className="navbar-brand" to="/admin">Funtail</Link>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-label="Toggle navigation"
                    aria-expanded={!isNavCollapsed ? true : false}
                    onClick={handleNavCollapse}>
              <span className="navbar-toggler-icon"/>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link onClick={() => setStatus("user")} className="nav-link" to="/admin">
                    Find User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={() => setStatus("drink")} className="nav-link" to="/admin">
                    Find Drink
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={() => {logout()}} className="nav-link" to="/">
                    Log Out
                  </Link>
                </li>
                {/*<li className="nav-item">*/}
                {/*  <Link className="nav-link" to="/">*/}
                {/*    Delete User*/}
                {/*  </Link>*/}
                {/*/!*</li>*!/*/}
                {/*<li className="nav-item">*/}
                {/*  <Link className="nav-link" to="/">*/}
                {/*    Create New Admin*/}
                {/*  </Link>*/}
                {/*</li>*/}
              </ul>
            </div>
          </div>
        </nav>
        <br/> <br/>
        {status === "" &&
        <h3>Welcome    {currentAdmin.username}</h3>}
        {status === "user" &&
            <div>
        <div className="input-group mb-3 yz-admin-input">
          <input onChange={(event) => setSearchName(event.target.value)} value={searchName}
                 type="text" className="form-control"
                 placeholder="Input a username"
                 aria-label="Search by Name"
                 aria-describedby="button-addon2"/>
          <button onClick={()=> findUserByName(searchName)} className="btn btn-outline-secondary yz-home-input-search-div" type="button"
                  id="button-addon2">
            <i className="fa fa-search"/>
          </button>
        </div>
              <div className="yz-search-result-list">
                <ul className="list-group">
                  {
                    userFound.length > 0 &&
                    userFound.map(user =>
                    <li className="list-group-item">
                    {/*<Link to={`/details/${cocktail.idDrink}`}>*/}
                    {user.username}

                    <button onClick={()=>{deleteUser(user._id); setStatus("")}} type="button"
                    className="btn btn-danger float-right">Delete</button>
                    {/*</Link>*/}
                    </li>
                    )
                    }
                  {/*{userFound.username === undefined&&*/}
                  {/*  <li className="list-group-item">*/}
                  {/*      <h3>No user record found.</h3>*/}
                  {/*  </li>*/}
                  {/*}*/}
                </ul>
              </div>
            </div>
        }
        {status === "drink" &&
        <div>
          <div className="input-group mb-3 yz-admin-input">
            <input onChange={(event) => setSearchDrinkName(event.target.value)} value={searchDrinkName}
                   type="text" className="form-control"
                   placeholder="Input a drink name"
                   aria-label="Search by Name"
                   aria-describedby="button-addon2"/>
            <button onClick={() => findDrinkByName(searchDrinkName)} className="btn btn-outline-secondary yz-home-input-search-div" type="button"
                    id="button-addon2">
              <i className="fa fa-search"/>
            </button>
          </div>
          <div className="yz-search-result-list">
            <ul className="list-group">
              {
                drinksFound.length > 0 &&
                drinksFound.map(drink =>
                    <li className="list-group-item">
                      {drink.strDrink}
                      <button onClick={() => deleteDrink(drink._id)} type="button"
                              className="btn btn-danger float-right">Delete</button>

                      <span className="float-md-right">{drink.creator.username}</span>

                      {/*</Link>*/}
                    </li>
                )
              }
              {/*{userFound.username === undefined&&*/}
              {/*  <li className="list-group-item">*/}
              {/*      <h3>No user record found.</h3>*/}
              {/*  </li>*/}
              {/*}*/}
            </ul>
          </div>
        </div>
        }
      </div>}
        {currentAdmin.username === undefined &&
            <div>
        <h2>
          Please log in!
        </h2>
              <Link to={"/"}>Go Back</Link>
            </div>}
        </>)
}
