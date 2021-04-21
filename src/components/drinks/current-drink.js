import React, {useEffect, useState} from "react"
import {Link, Route, useHistory} from "react-router-dom";
import drinkService from "../../services/drink-service"

const CurrentDrink = ({userId}) => {
  const [newDrink, setNewDrink] = useState({})
  const history = useHistory();
  const createNewDrink = () => {
    drinkService.createDrink(userId, newDrink).then((result) => {
      setNewDrink(result)
    });
    alert("new drink created")
  }

  return(
  <form className="yz-create-drink-form">
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Drink Name</label>
      <input onChange={(e) => {setNewDrink({...newDrink, creator:userId, strDrink: e.target.value})}} type="text" className="form-control" aria-describedby="emailHelp"/>
        {/*<div id="emailHelp" className="form-text">We'll never share your email*/}
        {/*  with anyone else.*/}
        {/*</div>*/}
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1"
             className="form-label">Drink Tags</label>
      <input onChange={(e) => {setNewDrink({...newDrink, strTags: e.target.value})}} type="text" className="form-control"/>
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1"
             className="form-label">Ingredients</label>
      <input onChange={(e) => {setNewDrink({...newDrink, strIngredients: e.target.value})}} type="text" className="form-control"/>
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1"
             className="form-label">Instructions</label>
      <textarea onChange={(e) => {setNewDrink({...newDrink, strInstructions: e.target.value})}} rows={10} className="form-control"/>
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1"
             className="form-label">Image Address</label>
      <input onChange={(e) => {setNewDrink({...newDrink, strDrinkThumb: e.target.value})}}  type="text" className="form-control"/>
    </div>

    <div className="mb-3 form-check">
      <input onChange={(e) => {setNewDrink({...newDrink, strAlcoholic: e.target.checked})}}  type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Alcoholic</label>
    </div>

    <button onClick={() => {
      createNewDrink();
    }} type="submit" className="btn btn-primary">Submit</button>
  </form>)
}


export default CurrentDrink