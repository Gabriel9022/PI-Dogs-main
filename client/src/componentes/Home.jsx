import React, {useState, useEffect /* Component */ } from "react";
//import { connect } from "react-redux";
import { getAllDogs, order, filter, backFilter } from "../redux/actions";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const Razas = ({currentPage, setCurrentPage}) => {
// estado global search = ""
// search seteo "dispatch"  a estado global
//y en home search !== "" ? vuelvo a setear el estado local


const dogsPerPage = 8;

let history = useHistory() 

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllDogs())
},[dispatch])

const dogs = useSelector((state) => state.dogs)

const dogsSearched = useSelector((state)=> state.dogsSearched)

const search = useSelector((state) => state.search)

const loading = useSelector((state) => state.loading)

const tempsFilterd = useSelector((state) => state.tempsFilterd)


/* const [currentPage, setCurrentPage] = useState(0) */

const [stateDogs, setStateDogs] = useState([...dogs].splice(currentPage, dogsPerPage))

const [dogsSearch, setDogsSearch] = useState ([...dogsSearched]?.splice(currentPage, dogsPerPage))

const [ orders, setOrders] = useState ("")

const [filtereds, setFiltereds] = useState (false/* [...tempsFilterd].splice(currentPage, dogsPerPage) */)
console.log(filtereds)



if(dogs?.length && !stateDogs?.length && !dogsSearch.length) {
  setStateDogs([...dogs].splice(currentPage, dogsPerPage))
}
if (search !== "" && dogs !== undefined && stateDogs.length === 0 && dogsSearch.length===0){
//console.log(dogs)
setStateDogs(([...dogs].splice(currentPage, dogsPerPage)))
setDogsSearch(([...dogsSearched].splice(currentPage, dogsPerPage)))
}
/* if (search == "" && dogs !== undefined  && stateDogs.length === 0 && dogsSearch.length===0  && filtereds.length === 0){
setFiltereds
} */


//console.log(stateDogs)

const nextHandler = () => {
  const totalDogs = dogs.length;
  const nextPage = currentPage + 1;
  const firstIndex = nextPage * dogsPerPage;

  const totalSearch = dogsSearched.length;
  const searchIndex = nextPage * dogsPerPage;

  if(firstIndex >= totalDogs || (searchIndex >= totalSearch && dogsSearched.length) ) return;

  setStateDogs([...dogs].splice(firstIndex, dogsPerPage));
  setDogsSearch([...dogsSearched].splice(searchIndex,/* firstIndex, */ dogsPerPage));
  setCurrentPage(nextPage);
}

const prevHandler = () => {
  const prevPage = currentPage -1;
if (prevPage < 0) return;
const firstIndex = prevPage * dogsPerPage;
const searchIndex = prevPage * dogsPerPage;
setStateDogs([...dogs].splice(firstIndex, dogsPerPage));
setDogsSearch([...dogsSearched].splice(searchIndex,/* firstIndex, */ dogsPerPage));
setCurrentPage(prevPage);
}

const orderHandler = (e) => {
  if(orders !== e.target.value){
  setOrders(e.target.value)
  if(filtereds === true){
    console.log("entro")
    dispatch(order(e.target.value))
    
  } else if (filtereds === false){
  dispatch(getAllDogs())
  .then (()=> dispatch(order(e.target.value))) 
  // setCurrentPage(0)
  }
  }else {
    if(filtereds === true){
      console.log("entro")
      dispatch(order(e.target.value))
      
    } else if (filtereds === false){
    dispatch(getAllDogs())
    .then (()=> dispatch(order(e.target.value))) 
    // setCurrentPage(0)
    }

  }
  history.push('/home')
}

const filterTemps = (e) => {
//console.log(e.target.value)
if(filtereds === false){
  setFiltereds(true)
  dispatch(getAllDogs())
  .then(()=> dispatch(filter(e.target.value)))
  // .then (() => setFiltereds(false))
 // dispatch(filter(e.target.value))
  //console.log(filtereds)
  setCurrentPage(0)
}
  setFiltereds(false)
}

const ApiDbHandler = (e) => {
 setCurrentPage(0)
 dispatch(getAllDogs())
 .then(() => dispatch(backFilter(e.target.value)))
}

/* if(([...dogsSearched].splice(currentPage*dogsPerPage, dogsPerPage)).length){
  setCurrentPage(0)
} */


useEffect (()=>{
  
  if(dogsSearched.length>0){
   return setDogsSearch([...dogsSearched].splice(currentPage*dogsPerPage, dogsPerPage))
  }
  setStateDogs([...dogs].splice(currentPage*dogsPerPage, dogsPerPage))
  //setDogsSearch([...dogsSearched].splice(currentPage*dogsPerPage, dogsPerPage))
 // setFiltereds([...tempsFilterd].splice(currentPage*dogsPerPage, dogsPerPage))
}, [dogs, dogsSearched, /* tempsFilterd, */ orders])




return <div> 
  {console.log(filtereds)}
{loading === true ? "Breed not found" : search==="" ? 
<Cards currentPage={currentPage} dogsProps={stateDogs} nextHandler={nextHandler} prevHandler={prevHandler} order={orderHandler} filterT={filterTemps} ApiDbHandler={ApiDbHandler}></Cards> : 
<Cards currentPage={currentPage} dogsProps={dogsSearch} nextHandler={nextHandler} prevHandler={prevHandler} order={orderHandler} filterT={filterTemps} ApiDbHandler={ApiDbHandler}></Cards> }
</div>
}

export default Razas;