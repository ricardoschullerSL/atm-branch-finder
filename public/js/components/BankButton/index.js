import React from "react";

export default class BankButton extends React.Component {

    render() {
        return (
            <div className="bankButton" onClick={this.props.onClick} >
                {this.props.bank.id}
            </div>
        )
    }
}