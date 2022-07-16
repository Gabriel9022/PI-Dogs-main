import React, {useEffect} from 'react';
import {getDogId} from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import detail from '../estilos/detail.module.css'



const Detail = () => {


const {id} = useParams();
//console.log(id)

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getDogId(id))
}, [dispatch, id])

const dog = useSelector(state => state.dog)
const temperament = typeof(dog.temperament)=== 'string'? dog.temperament : dog.temperament?.map(e => {
  return ` ${e.name}`  
}).join(',')
  return (
    <div className={detail.div}>
      <div className={detail.imagen}>
      <img src={dog.image} alt="aca va una foto"/>
      </div>
      <p>Breed: {dog.name}</p>
      <p>Temperament: {temperament}</p> 
      <p>Weight(kg): {dog.weight_min} - {dog.weight_max}</p>
      <p>Height(cm): {dog.height_min} - {dog.height_min}</p>
      <p>Life span: {dog.life_span_min} - {dog.life_span_max}</p>
    </div>
  )
}


export default Detail