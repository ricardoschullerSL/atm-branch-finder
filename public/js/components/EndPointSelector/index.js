import React from "react";
import styles from "./endpointselector.css";

export default class EndPointSelector extends React.Component {

    
    render() {
        return (<div>
            Endpoint selector
            <button className={"endpointselector"} id={"atmSelector"} onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"atms"})}}>ATM</button>
            <button className={"endpointselector"} id={"branchSelector"} onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"branches"})}}>Branches</button>
            <button className={"endpointselector"} id={"pcaSelector"} onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"pca"})}}>PCA</button>
        </div>)
    }
}