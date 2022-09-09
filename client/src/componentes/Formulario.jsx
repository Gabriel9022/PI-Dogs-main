import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newDog } from "../redux/actions";
import { temperamentos } from "../redux/actions";
import validate from "../validates/validateForm";
import style from "../estilos/formulario.module.css";

const RazaNueva = () => {
const [temper, setTemper] = useState([]);

const [stateValidate, setStateValidate] = useState({
    image: "",
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperament: [] 
})

const [errors, setErrors] = useState({});


function handleOnChange (e){
   
    setStateValidate({
        ...stateValidate,
        [e.target.name]: e.target.value
    })
    setErrors(validate({
        ...stateValidate, 
        [e.target.name]: e.target.value
    }));

};

const dispatch = useDispatch();

useEffect(() => {
    dispatch(temperamentos())
  }, [dispatch]);

const temps = useSelector(state => state.temperaments);

let handleSubmit = (e)=> {
    e.preventDefault();
  
    dispatch(newDog(stateValidate))
    .then(()=>{
        let form = document.getElementById("form")
        form.reset()
    }) 
    setStateValidate({
        image: "",
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperament: []
    })    
    setTemper([])
}

let handleSelect = (e) => {

const select = e.target.value;
if (select === "default") return
if(stateValidate.temperament.includes(e.target.value)) return
setStateValidate({...stateValidate, 
                temperament:[...stateValidate.temperament, select]})

setTemper([...temper, 
            temps.find(e => e.id === parseInt(select))])

};

let handleDelete = (e) => {
   let borrado = stateValidate.temperament.filter(f => parseInt(f) !== e.id)

   let borrado2 = temper.filter(g => g.name !== e.name)

    setStateValidate({...stateValidate, temperament: borrado})
    setTemper(borrado2)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
}

return (
    <div className={style.formularioPage}>
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
            <div className={style.form}>
                <form id="form">
                    <div>
                        <h3>Create your Breed</h3>
                    </div>
                    <div>
                        <label>Image: </label>
                        <input className={errors.image && 'danger'}
                            type="text" name="image"
                            value={stateValidate.image} placeholder="only url..." onChange={handleOnChange} />
                        {errors.image && (
                            <p className="danger">{errors.image}</p>
                        )}
                    </div>

                    <div>
                        <label>Name: </label>
                        <input className={errors.name && 'danger'}
                            type="text" name="name"
                            value={stateValidate.name} onChange={handleOnChange} />
                        {errors.name && (
                            <p className="danger">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label>Height(min): </label>
                        <input className={errors.height_min && "danger"}
                            type="text" name="height_min"
                            value={stateValidate.height_min} onChange={handleOnChange} />
                        {errors.height_min && (
                            <p className="danger">{errors.height_min}</p>
                        )}
                    </div>
                    <div>
                        <label>Height(max): </label>
                        <input className={errors.height_max && "danger"}
                            type="text" name="height_max"
                            value={stateValidate.height_max} onChange={handleOnChange} />
                        {errors.height_max && (
                            <p className="danger">{errors.height_max}</p>
                        )}
                    </div>

                    <div>
                        <label>Weight(min): </label>
                        <input className={errors.weight_min && "danger"}
                            type="text" name="weight_min"
                            value={stateValidate.weight_min} onChange={handleOnChange} />
                        {errors.weight_min && (
                            <p className="danger">{errors.weight_min}</p>
                        )}
                    </div>
                    <div>
                        <label>Weight(max): </label>
                        <input className={errors.weight_max && "danger"}
                            type="text" name="weight_max"
                            value={stateValidate.weight_max} onChange={handleOnChange} />
                        {errors.weight_max && (
                            <p className="danger">{errors.weight_max}</p>
                        )}
                    </div>

                    <div>
                        <label>Life Span(min): </label>
                        <input className={errors.life_span_min && "danger"}
                            type="text" name="life_span_min"
                            value={stateValidate.life_span_min} onChange={handleOnChange} />
                        {errors.life_span_min && (
                            <p className="danger">{errors.life_span_min}</p>
                        )}
                    </div>

                    <div>
                        <label>Life Span(max): </label>
                        <input className={errors.life_span_max && "danger"}
                            type="text" name="life_span_max"
                            value={stateValidate.life_span_max} onChange={handleOnChange} />
                        {errors.life_span_max && (
                            <p className="danger">{errors.life_span_max}</p>
                        )}
                    </div>

                    <label>Temperament: </label>
                    <select name="temperamento" id="temperamento" onChange={(e) => handleSelect(e)}>
                        <option selected={true} hidden>select</option>
                        {
                            temps?.map(e => {
                                return <option value={e.id} key={e.id}> {e.name} </option>
                            })
                        }  </select>
                    <div>{temper?.map(e => {
                        return (<span className="divTemp" onClick={() => handleDelete(e)}>{`${e.name} `}</span>)
                    })}</div>

                    <input className={style.submit} type="submit" disabled={!stateValidate.name || Object.keys(errors).length > 0}
                        onClick={(e) => handleSubmit(e)} value="CREATE BREED" />
                </form>
            </div>
        </div>
    </div>

)};

export default RazaNueva;