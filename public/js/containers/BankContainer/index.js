import React from "react";
import BankWindow from "../../components/BankWindow";
import FilterWindow from "../../components/FilterWindow";
import { connect } from "react-redux";
import styles from "./bankwindow.css";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId
    }
})
export default class BankContainer extends React.Component {
    
    render() {
        return (<div><BankWindow {...this.props}/></div>)
    }
}