import React from "react";
import styles from "./infowindow.css";
import { getBankData } from "../../actions/bankActions";
import AtmSelector from "../AtmSelector/";
import InfoView from "../InfoView";


export default class InfoWindow extends React.Component{
    constructor(props) {
        super(props);
        
    }
    render() {
        
        if (this.props.filteredATMS) {
            return (
                <div className="infoWindow">This is the InfoWindow <br></br>
                <button onClick={getBankData}>Click to get data</button>
                <AtmSelector />
                <InfoView activeATMIndex={this.props.activeATMIndex} 
                        filteredATMS= {this.props.filteredATMS} />
                </div>
            )
        }
        else {
            return (
                <div className="infoWindow">
                    <button onClick={getBankData}>Click to get data</button><br></br>
                    No Info Yet</div>
            )
        }    
    }
}
