import React,{useEffect, useState} from 'react';
import  './restaurant-card.css';

import { getAllRestaurants } from "../../actions/userAction";
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';





const Restaurants = () => {
  const dispatch = useDispatch();
 
  
  const {
    restaurants,
    loading,
   
  } = useSelector((state) => state.restaurants);

  useEffect(()=>{
  dispatch(getAllRestaurants())
  },[dispatch])
  return (
    <div>
        <div className="title-f">
                <h1>🍴Choose Your Favourite Restaurants🍴</h1>
                <span></span>
        </div>
        {loading ? < Loader/> :  <div className="restaurant-card-container">
{
    restaurants && restaurants.map((e)=>(
        <div className='restaurant-card'>
           
            <img src={e.avatar.url}></img>
            <span>{e.email}</span>
            <h3>{e.restaurant}</h3>
            <p>City➡️ {e.city}</p>
            </div>
    ))
}


<div><li></li>
    </div>

            </div>
   

        }
        </div>
  )
} 

export default Restaurants;