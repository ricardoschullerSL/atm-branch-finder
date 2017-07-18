import React from "react";
import styles from "./endpointselector.css";

export default class EndPointSelector extends React.Component {

    render() {
        return (<div className="endpointselector">
            <button className="selectorButton" id="atmSelector" onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"atms"})}}>ATM</button>
            <button className="selectorButton" id="branchSelector" onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"branches"})}}>Branches</button>
            <button className="selectorButton" id="pcaSelector" onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"pca"})}}>PCA</button>
        </div>)
    }
}