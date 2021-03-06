import React from "react";
import {connect} from "react-redux";
import EndPointContainer from "./containers/EndPointContainer";
import MainContainer from "./containers/MainContainer/";

import styles from "./main.css";

@connect((store) => {
    return {
        activeEndPoint: store.bankWindow.activeEndPoint
    };
})
export default class Layout extends React.Component {
    
    authenticate() {
        console.log("Authentication button clicked");
    }
    
    accountButton() {
        if (process.env.NODE_ENV !== "production") {
            return (
                <p>Click this super secret button to get your account info!
                    <a href='/account_info'><button onClick={this.authenticate}>Get Account Info</button></a>
                </p>
            );
        } else {
            return "";
        }
    }
    
    render() {
        return (<div className="mainPage"><div className="topHeader">
            <h1><center><b>ATM BRANCH</b> FINDER</center></h1>
            <p>Work in progress</p>
            <p>Find any ATM or branch nearby. You can also look for a new Personal Current Account!</p> 
            {this.accountButton()}
            <EndPointContainer />
        </div>
        <MainContainer activeEndPoint={this.props.activeEndPoint} />
        </div>);
    }
}