import React from "react";
import { setInfoObjectLocation } from "../../actions/mapActions.js";
import { decreaseInfoIndex , 
    increaseInfoIndex } from "../../actions/infoActions.js";


export default class InfoViewSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    previous() {
        this.props.dispatch(decreaseInfoIndex());
        this.props.dispatch(setInfoObjectLocation());
    }
    
    next() {
        this.props.dispatch(increaseInfoIndex());
        this.props.dispatch(setInfoObjectLocation());
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