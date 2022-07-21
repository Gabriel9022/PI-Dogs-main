import {GET_ALL_DOGS, GET_DOG, GET_DOG_ID, NEW_DOG, TEMPERAMENTS, SEARCH, LOADING, ORDERAZ, ORDERZA, ORDERLOW, ORDERHIGH, TEMPS_FILTER, API_FILTER, DB_FILTER} from "./actions.js";
const initialState = {
    dogs: [],
    dogsSearched: [],
    dogsBackUp: [],
    dog: {},
    temperaments: [],
    tempsFilterd: [],
    search: "",
    loading: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                dogsBackUp: action.payload
            };
        case GET_DOG:
            return {
                ...state,
                dogsSearched: action.payload
            };
            case GET_DOG_ID:
                return{
                    ...state,
                    dog: action.payload
                };
            case NEW_DOG:
                 return {
                     ...state,
                     dogs: [...state.dogs, action.payload]
                 };
            case TEMPERAMENTS:
                return {
                    ...state,
                    temperaments: action.payload
                };
            case SEARCH:
                return{
                  ...state,
                  search: action.payload  
                };
            case ORDERAZ:
                if(state.search===""){
                return{
                    ...state,
                    dogs: [...state.dogs].sort(function(a, b){
                        if(a.name < b.name){return -1} 
                        if(a.name > b.name){return 1}
                        return 0
                    })
                }
            }else{
                return{
                    ...state,
                    dogsSearched: [...state.dogsSearched].sort(function(a, b){
                        if(a.name < b.name){return -1} 
                        if(a.name > b.name){return 1}
                        return 0
                    })
                }
            };
            case ORDERZA:
                if(state.search===""){
                    return{
                        ...state,
                        dogs: [...state.dogs].sort(function(a, b){
                            if(a.name > b.name){return -1} 
                            if(a.name < b.name){return 1}
                            return 0
                        })                    
                    }
                }else{
                    return{
                        ...state,
                        dogsSearched: [...state.dogsSearched].sort(function(a, b){
                            if(a.name > b.name){return -1} 
                            if(a.name < b.name){return 1}
                            return 0
                        })                    
                    }
                };
                
            case ORDERLOW:
                if(state.search===""){
                    return{
                        ...state,
                        dogs: [...state.dogs].sort((a, b) => parseInt(a.weight_min) - parseInt(b.weight_min))                    
                    }
                }else{
                    return{
                        ...state,
                        dogsSearched: [...state.dogsSearched].sort((a, b) => parseInt(a.weight_min) - parseInt(b.weight_min))                    
                    }
                };
               
            case ORDERHIGH:
                 if(state.search===""){
                    return{
                        ...state,
                        dogs: [...state.dogs].sort((a, b) => parseInt(b.weight_max) - parseInt(a.weight_max)) 
                    }
                 }else{
                    return{
                        ...state,
                        dogsSearched: [...state.dogsSearched].sort((a, b) => parseInt(b.weight_max) - parseInt(a.weight_max)) 
                    }
                 };
                
            case TEMPS_FILTER:
                if(state.search===""){
                    return{
                        ...state,  
                       dogs: [...state.dogs].filter(e => e.temperament?.includes(action.payload))
                    }
                }else{
                    return{
                        ...state,  
                       dogsSearched: [...state.dogsSearched].filter(e => e.temperament?.includes(action.payload))
                    }
                }
                
            case API_FILTER:
                const apiFilter = [...state.dogs].filter(e => typeof(e.id) !== "string")
                return{
                    ...state,
                    dogs: apiFilter
                };
            case DB_FILTER:
                const dbFilter = [...state.dogs].filter(e => typeof(e.id) !== "number")
                console.log(dbFilter)
                return{
                    ...state,
                    dogs: dbFilter
                };
            case LOADING:
                return {
                    ...state,
                    loading: action.payload
                };

        default:
            return state;
    }
}

export default rootReducer;