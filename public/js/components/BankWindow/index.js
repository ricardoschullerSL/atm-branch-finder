import React from "react";
import Button from "../Button/";
import { changeActiveBank, getSingleBankSingleEndPointData } from "../../actions/bankActions.js";

export default class BankWindow extends React.Component{

    // Turns out total bank data is 14 MB. Definitely not suited for mobile
    // componentDidMount() {
    //     this.props.dispatch(getAllBankData());
    // };
    
    ListBanks(banks) {
        return (
            <div className="bankTable">
                {banks.map((bank, key) =>
                    <div key={key}><Button innerText={bank.id} bankIndex={key} onClick={
                        () => {
                            this.props.dispatch(changeActiveBank(key));
                            this.props.dispatch(getSingleBankSingleEndPointData(bank, this.props.activeEndPoint));
                        }} className = {this.props.activeBankId === key ? "active bankButton" : "bankButton"} /></div>
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="bankWindow">
                {(this.props.banks) ? this.ListBanks(this.props.banks) : "No Banks Found"}
            </div>
        );
    }
}
