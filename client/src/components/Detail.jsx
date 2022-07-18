import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetailsCountry } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import Activity from './Activity';
import "./Details.css";

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const detailCountry = useSelector ((state) => state.details)

    useEffect (() => {
        dispatch(getDetailsCountry(id));
    }, [dispatch, id])    


    return(
        <div>
            {
            <div className='containerDetails'>
                <img className='imgFlag' alt='flag' src= {detailCountry.flag}/>
                <p><strong>Name:</strong> {detailCountry.name}</p>
                <p><strong>Continent:</strong> {detailCountry.continent}</p>            
                <p><strong>Capital:</strong> {detailCountry.capital}</p>
                <p><strong>Subregion:</strong> {detailCountry.subregion}</p>
                <p><strong>Area:</strong> {parseInt(detailCountry.area).toLocaleString()} km2</p>
                <p><strong>Population:</strong> {parseInt(detailCountry.population).toLocaleString()}</p>                  
            </div>
            }
            <div>
                { detailCountry.activities?.map((element) => {
                        return(                           
                            <Activity 
                                key= {element.id}                                       
                                name= {element.name} 
                                difficulty= {element.difficulty} 
                                duration= {element.duration}
                                season= {element.season}
                            />                           
                        )}) 
                } 
            </div>                       
            <Link to= '/home'>
                <button className='returnBtn'>Return</button>
            </Link>               
        </div>
    )
}