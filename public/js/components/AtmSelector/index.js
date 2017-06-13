import React from "react";
import { setATMLocation } from "../../actions/mapActions.js";
import { setAtmIdCounter } from "../../actions/infoActions.js";


export default class AtmSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    decreaseAtmIdCounter() {
        if (this.props.activeBank.data) {
            const newCounter = this.props.atmId === 0 ? 
                                this.props.activeBank.data.length - 1 : this.props.atmId - 1;
            setAtmIdCounter(newCounter);
            setATMLocation(this.props.activeBank, newCounter);
        }
    }
    
    increaseAtmIdCounter() {
        if (this.props.activeBank.data) {
            const newCounter = this.props.atmId === this.props.activeBank.data.length ?
                                0 : this.props.atmId + 1;
            setAtmIdCounter(newCounter);
            setATMLocation(this.props.activeBank, newCounter);
        }
    }
    
    setATMLocation(activeBank, atmId) {
        setATMLocation(activeBank, atmId);
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