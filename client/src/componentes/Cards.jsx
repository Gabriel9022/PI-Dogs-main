import React from 'react';
import Card from './Card';
import cards from "../estilos/cards.module.css";



const Cards = ({props}) => {
  return (
    <div className={cards.div}>
      {/* {console.log(props)}  */}
        {props && props.map(e => {
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

  )
}

export default Cards