import React from "react";
//#############################################################################
// Standard button. 
//#############################################################################
export default class Button extends React.Component {

    render() {
        return (
            <div className={"button " + this.props.className} onClick={this.props.onClick} id={this.props.id}>
                {this.props.innerText}
            </div>
        );
    }
}