import React from "react";
import {connect} from "react-redux";
import InfoContainer from "./containers/InfoContainer/";
import MainContainer from "./containers/MainContainer/";
import BankContainer from "./containers/BankContainer/";
import FilterWindow from "./components/FilterWindow/";

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
        return (<div><div>
            <h1>Welcome to the ATM Branch Finder...</h1>
            <p>Work in progress</p>
            <p>Click this super secret button to get your account info!</p>
            <a href='/account_info'><button onClick={this.authenticate}>Get Account Info</button></a>
        </div>
        <div>
            <div>
                <BankContainer />
                <FilterWindow />
            </div>
            <div>
                <InfoContainer />
                <MainContainer activeEndPoint={this.props.activeEndPoint} />
            </div>
        </div>
        </div>)
    }
}