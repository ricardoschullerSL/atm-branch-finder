import React from "react";
import { getEndPointData, filterATMsByUserPosition } from "../../actions/bankActions.js";
import { getUserGeoLocation } from "../../actions/mapActions.js"
import InfoViewSelector from "../InfoViewSelector/";
import InfoView from "../InfoView";



export default class InfoWindow extends React.Component{
    
    render() {
        
        if (this.props.filteredInfoObjects) {
            return (
                <div className="infoWindow">
                <InfoViewSelector {...this.props} />
                <InfoView infoObject={this.props.filteredInfoObjects[this.props.infoId]} />
                <button onClick={() => {this.props.dispatch(getUserGeoLocation())}} >Get User Location </button>
                <button onClick={() => {this.props.dispatch(filterATMsByUserPosition(this.props.userGeoLocation, 0.01))}}>Find Local ATMS </button>
                </div>
            )
        }
        else {
            return (
                <div className="infoWindow">
                    No Info Yet
                </div>
            )
        }    
    }
}
