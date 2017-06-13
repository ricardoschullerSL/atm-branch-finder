import React from "react";
import BankWindow from "../../components/BankWindow";
import { connect } from "react-redux";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId
    }
})
export default class BankContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (<BankWindow {...this.props}/>)
    }
}