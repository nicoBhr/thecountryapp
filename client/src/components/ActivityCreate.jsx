import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postActivity, getCountries, getActivities } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import "./ActivityCreate.css";

const validationForm = (input) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if(!input.name.trim()){
        errors.name = "Name is required";
    }else if(!regexName.test(input.name.trim())){
        errors.name = "The name field only accepts letters and blank spaces";
    };
    if(!input.difficulty){
        errors.difficulty = "Difficulty is required";
    }
    if(!input.duration){
        errors.duration = "Duration is required";
    }else if(input.duration < 1 || input.duration > 24){
        errors.duration = "The duration must be between 1 and 24 hours";
    };
    if(!input.season){
        errors.season = "Season is required";
    }
    if(input.countries.length === 0){
        errors.countries = "Country is required";
    }
    return errors;
}


export default function ActivityCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    }) 
    
    useEffect(() => {
        dispatch(getCountries()); 
        dispatch(getActivities());       
    }, [dispatch]);
    

    function handleChange(e) {              
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validationForm({
            ...input,
            [e.target.name]: e.target.value
        }))
    }    
    

    function handleSelect(e) {
        if (input.countries.includes(e.target.value)) {
            alert('The country has already been selected!!')
        } else {
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]                
            }) 
            setErrors(validationForm({
                ...input,
                countries: [...input.countries, e.target.value]
            }))           
        }               
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validationForm(input));
        if (input.name && input.difficulty && input.duration && input.season && input.countries.length && !Object.keys(errors).length) {
            dispatch(postActivity(input));
            alert('Activity created successfully');
            navigate('/home')
            setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
            })
        } else {
            alert('Please, complete all the fields')
        }                
    } 

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(element => element !== e)
        })
    }


    return(
        <div className="containerGral">
            <div className="containerForm">           
            <h1>Create New Activity</h1>
                <form className="containerForm2" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                    <div className="inputContainer">
                        <label>Activity Name: </label>
                        <input className="inputName" type='text' name='name' onChange={handleChange} placeholder='Select a name for the new activity'/>
                    </div>
                        {errors.name && <p className='error'>{errors.name}</p>}                   
                    </div>

                    <div className="form-group">
                    <div className="inputContainer">
                        <label>Difficulty: </label>
                        <select className="select" name='difficulty' onChange={handleChange}>                        
                            <option>Select a difficulty for the new activity</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                        </div>
                        {errors.difficulty && <p className='error'>{errors.difficulty}</p>}                    
                        </div>

                        <div className="form-group">
                        <div className="inputContainer">
                            <label>Duration: </label>
                            <input className='inputName' type='number' placeholder="Select a duration for the new activity in hours..." name='duration' onChange={handleChange}/> 
                            </div>
                            {errors.duration && <p className='error'>{errors.duration}</p>}                   
                        </div>

                        <div className="form-group">
                        <div className="inputContainer">
                            <label>Season: </label>
                            <select className="select" name='season' onChange={handleChange}>                        
                                <option value=''>Select a season for the new activity</option>
                                <option value='summer'>Summer</option>
                                <option value='fall'>Fall</option>
                                <option value='winter'>Winter</option>
                                <option value='spring'>Spring</option>
                            </select>
                            </div>
                            {errors.season && <p className='error'>{errors.season}</p>}
                            </div>

                        <div className="form-group">
                        <div className="inputContainer">
                            <label>Countries: </label>      
                            <select className="select" name='countries' placeholder='Select countries' onChange={e => handleSelect(e)}>                                    
                                <option value=''>Select countries</option>
                                {countries.map((element) =>(
                                    <option key={element.id} value={element.name}>{element.name}</option>
                                ))}                       
                            </select>
                        </div>
                            {errors.countries && <p className='error'>{errors.countries}</p>}    
                        </div>

                        {
                            input.countries.map((element, index) => 
                                <div key={element.id}>                        
                                <span>{element}</span>
                            <button className="xbtn" onClick={() => handleDelete(element)}>X</button>                       
                            </div>
                            )
                        }

                        <div>     
                            <button className="createBtn" type='submit'>Create Activity</button>
                        </div>
                </form>
            </div>
        </div>
    )
}


