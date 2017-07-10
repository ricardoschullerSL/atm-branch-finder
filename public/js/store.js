import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import { routerMiddleware, push } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import reducer from "./reducers";

export const history = createHistory();

var middleWare = {}

if (process.env.NODE_ENV !== "production") {
    middleWare = applyMiddleware(thunk, createLogger(), routerMiddleware(history));
} else {
    middleWare= applyMiddleware(thunk, routerMiddleware(history));
}

const composeEnhancers = compose;
export const store = createStore(reducer, middleWare);
