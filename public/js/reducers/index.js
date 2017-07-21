import { combineReducers } from "redux";
import bankWindow from "./bankReducer.js";
import infoWindow from "./infoWindowReducer.js";
import mapWindow from "./mapReducer.js";
import staticInfo from "./staticInfo.js";
import { routerReducer } from "react-router-redux";


export default combineReducers({
    infoWindow,
    mapWindow,
    bankWindow,
    staticInfo,
    routerReducer
});
