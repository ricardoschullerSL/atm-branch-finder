import React from "react";
import { connect } from "react-redux";
import InfoWindow from "./InfoWindow/InfoWindow.js";
import MapWindow from "./MapWindow/MapWindow.js";
import BankWindow from "./BankWindow/BankWindow.js";


export default class Layout extends React.Component{
    
    
    render() {
        return (<div><div>
            <h1>Welcome to the ATM Finder...</h1>
            <p>Work in progress</p>
        </div>
        <div>
            <BankWindow />
            <div>
                <InfoWindow />
                <MapWindow />
            </div>
        </div>
        </div>)
    }
}