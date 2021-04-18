import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import cocktailService from "../services/cocktail-service"

const SearchScreen = () => {
  const history = useHistory()
  const {name} = useParams()
  const [searchName, setSearchName] = useState(name)
  const [results, setResults] = useState({drinks: []})
  useEffect(()=> {
    setSearchName(name);
    findCocktailsByName(name)
  }, [])
  const findCocktailsByName = (name) =>
  {
    history.push(name)
    cocktailService.findCocktailsByName(name).then((results)=>{
    setResults(results)
  })}
  return(
      <div>
        <div className="input-group mb-3 yz-home-input">
          <input onChange={(event) => setSearchName(event.target.value)} value={searchName}
                 type="text" className="form-control"
                 placeholder="Search by Name"
                 aria-label="Search by Name"
                 aria-describedby="button-addon2"/>
          <button onClick={()=> findCocktailsByName(searchName)} className="btn btn-outline-secondary yz-home-input-search-div" type="button"
                  id="button-addon2">
            <i className="fa fa-search"/>
          </button>
        </div>
        <div className="yz-search-result-list">
          <ul className="list-group">
            {
              results && results.drinks && results.drinks.map((cocktail) => {
                return (
                    <li className="list-group-item">
                        <Link to={`/details/${cocktail.idDrink}`}>
                          {cocktail.strDrink}
                        </Link>
                    </li>
                )
              })
            }
          </ul>
        </div>
      </div>
  )
}

export default SearchScreen