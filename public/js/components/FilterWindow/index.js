import React from "react";
import DropDownMenu from "../DropDownMenu/";
import { connect } from "react-redux";
import { filterEndPointData } from "../../actions/bankActions.js";

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
        this.state = {value: '', option:''};
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSelect(option) {
        this.setState({option: option});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const bank = this.props.banks[this.props.activeBankId];
        this.props.dispatch(filterEndPointData(this.props.activeEndPoint, bank[this.props.activeEndPoint], this.state.option, this.state.value));
        this.props.dispatch({type:"SET_INFO_ID", payload: 0});
    }
    
    render() {
        const options = [{value:"", label:""},
                        {value:"TownName", label:"Town"},
                        {value:"PostCode", label:"Post Code"}];
        return (        
            <div>
                This is the filter window.<br></br>
                
            <form onSubmit={this.handleSubmit}>
                
                <label>
                    Filter by <DropDownMenu name="filterDropDown" options={options} value={this.state.option} sendOption={this.handleSelect} />
                <input type="text" className="inputBox" placeholder="Type in filter value" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}