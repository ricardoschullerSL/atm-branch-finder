import React from "react";
import { changeActiveBank, getEndPointData } from "../../actions/bankActions.js";


export default class BankButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    setActiveBank() {
        changeActiveBank(this.props.bankId);
        getEndPointData();
    }
    
    render() {
        return (
            <div className="bankButton" onClick={this.setActiveBank.bind(this)}>
                {this.props.bank.id}
            </div>
        )
    }
}