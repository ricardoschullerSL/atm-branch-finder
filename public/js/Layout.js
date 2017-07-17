import React from "react";
import {connect} from "react-redux";
import InfoContainer from "./containers/InfoContainer/";
import MainContainer from "./containers/MainContainer/";
import BankContainer from "./containers/BankContainer/";
import FilterWindow from "./components/FilterWindow/";
import styles from "./main.css";

@connect((store) => {
    return {
        activeEndPoint: store.bankWindow.activeEndPoint
    }
})
export default class Layout extends React.Component {
    
    authenticate() {
        console.log("Authentication button clicked");
    }
    
    render() {
        return (<center><div className="mainPage"><div className="topHeader">
            <h1><center>ATM Branch Finder</center></h1>
            <p>Work in progress</p>
            <p>Find any ATM or branch nearby. You can also look for a new Personal Current Account!</p>
            <p>Click this super secret button to get your account info!</p>
            <a href='/account_info'><button onClick={this.authenticate}>Get Account Info</button></a>
        </div>
            <div className="header">
                <BankContainer />
                <FilterWindow />
            </div>
            <InfoContainer />
            <MainContainer activeEndPoint={this.props.activeEndPoint} />
        </div></center>)
    }
}