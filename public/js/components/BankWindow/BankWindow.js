import React from "react";
import {connect} from "react-redux";
import styles from "./bankwindow.css";
import BankButton from "./BankButton/BankButton.js";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId
    }
})
export default class BankWindow extends React.Component{
    constructor(props){
        super(props)
    }
    
    
    render() {
        return (
            <div className="bankWindow">
                This is where the banks go.
                {(this.props.banks) ? ListBanks(this.props.banks) : "No Banks Found"}
            </div>
        )
    }
};

function ListBanks(banks) {
    const listBanks = (
        <table className="bankTable">
            <tbody>
            <tr>
            {banks.map((bank, key) =>
            <td key={key}><BankButton bank={bank} bankId={key} /></td>)}
            </tr>
            </tbody>
        </table>
    )
    return (
        <div>
            {listBanks}
        </div>
    )
}