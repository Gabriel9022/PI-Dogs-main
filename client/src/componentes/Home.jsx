import React, {useState, useEffect } from "react";
import { getAllDogs, order, filter, backFilter, getDog } from "../redux/actions";
import Cards from "./Cards";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import style from "../estilos/home.module.css";


const Razas = ({currentPage, setCurrentPage}) => {

const dogsPerPage = 8;

let history = useHistory() 

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllDogs())
},[dispatch])

const dogs = useSelector((state) => state.dogs)

const dogsSearched = useSelector((state)=> state.dogsSearched)

const searchs = useSelector((state) => state.search)

const loading = useSelector((state) => state.loading)



const [stateDogs, setStateDogs] = useState([...dogs].splice(currentPage, dogsPerPage))

const [dogsSearch, setDogsSearch] = useState ([...dogsSearched]?.splice(currentPage, dogsPerPage))

const [ orders, setOrders] = useState ("")

const [filtereds, setFiltereds] = useState (false)


if(dogs?.length && !stateDogs?.length && !dogsSearch.length) {
  setStateDogs([...dogs].splice(currentPage, dogsPerPage))
}
if (searchs !== "" && dogs !== undefined && stateDogs.length === 0 && dogsSearch.length===0){

setStateDogs(([...dogs].splice(currentPage, dogsPerPage)))
setDogsSearch(([...dogsSearched].splice(currentPage, dogsPerPage)))
}


const nextHandler = () => {
  var totalDogs;
if (searchs === "") {
   totalDogs = dogs.length;
} else {
   totalDogs = dogsSearched.length;
}
  
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

  setCurrentPage(0)
  if(orders !== e.target.value){
  setOrders(e.target.value)
  if(filtereds === true){
    dispatch(order(e.target.value))
    
  } else if (filtereds === false){
    dispatch(order(e.target.value))
  
  }
  }else {
    if(filtereds === true){
      dispatch(order(e.target.value))
      
    } else if (filtereds === false){
      dispatch(order(e.target.value))
    
    }

  }
  history.push('/home')
}

const filterTemps = (e) => {
  setCurrentPage(0)
  var options = document.getElementById("orderSelect")
  for (var i = 0, l = options.length; i < l; i++) {
    options[i].selected = options[i].defaultSelected;
  }
if(filtereds === false){
  setFiltereds(true)

  if (searchs === ""){
    dispatch(getAllDogs())
    .then(()=> {dispatch(filter(e.target.value)) })
  } else {
    dispatch(getDog(searchs))
    .then(()=> {dispatch(filter(e.target.value)) })
  }
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
}, [dogs, dogsSearched, currentPage, orders])

const sendInfo = () => {
  if (searchs !== "") {
    return dogsSearch
  } else {
    return stateDogs
  }
}

return (
<section className={style.home}>
    <div className={style.container}>
        <div className={style.bubbles}>
          <span className={style.span_1}></span>
          <span className={style.span_2}></span>
          <span className={style.span_3}></span>
          <span className={style.span_4}></span>
          <span className={style.span_5}></span>
          <span className={style.span_6}></span>
          <span className={style.span_7}></span>
          <span className={style.span_8}></span>
          <span className={style.span_9}></span>
          <span className={style.span_10}></span>
          <span className={style.span_11}></span>
          <span className={style.span_12}></span>
          <span className={style.span_13}></span>
          <span className={style.span_14}></span>
          <span className={style.span_15}></span>
          <span className={style.span_16}></span>
          <span className={style.span_17}></span>
          <span className={style.span_18}></span>
          <span className={style.span_19}></span>
          <span className={style.span_20}></span>
        </div> 
        {console.log(searchs)}
{loading === true ? <div className={style.loading}> <Loading /> </div> : searchs==="" ? 
<Cards currentPage={currentPage} dogsProps={sendInfo()} nextHandler={nextHandler} prevHandler={prevHandler} order={orderHandler} filterT={filterTemps} ApiDbHandler={ApiDbHandler}></Cards> :
<Cards currentPage={currentPage} dogsProps={sendInfo()} nextHandler={nextHandler} prevHandler={prevHandler} order={orderHandler} filterT={filterTemps} ApiDbHandler={ApiDbHandler}></Cards>    }
    </div>
</section>
)
}

export default Razas;