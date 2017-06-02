import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers";

const middleWare = applyMiddleware(thunk, createLogger());
const composeEnhancers = compose;

export default createStore(reducer, middleWare);