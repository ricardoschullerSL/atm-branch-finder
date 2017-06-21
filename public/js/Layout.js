import React from "react";
import InfoContainer from "./containers/InfoContainer/";
import MainContainer from "./containers/MainContainer/";
import BankContainer from "./containers/BankContainer/";

export default class Layout extends React.Component {
    
    render() {
        return (<div><div>
            <h1>Welcome to the ATM Finder...</h1>
            <p>Work in progress</p>
        </div>
        <div>
            <BankContainer />
            <div>
                <InfoContainer />
                <MainContainer />
            </div>
        </div>
        </div>)
    }
}