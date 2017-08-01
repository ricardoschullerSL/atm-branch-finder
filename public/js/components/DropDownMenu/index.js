import React from "react";

//#############################################################################
// General Drop Down Menu component. The options passed in must be an array of
// objects consisting of a 'value' and 'label' property. This component must have
// a parent component to send the 'value' to. This is done by passing in a bound 
// method from the parent to this component as a 'sendOption' prop. 
//#############################################################################

export default class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.sendOption(e.target.value);
    }
    
    render() {
        return (
            <select id={this.props.name} onChange={this.handleChange}>
                {this.props.options.map((item, index) => <option key={index} 
                    value={item.value}>{item.label}</option>)}
            </select>
        );
    }
}