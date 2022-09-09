import React from "react";
import { Link } from "react-router-dom";
import card from "../estilos/card.module.css";


const Card = ({image, name, weight_min, weight_max, temperament, creado_por, id}) => {
  
  let temperamento = typeof(temperament)=== 'string'? temperament : temperament?.map(e => {
    return ` ${e.name}`  
  }).join(',')
    return <div className={card.div}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className={card.imagen}>
      <img src={image} alt="aquí va una imagen" />
      </div> 
      <div className={card.info}>
      <h4 className={card.name}>{name}</h4>
      <p className={card.temperamento}>Temperament: {temperamento}</p>
      <p className={card.peso}>Weight: {`${weight_min} - ${weight_max} kg`}</p>
      {/* <p>Creador: {creado_por}</p> */}
      </div>
      <div className={card.contBoton}>
      <Link to={`/detail/${id}`}><button className={card.button}>Detail</button></Link>

      </div>
    </div>;
  };
  
  export default Card;