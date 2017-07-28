import React from "react";
import { filterATMsByUserGeoLocation } from "../../actions/mapActions.js";
import InfoViewSelector from "../InfoViewSelector/";
import InfoView from "../InfoView/";
import DropDownMenu from "../DropDownMenu/";



export default class InfoWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {distance: 0.5};
        this.handleSelect = this.handleSelect.bind(this);    
    }
    
    handleSelect(distance) {
        this.setState({distance:distance});
    }
    
    render() {
        const options = [
            {value:0.5, label:"500m"},
            {value:1, label:"1 km"},
            {value:2, label:"2 km"},
            {value:5, label:"5 km"},
        ];
        
        return (
            <div className="infoWindow">
                <InfoViewSelector {...this.props} />
                <InfoView infoObject={this.props.filteredInfoObjects[this.props.infoId]} />
                <DropDownMenu name="distanceDropDown" options={options} value={this.state.distance} sendOption={this.handleSelect} />
                <br></br>
                <button className="button findLocalATMs" onClick={() => {
                    this.props.dispatch(filterATMsByUserGeoLocation(this.state.distance));
                    this.props.dispatch({type:"SET_INFO_ID", payload: 0});
                }}>Find Local ATMS </button>
            </div>
        );
    }
}
