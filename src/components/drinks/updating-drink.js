import React, {useEffect, useState} from "react"
import {Link, Route, useHistory, useParams} from "react-router-dom";
import drinkService from "../../services/drink-service"


const UpdatingDrink = () => {
  const {drinkId} = useParams();
  const [drink, setDrink] = useState({})
  const [newUpdatedDrink, setNewUpdatedDrink] = useState({})
  const history = useHistory();

  useEffect(() => {
    drinkService.findDrinkById(drinkId).then(drink => {
      setDrink(drink);
      setNewUpdatedDrink(drink)
    });
  }, [])

  const updateDrink = () => {
    drinkService.updateDrink(newUpdatedDrink).then((result) => {
      history.push(`/details/${result._id}`)
    });
  }

  return(
      <div className="container yz-update-drink-container">
      <form className="yz-create-drink-form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Drink Name</label>
          <input value={newUpdatedDrink.strDrink} onChange={(e) => {setNewUpdatedDrink({...newUpdatedDrink, strDrink: e.target.value})}} type="text" className="form-control" aria-describedby="emailHelp"/>
          {/*<div id="emailHelp" className="form-text">We'll never share your email*/}
          {/*  with anyone else.*/}
          {/*</div>*/}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1"
                 className="form-label">Drink Tags</label>
          <input value={newUpdatedDrink.strTags} onChange={(e) => {setNewUpdatedDrink({...newUpdatedDrink, strTags: e.target.value})}} type="text" className="form-control"/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1"
                 className="form-label">Ingredients</label>
          <input value={newUpdatedDrink.strIngredients} onChange={(e) => {setNewUpdatedDrink({...newUpdatedDrink, strIngredients: e.target.value})}} type="text" className="form-control"/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1"
                 className="form-label">Instructions</label>
          <textarea value={newUpdatedDrink.strInstructions} onChange={(e) => {setNewUpdatedDrink({...newUpdatedDrink, strInstructions: e.target.value})}} rows={10} className="form-control"/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1"
                 className="form-label">Image Address</label>
          <input value={newUpdatedDrink.strDrinkThumb} onChange={(e) => {setNewUpdatedDrink({...newUpdatedDrink, strDrinkThumb: e.target.value})}}  type="text" className="form-control"/>
        </div>

        <div className="mb-3 form-check">
          <input value={newUpdatedDrink.strAlcoholic}  onChange={(e) => {setNewUpdatedDrink({...newUpdatedDrink, strAlcoholic: e.target.checked})}}  type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Alcoholic</label>
        </div>

        <button onClick={() => {
          updateDrink()
        }} type="submit" className="btn btn-primary">Update</button>
      </form>
      </div>)
}


export default UpdatingDrink