import React from "react";
import {connect} from "react-redux";
import PCAWindow from "../../components/PCAWindow";

@connect()
export default class PCAContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<PCAWindow />)
    }
}