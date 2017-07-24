import React from "react";
import {connect} from "react-redux";
import store from "../../store.js";
import styles from "./EndPointContainer.css"
import EndPointSelector from "../../components/EndPointSelector";

@connect((store) => {
    return {
        endpoints: store.staticInfo.endpoints,
        activeEndPoint: store.bankWindow.activeEndPoint,
    }
})
export default class EndPointContainer extends React.Component {
    
    render() {
        return (
            <EndPointSelector dispatch={this.props.dispatch} endpoints={this.props.endpoints} activeEndPoint={this.props.activeEndPoint} />
        )
    }
}