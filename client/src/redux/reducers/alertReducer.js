 import { TYPES } from "../actions/apiAction";

 const initialState = {
        alert: false,
        message: '',
}

const alertReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.ONALERT:
            return {
                alert: true,
                message: action.payload
            }
        case TYPES.OFFALERT:
            return {
                alert: false,
                message: ''
            }
        default:
            return state
    }
}

export default alertReducer;