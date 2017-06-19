import React from "react";
import { setActiveEndPoint } from "../../actions/bankActions";

export default class EndPointSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<div>
            Endpoint selector
            <button onClick={() => {setActiveEndPoint("atms")}}>ATM</button>
            <button onClick={() => {setActiveEndPoint("branches")}}>Branches</button>
        </div>)
    }
}