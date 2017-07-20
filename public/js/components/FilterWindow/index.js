import React from "react";
import DropDownMenu from "../DropDownMenu/";
import {connect} from "react-redux";
import { getATMsByCity } from "../../actions/bankActions.js";
import styles from "./filterwindow.css";

@connect()
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
        this.props.dispatch(getATMsByCity(this.state.value));
        this.props.dispatch({type:"SET_INFO_ID", payload: 0});
    }
    
    render() {
        const options = [
            {value:"TownName", label:"City"},
            // {value:"PostCode", label:"Post Code"},
            {value:"", label:""},
        ];
        return (        
            <div className="filterWindow">                
            <form onSubmit={this.handleSubmit} className="filterForm">
                    <DropDownMenu name="filterDropDown" options={options} value={this.state.option} sendOption={this.handleSelect} />
                <input type="text" className="inputBox" placeholder={"Find by " + options.find((option)=> option.value === this.state.option).label.toLowerCase()} value={this.state.value} onChange={this.handleChange} />
                <input className="button filterButton" type="submit" value="Find" />
            </form>
            </div>
        )
    }
}