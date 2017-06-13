import React from "react";

export default class InfoView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h3>ATM INFO</h3><br></br>
                {this.props.activeBank.data ? 
                    ListInfoItems(this.props.activeBank.data[this.props.atmId]) : "No info items" }
            </div>
        )
    }
}

function ListInfoItems(items) {
    return (
        <div>
            <ul className="infoItemList">
                <li>ATM ID : {items.ATMID}</li>
                <li>Currency: {items.Currency[0]}</li>
                <li>Town : {items.Address.TownName}</li>
                <li>PostCode : {items.Address.PostCode}</li>
                <li>StreetName: {items.Address.StreetName}</li>
            </ul>
        </div>
    )
}