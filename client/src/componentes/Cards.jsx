import React, {useEffect, useState} from 'react';
import Card from './Card';
import cards from "../estilos/cards.module.css";
import { temperamentos } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from '../estilos/cards.module.css';


const Cards = (props) => {

  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(temperamentos())
  },[dispatch]);
  
  const temps = useSelector(state => state.temperaments);

  const search = useSelector(state => state.search);

  const dogsSearched = useSelector (state => state.dogsSearched);

  const [open, setOpen] = useState(false)

  const [dogsTemperaments, setDogsTeperaments] = useState(dogsSearched)

  const openHandler = () => {
    setOpen(!open)
  }

const mapTemps = (temps, dogs) => {

  const propsFiltrados = dogs?.map(f => f.temperament)
  let tempe = []
  for(let x in propsFiltrados){
    
   tempe = tempe.concat(propsFiltrados[x].split(', '))
  }
  const arr = [...new Set(tempe)]
  
return arr
}


  return (
    
    <div className={style.buttonsDiv}>
          
   
      <button onClick={props?.prevHandler}>prev</button>
      <span className={style.currentFont}> {props?.currentPage} </span>
      <button onClick={props?.nextHandler}>next</button>

      
      <button onClick={openHandler}>filtros</button>
      
      {open && 
      <div className={style.padre}> 
          <div className={style.hijoDelPadre}>
              <div className={style.padreDelTempsSelect}>
                  <select className={style.tempsSelect} id="tempsOrder" onChange={props?.filterT}>
                    <option selected={true} hidden>temperaments filter</option>
                    {
                    search === "" ?  temps?.map(e => {
                        return <option value={e.name} key={e.id}> {e.name} </option>
                      }) :  mapTemps(temps, dogsTemperaments)?.map(e => {
                        return <option value={e} key={e}> {e} </option>
                      })
                    }
                  </select>
              </div>
            <div>
                  <button value="dogs_api" onClick={props?.ApiDbHandler}>API dogs</button>
                  <button value ="dogs_db" onClick={props?.ApiDbHandler}>DB dogs</button>
              </div>
          </div>
      </div>
      }
      
      <div className={style.orders}> 
          <select className={style.select} id="orderSelect" onChange={props?.order}> 
            <option selected={true} hidden>AzZa / Weight</option>
            <option value="az">A Z</option>
            <option value="za">Z A</option>
            <option value="weightLow">weight low</option>
            <option value="weightHigh">weight hight</option>
          </select>
      </div>

     

      <div className={cards.div}>

        <div className={style.row}>
        {props?.dogsProps && props?.dogsProps?.map(e => {
          return (
           <div className={style.column}>
            <div className={cards.tarjetas} key={e.id}>

            {props.dogsProps?.length !== 0 ? <Card
              
              id={e.id}
              image={e.image}
              name={e.name}
              weight_min={e.weight_min}
              weight_max={e.weight_max}
              temperament={e.temperament}
            /> : "breed not found" }
             
            </div>
            </div>
          )
        })}
         </div>
      </div>
    </div>

  )
}

export default Cards