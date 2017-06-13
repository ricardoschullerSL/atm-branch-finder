import React from "react";
import styles from "./infowindow.css";
import store from "../../store";
import { connect } from "react-redux";
import { getBankData } from "../../actions/bankActions";
import AtmSelector from "./AtmSelector";
import InfoView from "./InfoView";


@connect((store) => {
    return {
        atm: store.infoWindow.atm,
        infoItems: store.infoWindow.infoItems,
        banks: store.bankWindow.banks,
        activeBankId: store.bankWindow.activeBankId,
        currentAtmId: store.bankWindow.currentAtmId
        
    }
})
export default class InfoWindow extends React.Component{
    constructor(props) {
        super(props);
        
    }
    render() {
        
        if (this.props.atm) {
            return (
                <div className="infoWindow">This is the InfoWindow <br></br>
                <button onClick={getBankData}>Click to get data</button>
                <AtmSelector atmId={this.props.currentAtmId} 
                            activeBank={this.props.banks[this.props.activeBankId]}/>
                <InfoView atmId={this.props.currentAtmId} 
                        activeBank={this.props.banks[this.props.activeBankId]}/>
                </div>
            )
        }
        else {
            return (
                <div className="infoWindow">No Info Yet</div>
            )
        }    
    }
}
