import React, {useEffect} from 'react';
import Card from './Card';
import cards from "../estilos/cards.module.css";
import { temperamentos } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


const Cards = (props) => {

  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(temperamentos())
  },[dispatch]);
  
  const temps = useSelector(state => state.temperaments);
console.log(props)
  return (
    <div>
      <h1>Pagina: {props?.currentPage}</h1>
      <select id="orderSelect" onChange={props?.order}>
        <option selected={true} hidden>A Z / Z A</option>
        <option value="az">A Z</option>
        <option value="za">Z A</option>
      {/* </select>
      <select onChange={props?.order}> */}
        {/* <option selected={true} hidden>Weight</option> */}
        <option value="weightLow">weight low</option>
        <option value="weightHigh">weight hight</option>
      </select>
      {/* <button onClick={props?.orderAzZa}>A Z / Z A</button> */}
      <button onClick={props?.prevHandler}>prev</button>
      <button onClick={props?.nextHandler}>next</button>

      <select id="tempsOrder" onChange={props?.filterT}>
        <option selected={true} hidden>temperaments filter</option>
        {
          temps?.map(e => {
            return <option value={e.name} key={e.id}> {e.name} </option>
          })
        }
      </select>

      <button value="dogs_api" onClick={props?.ApiDbHandler}>API dogs</button>
      <button value ="dogs_db" onClick={props?.ApiDbHandler}>DB dogs</button>
      <div className={cards.div}>

        {/* {console.log(props)}  */}
        {props?.dogsProps && props?.dogsProps?.map(e => {
          //  console.log(e)
          return (
            <div className={cards.tarjetas} key={e.id}>
             {/*  {console.log(props)} */}
            {props.dogsProps?.length !== 0 ? <Card

              id={e.id}
              image={e.image}
              name={e.name}
              weight_min={e.weight_min}
              weight_max={e.weight_max}
              temperament={e.temperament}
            /> : "breed not found" }
             
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default Cards