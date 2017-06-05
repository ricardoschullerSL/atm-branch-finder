import React from "react";
import {connect} from "react-redux";
import styles from "./bankwindow.css";
import BankButton from "./BankButton/BankButton.js";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBank: store.bankWindow.activeBank
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
                {(this.props.banks) ? ListBanks(this.props) : "No Banks Found"}
            </div>
        )
    }
}

function ListBanks(props) {
    const listBanks = (
        <ul>
            {props.banks.map((bank, key) =>
            <li key={key}><BankButton bank={bank} /></li>)}
        </ul>
    )
    return (
        <div>
            {listBanks}
        </div>
    )
}