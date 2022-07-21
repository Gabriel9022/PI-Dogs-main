import  axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_DOG_ID = "GET_DOG_ID";
export const NEW_DOG = "NEW_DOG";
export const TEMPERAMENTS = "TEMPERAMENTS";
export const SEARCH = "SEARCH";
export const LOADING = "LOADING";
export const ORDERAZ = "ORDERAZ";
export const ORDERZA = "ORDERZA";
export const ORDERLOW = "ORDERLOW";
export const ORDERHIGH = "ORDERHIGH";
export const TEMPS_FILTER = "TEMPS_FILTER";
export const API_FILTER = "API_FILTER";
export const DB_FILTER = "DB_FILTER";

export const getAllDogs = () => async(dispatch) => {
    try {
        dispatch(loading(true))
        
      let info =  await axios.get('http://localhost:3001/dogs')
      info = info.data
 
         dispatch({ type: "GET_ALL_DOGS", payload: info })
        
         return dispatch(loading(false))
    } catch (error) {
             console.log(error)
    }

}

export const getDog = (name) => async (dispatch) => {

    try {
        dispatch(loading (true))
        let data = (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data
  
        dispatch({ type: "GET_DOG", payload: data})

        return dispatch(loading (false))
    } catch (error) {
        console.log(error)
    }
}

export const getDogId = (id) => async (dispatch) => {
    try {
        dispatch(loading (true))
        let data = (await axios.get(`http://localhost:3001/dogs/${id}`)).data
     
        dispatch({type: "GET_DOG_ID", payload: data})
        return dispatch(loading (false))
    } catch (error) {
       alert(error.response.data)
    }
}

export const newDog = (newDog) => async (dispatch) => {

    try {
        await axios({method:"post", url: "http://localhost:3001/dogs", data: newDog})
        
         dispatch({type: "NEW_DOG", payload: newDog})
         return alert ('Breed created successfully')
    } 
    catch (error) {
        console.log(error)
        return alert (error.response.data.message) 
        
    }
    }

export const temperamentos = () => async (dispatch) => {
    try {
        let temps = (await axios.get('http://localhost:3001/temperaments')).data
        
        return dispatch({type: "TEMPERAMENTS", payload: temps})
    } catch (error) {
        console.log(error)
    }
}

export const search = (e) => (dispatch) => {
    return dispatch ({type: "SEARCH", payload: e})
}

 export const order = (e) => {
    if (e === "az"){
     return {type: "ORDERAZ"}
    } else if (e === "za"){
        return {type: "ORDERZA"}
    } else if(e === "weightLow"){
        return {type: "ORDERLOW"}
    } else if(e === "weightHigh"){
        return {type: "ORDERHIGH"}
    }
} 

export const filter = (e) => {
        return {type: "TEMPS_FILTER", payload: e}       
}

export const backFilter = (e) => {
    if (e === "dogs_api"){
        return {type: "API_FILTER"}
    } else if (e === "dogs_db"){
        return {type: "DB_FILTER"}
    }
}

export const resetDogsSearched = (e) => (dispatch) => {
    return  dispatch ({type: "GET_DOG", payload: e})
}

export const loading = (handle) => (dispatch) => {
    
   return dispatch ({type: "LOADING", payload: handle})
}
