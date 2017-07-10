import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { Route } from "react-router"
import { ConnectedRouter } from "react-router-redux";
import { history, store } from "./store";

const app = document.getElementById("app");


ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={Layout} />
        </div>
    </ConnectedRouter>
</Provider>, app);
