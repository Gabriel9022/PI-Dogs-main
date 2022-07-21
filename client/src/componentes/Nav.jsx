import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {search, getAllDogs} from "../redux/actions";
import { useDispatch } from "react-redux";
import {resetDogsSearched} from "../redux/actions";
import style from "../estilos/nav.module.css";

const Nav = ({currentPage, setCurrentPage}) => {

const dispatch = useDispatch()


const searchDelete = () => {
  setCurrentPage(0)
  dispatch(search(""))
  dispatch(resetDogsSearched([]))
  dispatch(getAllDogs())
}

   
      return (
      <div className={style.padre}>
          <div className={style.links}>
            <Link to="/home"><button onClick={()=> searchDelete() }>Home</button> </Link>

            <Link to="/formulario"><button>Create Breed</button></Link>
          </div>
          <div className={style.search}>
            <SearchBar setCurrentPage={setCurrentPage} /> 
          </div>
      </div>
    )
  }
  
  export default Nav;