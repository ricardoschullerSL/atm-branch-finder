import React from "react";
import { setInfoObjectLocation } from "../../actions/mapActions.js";
import { setInfoIndex } from "../../actions/infoActions.js";


export default class InfoViewSelector extends React.Component {
    
    previous() {
        const newCounter = this.props.infoId === 0 ? 
                            this.props.filteredInfoObjects.length - 1 : this.props.infoId - 1;
        this.props.dispatch(setInfoIndex(newCounter));
        this.props.dispatch(setInfoObjectLocation(this.props.filteredInfoObjects[newCounter]));
    }
    
    next() {
        const newCounter = this.props.infoId === this.props.filteredInfoObjects.length - 1 ? 
                            0 : this.props.infoId + 1;
        this.props.dispatch(setInfoIndex(newCounter));
        this.props.dispatch(setInfoObjectLocation(this.props.filteredInfoObjects[newCounter]));
    }

    
    render() {
        return (
            <div className="infoViewSelector">
                <button className="iteratorButton"  id="previous"
                    onClick={this.previous.bind(this)}>Previous</button>
                {this.props.infoId}
                <button className="iteratorButton"  id="next"
                    onClick={this.next.bind(this)}>Next</button>
            </div>
        )
    }
}