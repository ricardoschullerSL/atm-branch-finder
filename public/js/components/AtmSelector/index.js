import React from "react";
import { setATMLocation } from "../../actions/mapActions.js";
import { setAtmIdCounter, decreaseAtmIdCounter ,increaseAtmIdCounter } from "../../actions/infoActions.js";


export default class AtmSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    previousATM() {
        decreaseAtmIdCounter();
        setATMLocation()
    }
    
    nextATM() {
        increaseAtmIdCounter();
        setATMLocation();
    }

    
    render() {
        return (
            <div className="atmSelector">
                ATM Selector goes here
                <button className="previousButton" onClick={this.previousATM.bind(this)}>Previous</button>
                {this.props.atmId}
                <button className="nextButton" onClick={this.nextATM.bind(this)}>Next</button>
            </div>
        )
    }
}