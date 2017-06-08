import React from "react";
import {connect} from "react-redux";

@connect()
export default class AtmSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    decreaseAtmIdCounter() {
        if (this.props.activeBank.data) {
            const newCounter = this.props.atmId === 0 ? 
                                this.props.activeBank.data.length - 1 : this.props.atmId - 1;
            this.props.dispatch({type:"SET_ATM_ID_COUNTER", payload: newCounter})
            this.setATMLocation(newCounter);
        }
    }
    
    increaseAtmIdCounter() {
        if (this.props.activeBank.data) {
            const newCounter = this.props.atmId === this.props.activeBank.data.length ?
                                0 : this.props.atmId + 1;
            this.props.dispatch({type:"SET_ATM_ID_COUNTER", payload: newCounter});
            this.setATMLocation(newCounter);
        }
    }
    
    setATMLocation(atmId) {
        this.props.dispatch({
            type:"SET_LATITUDE",
            payload: this.props.activeBank.data[atmId].GeographicLocation.Latitude
        });
        this.props.dispatch({
            type:"SET_LONGITUDE",
            payload: this.props.activeBank.data[atmId].GeographicLocation.Longitude
        });
    }
    
    render() {
        console.log(this.props)
        return (
            <div className="atmSelector">
                ATM Selector goes here
                <button onClick={this.decreaseAtmIdCounter.bind(this)}>Decrease</button>
                {this.props.atmId}
                <button onClick={this.increaseAtmIdCounter.bind(this)}>Increase</button>
            </div>
        )
    }
}

