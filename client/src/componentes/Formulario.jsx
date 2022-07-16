import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newDog } from "../redux/actions";
import { temperamentos } from "../redux/actions";
import validate from "../validateForm/validateForm";

const RazaNueva = () => {
const [temper, setTemper] = useState(
[]
);

const [stateValidate, setStateValidate] = useState({
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
    console.log(stateValidate)
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
    setStateValidate({
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
setStateValidate({...stateValidate, temperament:[...stateValidate.temperament, select]})

setTemper([...temper, temps.find(e => e.id === parseInt(select))])

}

let handleDelete = (e) => {
   let borrado = stateValidate.temperament.filter(f => parseInt(f) !== e.id)

   let borrado2 = temper.filter(g => g.name !== e.name)

    setStateValidate({...stateValidate, temperament: borrado})
    setTemper(borrado2)

}

return <div>
    <form >

<div>
<label>Name: </label>
<input className={errors.name && 'danger'}
type="text" name="name" 
value={stateValidate.name} onChange={handleOnChange}/>
{errors.name && (
    <p className="danger">{errors.name}</p>
)}
</div>

<div>
    <label>Height(min): </label>
    <input className={errors.height_min && "danger"}
type="text" name="height_min" 
value={stateValidate.height_min} onChange={handleOnChange}/>
{errors.height_min && (
    <p className="danger">{errors.height_min}</p>
)}
</div>
<div>
    <label>Height(max): </label>
    <input className={errors.height_max && "danger"}
type="text" name="height_max" 
value={stateValidate.height_max} onChange={handleOnChange}/>
{errors.height_max && (
    <p className="danger">{errors.height_max}</p>
)}
</div>

<div>
<label>Weight(min): </label>
<input className={errors.weight_min && "danger"} 
type="text" name="weight_min" 
value={stateValidate.weight_min} onChange={handleOnChange}/>
{errors.weight_min && (
    <p className="danger">{errors.weight_min}</p>
)} 
</div>
<div>
<label>Weight(max): </label>
<input className={errors.weight_max && "danger"} 
type="text" name="weight_max" 
value={stateValidate.weight_max} onChange={handleOnChange}/>
{errors.weight_max && (
    <p className="danger">{errors.weight_max}</p>
)} 
</div>

<div>
<label>Life Span(min): </label>
<input type="text" name="life_span_min" 
value={stateValidate.life_span_min} onChange={handleOnChange}/>
</div>
<div>
<label>Life Span(max): </label>
<input type="text" name="life_span_max" 
value={stateValidate.life_span_max} onChange={handleOnChange}/>
</div>

<label>Temperament: </label> 
<select name="temperamento" id="temperamento" onChange={(e) => handleSelect(e)}> 
<option selected={true} hidden>seleccioname</option>
{    
    temps?.map(e => {
        return  <option value={e.id} key={e.id}> {e.name} </option>
    })
}  </select>
<div>{temper?.map(e => {
    return (<div className="divTemp" onClick={()=>handleDelete(e)}>{`${e.name}`}</div>)
})}</div>

<input type="submit" disabled={!stateValidate.name || Object.keys(errors).length>0}
onClick={(e) => handleSubmit(e)} value="Create Breed"/>
    </form>
</div>

};

export default RazaNueva;