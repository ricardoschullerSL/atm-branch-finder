import React from "react";
import BankButton from "../BankButton/";
import EndPointSelector from "../EndPointSelector/";

import { getAllBankData } from "../../actions/bankActions.js";
import { changeActiveBank, getBankData } from "../../actions/bankActions.js";

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
            <table className="bankTable">
                <tbody>
                <tr>
                {banks.map((bank, key) =>
                <td key={key}><BankButton bank={bank} bankIndex={key} onClick={
                    () => {
                        this.props.dispatch(changeActiveBank(key));
                        this.props.dispatch(getBankData(bank));
                        if (this.props.activeBankId === key) {
                            this.className = "activeBank"; 
                        } else {
                            this.className = "bankButton"
                        }
                    }} className = {this.props.activeBankId === key ? "activeBankButton" : "bankButton"} />
                </td>
                )}
                </tr>
                </tbody>
            </table>
        )
        return (
            <div>
                {listBanks}
                <button onClick={()=> {this.props.dispatch(getAllBankData())}}>Get All Banks</button>
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
