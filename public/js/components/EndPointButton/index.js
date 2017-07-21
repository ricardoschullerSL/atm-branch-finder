import React from "react";

export default class EndPointButton extends React.Component {

    render() {
        return (
            <div className={"button " + this.props.className} id={this.props.endpoint.id +"Selector"}
                 onClick={this.props.onClick} >
                {this.props.endpoint.buttonText}
            </div>
        )
    }
}