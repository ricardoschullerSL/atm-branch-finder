import React from "react";
import styles from "./infowindow.css";
import { getEndPointData } from "../../actions/bankActions";
import InfoViewSelector from "../InfoViewSelector/";
import InfoView from "../InfoView";


export default class InfoWindow extends React.Component{
    
    render() {
        
        if (this.props.filteredInfoObjects) {
            return (
                <div className="infoWindow">This is the InfoWindow <br></br>
                <InfoViewSelector {...this.props} />
                <InfoView infoObject={this.props.filteredInfoObjects[this.props.infoId]} />
                </div>
            )
        }
        else {
            return (
                <div className="infoWindow">
                    No Info Yet</div>
            )
        }    
    }
}
