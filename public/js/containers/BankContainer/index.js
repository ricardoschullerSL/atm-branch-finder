import React from "react";
import BankWindow from "../../components/BankWindow";
import { connect } from "react-redux";
import styles from "./bankwindow.css";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId,
        activeEndPoint: store.bankWindow.activeEndPoint,
        endpoints: store.staticInfo.endpoints
    }
})
export default class BankContainer extends React.Component {
    
    render() {
        return (<BankWindow {...this.props}/>)
    }
}