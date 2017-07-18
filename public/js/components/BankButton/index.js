import React from "react";

export default class BankButton extends React.Component {

    render() {
        return (
            <div className={"button " + this.props.className} onClick={this.props.onClick} >
                {this.props.bank.id}
            </div>
        )
    }
}