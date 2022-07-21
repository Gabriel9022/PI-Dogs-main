import React, {useEffect} from 'react';
import {getDogId} from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import style from '../estilos/detail.module.css'
import Loading from './Loading';



const Detail = () => {

const loading = useSelector((state) => state.loading)

const {id} = useParams();

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getDogId(id))
}, [dispatch, id])

const dog = useSelector(state => state.dog)
const temperament = typeof(dog.temperament)=== 'string'? dog.temperament : dog.temperament?.map(e => {
  return ` ${e.name}`  
}).join(',')
  return (
    
  <div className={style.detailPage}>
    { loading === true ? <div className={style.loading}> <Loading /> </div> : 
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
    
      <div className={style.div}>
        <div className={style.imagen}>
        <img src={dog.image} alt="aca va una foto"/>
        </div>
        <div className={style.fonts}>
            <h1>{dog.name}</h1>
            <p>Temperament: <span>{temperament}</span></p> 
            <p>Weight: <span>{`${dog.weight_min} - ${dog.weight_max} kg`}</span></p>
            <p>Height: <span>{`${dog.height_min} - ${dog.height_max} cm`}</span></p>
            <p>Life span: <span>{dog.life_span_min} - {dog.life_span_max}</span></p>
        </div>
      </div>
    </div>
    }  
  </div>  
)
}


export default Detail