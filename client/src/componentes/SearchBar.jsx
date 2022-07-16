import React, {useState} from 'react';
import {getDog, search} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
/* import validate from '../validates/validateSearch'; */

const SearchBar = () => {

let history = useHistory() 

const searchState = useSelector((state) => state.search)

const [state, setState] = useState("")

/* const [errors, setErrors] = useState({}); */

const dispatch = useDispatch()

const handleChange = (e) => {
      
      setState( e.target.value );
      /* setErrors(validate(
      {[e.target.state]: e.target.value}
      )) */
  }
  
const  handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDog(state));
    dispatch(search(state))
    setState("");
    history.push('/home')
  }

  return (
    <div>
        <form >
        <input /* className={errors.state && 'danger'} */
        type="text"
        placeholder='Breed...'
        value={state}
        onChange={(e) => handleChange(e)}
        />
     {/*    {errors.state && (
        <p className="danger">{errors.state}</p>
)} */}
        <input type="submit" disabled={!state || state[0] === " "} 
        onClick={(e) => handleSubmit(e)}  value="Search"/>
        </form>

    </div>
  )
}

export default SearchBar;