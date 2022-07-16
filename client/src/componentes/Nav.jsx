import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {search} from "../redux/actions";
import { useDispatch,  } from "react-redux";

const Nav = () => {

const dispatch = useDispatch()


   
      return (
        <div>
 
        <Link to="/home"> <button onClick={()=> dispatch(search("")) }>Home</button> </Link>
     
        <Link to="/formulario">Crear pichichu</Link>
        <div>
          <SearchBar /> 
        </div>
      </div>
    )
  }
  
  export default Nav;