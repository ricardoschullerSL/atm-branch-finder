import React from "react";
import { setATMLocation } from "../../actions/mapActions.js";
import { setAtmIdCounter } from "../../actions/infoActions.js";


export default class AtmSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    decreaseAtmIdCounter() {
        if (this.props.filteredATMS) {
            const newCounter = this.props.activeATMIndex === 0 ? 
                                this.props.filteredATMS.length - 1 : this.props.activeATMIndex - 1;
            setAtmIdCounter(newCounter);
            const atm = this.props.filteredATMS[newCounter];
            setATMLocation(atm.GeographicLocation.Latitude, atm.GeographicLocation.Longitude)
        }
    }
    
    increaseAtmIdCounter() {
        if (this.props.filteredATMS) {
            const newCounter = this.props.activeATMIndex === this.props.filteredATMS.length - 1?
                                0 : this.props.activeATMIndex + 1;
            setAtmIdCounter(newCounter);
            const atm = this.props.filteredATMS[newCounter];
            setATMLocation(atm.GeographicLocation.Latitude, atm.GeographicLocation.Longitude);
        }
    }

    
    render() {
        return (
            <div className="atmSelector">
                ATM Selector goes here
                <button className="previousButton" onClick={this.decreaseAtmIdCounter.bind(this)}>Previous</button>
                {this.props.atmId}
                <button className="nextButton" onClick={this.increaseAtmIdCounter.bind(this)}>Next</button>
            </div>
        )
    }
}