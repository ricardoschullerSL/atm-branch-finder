import React from "react";
import DropDownMenu from "../DropDownMenu/";
import store from "../../store.js";
import { connect } from "react-redux";
import { filterEndPointData } from "../../actions/bankActions.js";
import styles from "./filterwindow.css";

@connect((store) => {
    return {
    activeEndPoint: store.bankWindow.activeEndPoint,
    banks: store.bankWindow.banks,
    activeBankId: store.bankWindow.activeBankId,
}
})
export default class FilterWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', option:"TownName"};
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSelect(option) {
        console.log(option);
        this.setState({option: option});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const bank = this.props.banks[this.props.activeBankId];
        this.props.dispatch(filterEndPointData(this.props.activeEndPoint, bank[this.props.activeEndPoint], this.state.option, this.state.value));
        this.props.dispatch({type:"SET_INFO_ID", payload: 0});
    }
    
    render() {
        const options = [
            {value:"TownName", label:"City"},
            {value:"PostCode", label:"Post Code"},
            {value:"", label:""},
        ];
        return (        
            <div className="filterWindow">                
            <form onSubmit={this.handleSubmit} className="filterForm">
                    <DropDownMenu name="filterDropDown" options={options} value={this.state.option} sendOption={this.handleSelect} />
                <input type="text" className="inputBox" placeholder={"Filter by " + options.find((option)=> option.value === this.state.option).label.toLowerCase()} value={this.state.value} onChange={this.handleChange} />
                <input className="button filterButton" type="submit" value="Filter" />
            </form>
            </div>
        )
    }
}