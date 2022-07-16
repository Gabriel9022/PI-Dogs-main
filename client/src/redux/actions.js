import  axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_DOG_ID = "GET_DOG_ID";
export const NEW_DOG = "NEW_DOG";
export const TEMPERAMENTS = "TEMPERAMENTS";
//export const LOADING = "LOADING"

export const getAllDogs = () => async(dispatch) => {
    try {
        //dispatch(loading (true))
      let info =  await axios.get('http://localhost:3001/dogs')
      info = info.data
   //   console.log(info)
         return dispatch({ type: "GET_ALL_DOGS", payload: info })
         //return dispatch(loading (false))
    } catch (error) {
             console.log(error)
    }

}

export const getDog = (name) => async (dispatch) => {

    try {
        let data = (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data
       // console.log(data)
       // if (!data.length) alert ('No hay coincidencias')  
        return dispatch({ type: "GET_DOG", payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getDogId = (id) => async (dispatch) => {
    try {
        let data = (await axios.get(`http://localhost:3001/dogs/${id}`)).data
     //   console.log(data)
        return dispatch({type: "GET_DOG_ID", payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const newDog = (newDog) => async (dispatch) => {
   // console.log(newDog)
    try {
        await axios({method:"post", url: "http://localhost:3001/dogs", data: newDog})
        
         dispatch({type: "NEW_DOG", payload: newDog})
         return alert ('Raza creada')
    } 
    catch (error) {
        console.log(error)
        return alert ('No se creó la Raza')
    }
    }

export const temperamentos = () => async (dispatch) => {
    try {
        let temps = (await axios.get('http://localhost:3001/temperaments')).data
       // console.log(temps)
        return dispatch({type: "TEMPERAMENTS", payload: temps})
    } catch (error) {
        console.log(error)
    }
}

// export const loading = (handle) => async (dispatch) => {
//    return dispatch ({type: "LOADING", payload: handle})
// }