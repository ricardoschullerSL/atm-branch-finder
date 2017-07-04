import React from "react";

export default class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.sendOption(e.target.value)
    }
    
    render() {
        return (
            <select id={this.props.name} onChange={this.handleChange}>
                {this.props.options.map((item, index) => <option key={index} 
                    value={item.value}>{item.label}</option>)}
            </select>
        )
    }
}