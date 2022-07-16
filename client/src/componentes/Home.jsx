import React, {useState, useEffect /* Component */ } from "react";
//import { connect } from "react-redux";
import { getAllDogs } from "../redux/actions";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";


const Razas = () => {
// estado global search = ""
// search seteo "dispatch"  a estado global
//y en home search !== "" ? vuelvo a setear el estado local


const dogsPerPage = 8;

const dispatch = useDispatch()


useEffect(() => {
  dispatch(getAllDogs())
},[dispatch])

const dogs = useSelector((state) => state.dogs)

const dogsSearched = useSelector((state)=> state.dogsSearched)

const search = useSelector((state) => state.search)

const loading = useSelector((state) => state.loading)

const [currentPage, setCurrentPage] = useState(0)

const [stateDogs, setStateDogs] = useState([...dogs].splice(currentPage, dogsPerPage))

if(dogs?.length && !stateDogs?.length) {
  setStateDogs([...dogs].splice(currentPage, dogsPerPage))
}
if (search !== "" && dogs !== undefined && stateDogs.length === 0){
console.log(dogs)

setStateDogs(([...dogs].splice(currentPage, dogsPerPage)))
}

console.log(stateDogs)

const nextHandler = () => {
  const totalDogs = dogs.length;
  const nextPage = currentPage + 1;
  const firstIndex = nextPage * dogsPerPage;

  if(firstIndex >= totalDogs) return;

  setStateDogs([...dogs].splice(firstIndex, dogsPerPage));
  setCurrentPage(nextPage);
  //console.log("next")
}

const prevHandler = () => {
  const prevPage = currentPage -1;
if (prevPage < 0) return;
const firstIndex = prevPage * dogsPerPage;
setStateDogs([...dogs].splice(firstIndex, dogsPerPage));
setCurrentPage(prevPage);
// console.log("prev")
}


return <div>
{loading === true ? "Breed not found" : search==="" ? <Cards currentPage={currentPage} dogsProps={stateDogs} nextHandler={nextHandler} prevHandler={prevHandler} ></Cards> : <Cards currentPage={currentPage} dogsProps={dogsSearched} nextHandler={nextHandler} prevHandler={prevHandler} ></Cards> }
</div>
}

export default Razas;