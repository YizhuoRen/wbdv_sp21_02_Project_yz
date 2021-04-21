import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import drinkService from "../../services/drink-service"


const DrinkPage = () => {
  const {drinkId} = useParams();
  const [currentDrink, setCurrentDrink] = useState({});
  const history = useHistory();
  useEffect(()=> {
    drinkService.findDrinkById(drinkId).then((drink)=>
    {
      setCurrentDrink(drink)
    })
  }, [])
  return (
      <div className='container-fluid yz-detail-screen-container'>
        <button onClick={() => {
          history.goBack()
        }}>back</button>
        <h2>{currentDrink.strDrink}</h2>
        <p>
          <img className="float-right yz-detail-screen-image"  alt=""
               src={currentDrink.strDrinkThumb}/>
        </p>
        <p>type: {currentDrink.strAlcoholic}</p>
        </div>
  )
}


export default DrinkPage