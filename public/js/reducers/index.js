import { combineReducers } from "redux";
import bankWindow from "./bankReducer.js";
import infoWindow from "./infoWindowReducer.js";
import mapWindow from "./mapReducer.js"

export default combineReducers({
    infoWindow,
    mapWindow,
    bankWindow
});