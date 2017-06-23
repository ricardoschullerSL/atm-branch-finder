import React from "react";
import {connect} from "react-redux";
import {filterEndPointData} from "../../actions/bankActions.js";

@connect((state) => {
    return {
    activeEndPoint: state.bankWindow.activeEndPoint,
    banks: state.bankWindow.banks,
    activeBankId: state.bankWindow.activeBankId,
}
})
export default class FilterWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const bank = this.props.banks[this.props.activeBankId];
        this.props.dispatch(filterEndPointData(this.props.activeEndPoint, bank[this.props.activeEndPoint], "TownName", this.state.value));
    }
    
    render() {
        return (        
            <div>
                This is the filter window.<br></br>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Filter by town:
                <input type="text" className="inputBox" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}