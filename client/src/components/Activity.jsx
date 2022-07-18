import React from 'react';
import "./Activity.css"


export default function Activity({name, difficulty, duration, season}){
    return(                     
        <div className='containerActivityDetails'>
            <p className='descriptionActivity'><strong>Activity</strong></p>
            <p className='descriptionActivity'><strong>Name:</strong> {name}</p>
            <p className='descriptionActivity'><strong>Difficulty:</strong> {difficulty}</p>
            <p className='descriptionActivity'><strong>Duration:</strong> {duration}</p>
            <p className='descriptionActivity'><strong>Season:</strong> {season}</p>                                
        </div>           
    )
}    