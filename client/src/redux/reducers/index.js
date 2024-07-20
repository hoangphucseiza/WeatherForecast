import { combineReducers } from "redux";
import api from "./apiReducer";
import alert from "./alertReducer";

export default combineReducers({
    api,
    alert
})