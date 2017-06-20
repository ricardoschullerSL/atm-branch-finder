import React from "react";


export default class EndPointSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<div>
            Endpoint selector
            <button onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"atms"})}}>ATM</button>
            <button onClick={() => {this.props.dispatch({type:"SET_ACTIVE_ENDPOINT", payload:"branches"})}}>Branches</button>
        </div>)
    }
}