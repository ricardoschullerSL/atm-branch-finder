import React from "react";
import { connect } from "react-redux";
import BranchWindow from "../../components/BranchWindow/";

@connect()
export default class BranchContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<BranchWindow {...this.props} />)
    }
}