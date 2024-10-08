import React, { useState } from "react";

import './Form.css';


function Form(){

    const [title, setTitle] = useState('');
    const [openingText, setOpeningText] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [newMovieObj, setNewMovieObj] = useState([]);


    async function addMovies(){
        
        setNewMovieObj((prev)=> [...prev, {
            title: title,
            openingText: openingText,
            releaseDate: releaseDate
        }])
        console.log(newMovieObj, 'This is newMoviesObj')
    }

    return (
        <div>
            <label>Title</label> <br/>
            <input type="text" onChange={(e)=> setTitle(e.target.value)}/> <br/>
            <label>Opening Text</label><br/>
            <input type="text" onChange={(e)=> setOpeningText(e.target.value)}/><br/>
            <label>Release Date</label><br/>
            <input type="text" onChange={(e)=> setReleaseDate(e.target.value)}/><br/>
            <button onClick={addMovies}>Add Movies</button>
            
        </div>
    )
};


export default Form;