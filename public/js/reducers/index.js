import { combineReducers } from "redux";

const defaultReducer = function(state={}, action) {
    return state;
}

export default combineReducers({
    defaultReducer
});