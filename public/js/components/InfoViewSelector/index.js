import React from "react";
import { setLocation } from "../../actions/mapActions.js";
import { decreaseInfoIdCounter , 
    increaseInfoIdCounter } from "../../actions/infoActions.js";


export default class InfoViewSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    previous() {
        decreaseInfoIdCounter();
        setLocation();
    }
    
    next() {
        increaseInfoIdCounter();
        setLocation();
    }

    
    render() {
        return (
            <div className="infoViewSelector">
                Info Selector goes here
                <button className="previousButton" 
                    onClick={this.previous.bind(this)}>Previous</button>
                {this.props.infoId}
                <button className="nextButton" 
                    onClick={this.next.bind(this)}>Next</button>
            </div>
        )
    }
}