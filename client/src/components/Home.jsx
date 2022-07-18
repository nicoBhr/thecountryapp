import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getCountries, filterContinent, alphabeticalOrder, populationOrder, getActivities, filterActivity } from '../actions'
import { Link } from 'react-router-dom'; 
import Card  from './Card'
import Paged from './Paged';
import "./Home.css";
import SearchBar from './SearchBar';


export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);
    const [/*order*/, setOrder] = useState(''); 
   
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, /*setCountriesPerPage*/] = useState(12);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;    
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries());  
        dispatch(getActivities()); 
    }, [dispatch])

    function handleAllCountries(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e) {
        e.preventDefault();
        dispatch(filterContinent(e.target.value));
    }

    function handleAlphabeticalOrder(e) {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)        
    }

    function handlePopulationOrder(e) {
        e.preventDefault();
        dispatch(populationOrder(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    }    

    function handleFilterActivity(e) {
        e.preventDefault();
        dispatch(filterActivity(e.target.value));
    }

    return(
        <div>
            <div className="containerSlt">
                <SearchBar/>
                <button onClick={e => {handleAllCountries(e)}} className="btn">All Countries
                </button>
                <button className="btn">
                    <Link to='/activity'>Create new activity</Link>
                </button>
                <div>
                    <select className="slt" onChange={e => handleAlphabeticalOrder(e)}>
                        <option value='Asc'>A to Z</option>
                        <option value='Desc'>Z to A</option>
                    </select>

                    <select className="slt" onChange={e => handlePopulationOrder(e)}> 
                        <option value='High'>Lower</option>
                        <option value='Low'>Higher</option>
                    </select>
                    
                    <select className="slt" onChange={e => handleFilterContinent(e)}>
                        <option value='All'>All Continents</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Africa'>Africa</option>
                        <option value='North America'>North America</option>
                        <option value='South America'>South America</option>
                        <option value='Antarctica'>Antarctica</option>
                    </select>                
                    
                    <select className="slt" onChange= {e => handleFilterActivity(e)}>
                        <option value='All'>All Activities</option>
                            {allActivities.map(element =>(
                                    <option value={element.name} key={element.id}>{element.name}</option>
                            ))}                       
                            </select>                        
                </div>
            </div>      
                <div className="divCard">
                {
                    currentCountries?.map((element) => {
                        return(                            
                                <Card                                    
                                    flag={element.flag} 
                                    name={element.name}
                                    id={element.id} 
                                    continent={element.continent}                                    
                                    key={element.id}
                                />                   
                        )
                    })
                } 
                </div>            
                <Paged
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paged={paged}
                />          
        </div>
    )
}