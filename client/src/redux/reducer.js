import {GET_ALL_DOGS, GET_DOG, GET_DOG_ID, NEW_DOG, TEMPERAMENTS, SEARCH, LOADING} from "./actions.js";
const initialState = {
    dogs: [],
    dogsSearched: [],
    dog: {},
    temperaments: [],
    search: "",
    loading: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
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
            case LOADING:
                return {
                    ...state,
                    laoding: action.payload
                }
        default:
            return state;
    }
}

export default rootReducer;