import React from "react";
import { connect } from "react-redux";
import BranchWindow from "../../components/BranchWindow/";
import styles from "./branchcontainer.css";

@connect()
export default class BranchContainer extends React.Component {
    
    render() {
        return (<BranchWindow {...this.props} />)
    }
}