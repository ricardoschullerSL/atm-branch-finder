import React from "react";
import {connect} from "react-redux";
import { changeActiveBank } from "../../../actions/bankActions.js";

@connect()
export default class BankButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    setActiveBank() {
        this.props.dispatch(changeActiveBank(this.props.bankId));
        
    }
    
    render() {
        return (
            <div className="bankButton" onClick={this.setActiveBank.bind(this)}>
                {this.props.bank.id}
            </div>
        )
    }
}