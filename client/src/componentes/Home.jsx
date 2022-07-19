import React, {useState, useEffect /* Component */ } from "react";
//import { connect } from "react-redux";
import { getAllDogs, order, filter, backFilter } from "../redux/actions";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const Razas = ({currentPage, setCurrentPage}) => {

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

//const tempsFilterd = useSelector((state) => state.tempsFilterd)


const [stateDogs, setStateDogs] = useState([...dogs].splice(currentPage, dogsPerPage))

const [dogsSearch, setDogsSearch] = useState ([...dogsSearched]?.splice(currentPage, dogsPerPage))

const [ orders, setOrders] = useState ("")

const [filtereds, setFiltereds] = useState (false)


if(dogs?.length && !stateDogs?.length && !dogsSearch.length) {
  setStateDogs([...dogs].splice(currentPage, dogsPerPage))
}
if (search !== "" && dogs !== undefined && stateDogs.length === 0 && dogsSearch.length===0){

setStateDogs(([...dogs].splice(currentPage, dogsPerPage)))
setDogsSearch(([...dogsSearched].splice(currentPage, dogsPerPage)))
}


const nextHandler = () => {
  const totalDogs = dogs.length;
  const nextPage = currentPage + 1;
  const firstIndex = nextPage * dogsPerPage;

  const totalSearch = dogsSearched.length;
  const searchIndex = nextPage * dogsPerPage;

  if(firstIndex >= totalDogs || (searchIndex >= totalSearch && dogsSearched.length) ) return;

  setStateDogs([...dogs].splice(firstIndex, dogsPerPage));
  setDogsSearch([...dogsSearched].splice(searchIndex, dogsPerPage));
  setCurrentPage(nextPage);
}

const prevHandler = () => {
  const prevPage = currentPage -1;
if (prevPage < 0) return;
const firstIndex = prevPage * dogsPerPage;
const searchIndex = prevPage * dogsPerPage;
setStateDogs([...dogs].splice(firstIndex, dogsPerPage));
setDogsSearch([...dogsSearched].splice(searchIndex, dogsPerPage));
setCurrentPage(prevPage);
}

const orderHandler = (e) => {
  var options = document.getElementById("tempsOrder")
  for (var i = 0, l = options.length; i < l; i++) {
    options[i].selected = options[i].defaultSelected;
  }
  setCurrentPage(0)
  if(orders !== e.target.value){
  setOrders(e.target.value)
  if(filtereds === true){
    dispatch(order(e.target.value))
    
  } else if (filtereds === false){
  dispatch(getAllDogs())
  .then (()=> dispatch(order(e.target.value))) 
  
  }
  }else {
    if(filtereds === true){
      console.log("entro")
      dispatch(order(e.target.value))
      
    } else if (filtereds === false){
    dispatch(getAllDogs())
    .then (()=> dispatch(order(e.target.value))) 
    
    }

  }
  history.push('/home')
}

const filterTemps = (e) => {
  var options = document.getElementById("orderSelect")
  for (var i = 0, l = options.length; i < l; i++) {
    options[i].selected = options[i].defaultSelected;
  }
if(filtereds === false){
  setFiltereds(true)
  dispatch(getAllDogs())
  .then(()=> dispatch(filter(e.target.value)))
  setCurrentPage(0)
}
  setFiltereds(false)
}

const ApiDbHandler = (e) => {
 setCurrentPage(0)
 dispatch(getAllDogs())
 .then(() => dispatch(backFilter(e.target.value)))
}

useEffect (()=>{
  
  if(dogsSearched.length>0){
   return setDogsSearch([...dogsSearched].splice(currentPage*dogsPerPage, dogsPerPage))
  }
  setStateDogs([...dogs].splice(currentPage*dogsPerPage, dogsPerPage))
}, [dogs, dogsSearched, orders])

const sendInfo = () => {
  console.log(stateDogs)
  if (search !== "") {
    return dogsSearch
  } else {
    return stateDogs
  }
}

return <div> 
{loading === true ? "Loading" : search==="" ? 
<Cards currentPage={currentPage} dogsProps={sendInfo()} nextHandler={nextHandler} prevHandler={prevHandler} order={orderHandler} filterT={filterTemps} ApiDbHandler={ApiDbHandler}></Cards> : dogsSearch?.length > 0 ?
<Cards currentPage={currentPage} dogsProps={sendInfo()} nextHandler={nextHandler} prevHandler={prevHandler} order={orderHandler} filterT={filterTemps} ApiDbHandler={ApiDbHandler}></Cards>  : <p>"Breed not found"</p>  }
</div>
}

export default Razas;