import React, {useState} from 'react';
import {getDog, search} from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
/* import validate from '../validates/validateSearch'; */

const SearchBar = ({setCurrentPage}) => {

let history = useHistory() 

// const searchState = useSelector((state) => state.search)

const [state, setState] = useState("")

/* const [errors, setErrors] = useState({}); */

const dispatch = useDispatch()

const handleChange = (e) => {   
      setState( e.target.value );
  }
  
const  handleSubmit = (e) => {
    e.preventDefault(); 
    setCurrentPage(0)
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