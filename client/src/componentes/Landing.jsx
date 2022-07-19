import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../estilos/landing.module.css';

export class Landing extends Component {
  render() {
    return (
      <section className={style.landing}>
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
          <Link to="/home" ><button className={style.button} value="Conocé a tu amigo"> Conocé a tu amigo </button> </Link>
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
      </div>
      </section>
     
    )
  }
}

export default Landing