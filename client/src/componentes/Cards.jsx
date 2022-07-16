import React from 'react';
import Card from './Card';
import cards from "../estilos/cards.module.css";


const Cards =  (props) => {
  console.log(props)
   return (
    <div>
    <h1>Pagina: {props?.currentPage}</h1>
            <button onClick={props?.prevHandler}>prev</button>
            <button onClick={props?.nextHandler}>next</button>
    <div className={cards.div}>

      {/* {console.log(props)}  */}
      {props?.dogsProps && props?.dogsProps?.map(e => {
        //  console.log(e)
         return(
           
          <div className={cards.tarjetas} key={e.id}>
           <Card
         
           id={e.id}
           image={e.image}
           name={e.name}
           weight_min={e.weight_min}
           weight_max={e.weight_max}
           temperament={e.temperament}
           /> 
           </div>
        )
        })}
    </div>
    </div>

  )
}

export default Cards