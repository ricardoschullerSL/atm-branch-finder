import React from "react";
import styles from "./infowindow.css";
import { getBankData } from "../../actions/bankActions";
import AtmSelector from "../AtmSelector/";
import InfoView from "./InfoView";


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
