import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers";



var middleWare = {}

if (process.env.NODE_ENV !== "production") {
    middleWare = applyMiddleware(thunk, createLogger());
} else {
    middleWare= applyMiddleware(thunk);
}

const composeEnhancers = compose;
export const store = createStore(reducer, middleWare);
