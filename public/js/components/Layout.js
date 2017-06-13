import React from "react";
import { connect } from "react-redux";
import InfoWindow from "./InfoWindow/";
import MapWindow from "./MapWindow/";
import BankWindow from "./BankWindow/";

@connect((store) => {
    return {
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId
    }
})
export default class Layout extends React.Component{
    
    
    render() {
        return (<div><div>
            <h1>Welcome to the ATM Finder...</h1>
            <p>Work in progress</p>
        </div>
        <div>
            <BankWindow banks={this.props.banks} activeBankId={this.props.activeBankId} />
            <div>
                <InfoWindow />
                <MapWindow />
            </div>
        </div>
        </div>)
    }
}