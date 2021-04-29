import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import cocktailService from "../services/cocktail-service"
import userService from "../services/user-service";
import drinkService from "../services/drink-service";

const SearchScreen = () => {
  const history = useHistory()
  const {name} = useParams()
  const [searchName, setSearchName] = useState(name)
  const [results, setResults] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  useEffect(()=> {
    setSearchName(name);
    findCocktailsByName(name)
    userService.profile().then(user => {
      setCurrentUser(user);
    });
  }, [])

  const findCocktailsByName = (name) =>
  {
    drinkService.findTotalDrinkByName(name).then((re)=>{
      if (re.length === 0)  {
        history.push("/search")
      }
    setResults(re);
  })

  }
  return(
      <div className="yz-major-container-home">
        <nav className="navbar navbar-expand-lg navbar-light yz-home-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Funtail</Link>
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
                {currentUser.username === undefined &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Sign in
                    </Link>
                  </li>
                </>
                }
                {currentUser !== {} && currentUser.username !== undefined &&
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <div className="input-group mb-3 yz-home-input">
          <input onChange={(event) => setSearchName(event.target.value)} value={searchName}
                 type="text" className="form-control"
                 placeholder="Search by Name"
                 aria-label="Search by Name"
                 aria-describedby="button-addon2"/>
          <button onClick={()=>{history.push("/search/"+searchName); findCocktailsByName(searchName)}} className="btn btn-outline-secondary yz-home-input-search-div" type="button"
                  id="button-addon2">
            <i className="fa fa-search"/>
          </button>
        </div>
        <div className="yz-search-result-list">
          <ul className="list-group">
            {
              results.length > 0 && results.map((drink) => {
                return (
                    <>
                    {drink._id !== undefined &&
                    <li className="list-group-item">
                        <Link to={`/details/${drink._id}`}>
                          {drink.strDrink}
                        </Link>
                    </li>}
                {drink._id === undefined &&
                <li className="list-group-item">
                  <Link to={`/details/${drink.idDrink}`}>
                    {drink.strDrink}
                  </Link>
                </li>}
                </>
                )
              })
            }
          </ul>
        </div>
      </div>
  )
}

export default SearchScreen