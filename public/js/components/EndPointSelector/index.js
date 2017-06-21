import React from "react";
import styles from "./endpointselector.css";

export default class EndPointSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<div>
            Endpoint selector
            <button className={"selector"} onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"atms"})}}>ATM</button>
            <button className={"selector"} onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"branches"})}}>Branches</button>
            <button className={"selector"} onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"pca"})}}>PCA</button>
        </div>)
    }
}