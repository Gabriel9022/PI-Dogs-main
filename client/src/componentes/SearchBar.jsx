import React, {useState} from 'react';
import {getDog, search} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from '../estilos/searchBar.module.css';

const SearchBar = ({setCurrentPage}) => {

let history = useHistory() 


const dogsBackUp = useSelector ((state)=> state.dogsBackUp)



const [state, setState] = useState("")

const [error, setError] = useState("")


const dispatch = useDispatch()

const handleChange = (e) => { 

  if(e.target.value === ""){
    setError("");
    setState( e.target.value );
  }  else if (dogsBackUp.find(f => f.name.toLowerCase().includes(e.target.value.toLowerCase()))){
    setState( e.target.value );
  } else if (!dogsBackUp.find(f => f.name.toLowerCase().includes(e.target.value.toLowerCase()))){
    setError("Breed Not Found")
  }      
}
  
const  handleSubmit = (e) => {
    e.preventDefault(); 
    setCurrentPage(0)
    dispatch(getDog(state));
    dispatch(search(state))
    setState("");
    setError("");
    history.push('/home')
  }

  return (
    <div >
        <form >
        <input className={style.search}
        type="text"
        placeholder='Breed...'
        value={state}
        onChange={(e) => handleChange(e)}
        />
      

        <input className={style.searchButton} type="submit" disabled={!state || state[0] === " "} 
        onClick={(e) => handleSubmit(e)}  value="Search"/>

        {error && <p className={style.p}>{error}</p>}
        </form>

    </div>
  )
}

export default SearchBar;