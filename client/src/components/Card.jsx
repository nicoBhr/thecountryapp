import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css";

export default function Card({id, name, flag, continent}) {
    
    return (
        <div className="containerCard">
            <Link to={`/home/${id}`}>
            <img className="imgCard" src={flag} alt={name + 'flag'} />
            <h3 className="countryName">{name}</h3>
            <p>{continent}</p>
            </Link>
        </div>
    )
}