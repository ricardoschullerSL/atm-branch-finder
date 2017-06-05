import React from "react";


export default class BankButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="bankButton">
                {this.props.bank.id} , {this.props.bank.uri}
            </div>
        )
    }
}