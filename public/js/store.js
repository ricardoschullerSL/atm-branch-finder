import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers";

var middleWare = {};

if (process.title === "browser") {
    middleWare = applyMiddleware(thunk, createLogger());
} else {
    middleWare= applyMiddleware(thunk);
}

const composeEnhancers = compose;
const store = createStore(reducer, middleWare);


export default store