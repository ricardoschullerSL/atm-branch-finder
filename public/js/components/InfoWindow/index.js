import React from "react";
import { filterATMsByUserGeoLocation } from "../../actions/mapActions.js"
import InfoViewSelector from "../InfoViewSelector/";
import InfoView from "../InfoView";



export default class InfoWindow extends React.Component{
    
    render() {
        return (
                <div className="infoWindow">
                <InfoViewSelector {...this.props} />
                <InfoView infoObject={this.props.filteredInfoObjects[this.props.infoId]} />
                <button className="button findLocalATMs" onClick={() => {this.props.dispatch(filterATMsByUserGeoLocation(0.01))}}>Find Local ATMS </button>
            </div>
        )
    }
}
