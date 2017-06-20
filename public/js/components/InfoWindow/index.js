import React from "react";
import styles from "./infowindow.css";
import { getEndPointData } from "../../actions/bankActions";
import InfoViewSelector from "../InfoViewSelector/";
import InfoView from "../InfoView";


export default class InfoWindow extends React.Component{
    constructor(props) {
        super(props);
        
    }
    
    getEndPointData() {
        this.props.dispatch(getEndPointData());
    }
    
    render() {
        
        if (this.props.filteredInfoObjects) {
            return (
                <div className="infoWindow">This is the InfoWindow <br></br>
                <button onClick={this.getEndPointData}>Get data</button>
                <InfoViewSelector dispatch={this.props.dispatch} infoId={this.props.infoId} />
                <InfoView infoObject={this.props.filteredInfoObjects[this.props.infoId]} />
                </div>
            )
        }
        else {
            return (
                <div className="infoWindow">
                    <button onClick={this.getEndPointData}>Click to get data</button><br></br>
                    No Info Yet</div>
            )
        }    
    }
}
