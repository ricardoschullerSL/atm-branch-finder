import React from "react";
import BankButton from "../BankButton/";
import EndPointSelector from "../EndPointSelector/";

import { getAllBankData } from "../../actions/bankActions.js";
import { changeActiveBank, getSingleBankData } from "../../actions/bankActions.js";

export default class BankWindow extends React.Component{
    constructor(props) {
        super(props)
    }
    // Turns out total bank data is 14 MB. Definitely not suited for mobile
    // componentDidMount() {
    //     this.props.dispatch(getAllBankData());
    // };
    
    ListBanks(banks) {
        const listBanks = (
            <div className="bankTable">
                {banks.map((bank, key) =>
                <div key={key}><BankButton bank={bank} bankIndex={key} onClick={
                    () => {
                        this.props.dispatch(changeActiveBank(key));
                        this.props.dispatch(getSingleBankData(bank));
                        if (this.props.activeBankId === key) {
                            this.className = "activeBank"; 
                        } else {
                            this.className = "bankButton"
                        }
                    }} className = {this.props.activeBankId === key ? "activeBankButton" : "bankButton"} /></div>
                )}
            </div>
        )
        return (
            <div>
                {listBanks}
            </div>
        )
    };

    render() {
        return (
            <div className="bankWindow">
                {(this.props.banks) ? this.ListBanks(this.props.banks) : "No Banks Found"}
                <br />
                <EndPointSelector dispatch={this.props.dispatch} />
            </div>
        )
    }
};
