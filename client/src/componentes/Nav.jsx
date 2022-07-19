import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {search} from "../redux/actions";
import { useDispatch } from "react-redux";
import {resetDogsSearched} from "../redux/actions";

const Nav = ({currentPage, setCurrentPage}) => {

const dispatch = useDispatch()


const searchDelete = () => {
  setCurrentPage(0)
  dispatch(search(""))
  dispatch(resetDogsSearched([]))
}

   
      return (
        <div>
 
        <Link to="/home"> <button onClick={()=> searchDelete() }>Home</button> </Link>
     
        <Link to="/formulario">Crear pichichu</Link>
        <div>
          <SearchBar setCurrentPage={setCurrentPage} /> 
        </div>
      </div>
    )
  }
  
  export default Nav;