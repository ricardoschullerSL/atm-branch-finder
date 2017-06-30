import React from "react";
import {connect} from "react-redux";
import PCAWindow from "../../components/PCAWindow";
import styles from "./pcawindow.css";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId    
    }
})
export default class PCAContainer extends React.Component {

    render() {
        return (<PCAWindow {...this.props}  />)
    }
}