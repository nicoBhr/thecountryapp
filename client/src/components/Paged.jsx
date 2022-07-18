import React from 'react';
import './Paged.css';


export default function Paged({countriesPerPage, allCountries, paged}){
    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(allCountries / countriesPerPage); i++) {        
        pageNumbers.push(i);        
    }

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map((number, index) => (
                    <button className='btnPage' key={index} onClick={(setCountriesPerPage)=>paged(number)}>{number}</button>
                ))}
            </ul>
        </nav>
    )
}