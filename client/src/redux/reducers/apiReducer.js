import { TYPES } from "../actions/apiAction";

//Get current user

const initialState = {
    data: [],
    city: 'ho chi minh',
    forecast: 4
}

const apiReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.GET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case TYPES.CHANGE_CITY:
            return {
                ...state,
                city: action.payload
            }
        case TYPES.CHANGE_FORECAST:
            return {
                ...state,
                forecast: action.payload
            }
        default:
            return state
    }
}

export default apiReducer;