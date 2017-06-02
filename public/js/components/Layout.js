import React from "react";
import { connect } from "react-redux";
import InfoWindow from "./InfoWindow/InfoWindow.js";


export default class Layout extends React.Component{
    
    
    render() {
        return (<div>Hello Ricardo! Does Hotloading work? Now then?! YES! 
            <h1>Welcome to the ATM Finder...</h1>
            <p>Work still in progress</p>
            <InfoWindow />
        </div>)
    }
}