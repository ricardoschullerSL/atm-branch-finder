import React from "react";

export default class InfoView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    ATMItems(items) {
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
    
    render() {
        return (
            <div>
                <h3>ATM INFO</h3><br></br>
                {this.props.filteredATMS.length > 0 ? 
                    this.ATMItems(this.props.filteredATMS[this.props.activeATMIndex]) : "No info items" }
            </div>
        )
    }
}
